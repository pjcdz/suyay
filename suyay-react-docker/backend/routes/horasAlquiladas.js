const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the promise-based pool
const { authenticateToken } = require('../middleware/authMiddleware'); // Import auth middleware

// GET /api/horasalquiladas/:codConsultorio
// Fetches all hour statuses for a specific consultorio
router.get('/:codConsultorio', async (req, res) => {
  const { codConsultorio } = req.params;

  // Basic validation
  if (isNaN(parseInt(codConsultorio))) {
    return res.status(400).json({ message: 'Invalid codConsultorio parameter.' });
  }

  try {
    const query = `
      SELECT codHora, isOcupado, isPagado, dni 
      FROM horasalquiladas 
      WHERE codConsultorio = ? 
      ORDER BY codHora ASC
    `;
    const [rows] = await db.query(query, [codConsultorio]);
    
    // Optional: Check if consultorio exists or if rows are empty
    if (rows.length === 0) {
      // Decide if this is an error or just an empty result
      // For now, return empty array, consistent with original PHP likely behavior
      // Could add a check to consultorios table if needed
      console.log(`No hours found for codConsultorio: ${codConsultorio}`);
    }

    // Structure the data perhaps? Or return as is?
    // For now, return the flat array of results. Frontend can process it.
    res.json(rows);

  } catch (error) {
    console.error(`Error fetching horasalquiladas for consultorio ${codConsultorio}:`, error);
    res.status(500).json({ message: 'Error fetching data from database.' });
  }
});

// GET /api/horasalquiladas/:codConsultorio/:codHora
// Fetches details for a specific hour slot for editing
router.get('/:codConsultorio/:codHora', async (req, res) => {
    const { codConsultorio, codHora } = req.params;

    // Basic validation
    if (isNaN(parseInt(codConsultorio)) || isNaN(parseInt(codHora))) {
        return res.status(400).json({ message: 'Invalid codConsultorio or codHora parameter.' });
    }

    try {
        // Query horasalquiladas table
        const queryHoras = `
            SELECT dni, isOcupado, isPagado 
            FROM horasalquiladas 
            WHERE codConsultorio = ? AND codHora = ?
        `;
        const [horasRows] = await db.query(queryHoras, [codConsultorio, codHora]);

        if (horasRows.length === 0) {
            return res.status(404).json({ message: 'Hour slot not found.' });
        }

        const horaData = horasRows[0];
        let personaData = { nombre: '', credito: 0 }; // Default if DNI is 0 or not found
        let deudaCalculada = 0;

        // If there's a DNI associated, fetch persona details and calculate deuda
        if (horaData.dni && horaData.dni !== 0) {
            const queryPersona = `SELECT nombre, credito FROM personas WHERE dni = ?`;
            const [personaRows] = await db.query(queryPersona, [horaData.dni]);
            if (personaRows.length > 0) {
                personaData = personaRows[0];
            }

            // Calculate deuda based on count of hours for this DNI (like in edit.php)
            const queryCount = `SELECT COUNT(*) as count FROM horasalquiladas WHERE dni = ?`;
            const [countRows] = await db.query(queryCount, [horaData.dni]);
            const count = countRows[0].count;
            const costoPorHora = 1500; // Assuming constant
            deudaCalculada = count * costoPorHora;
        }
        
        // Combine data
        const result = {
            dni: horaData.dni,
            isOcupado: horaData.isOcupado,
            isPagado: horaData.isPagado,
            nombre: personaData.nombre,
            credito: personaData.credito,
            deuda: deudaCalculada // Send calculated deuda
        };

        res.json(result);

    } catch (error) {
        console.error(`Error fetching details for consultorio ${codConsultorio}, hora ${codHora}:`, error);
        res.status(500).json({ message: 'Error fetching data from database.' });
    }
});

// PUT /api/horasalquiladas/:codConsultorio/:codHora (for editing)
// This replicates the complex logic from edit.php
// Apply authentication middleware to protect this route
router.put('/:codConsultorio/:codHora', authenticateToken, async (req, res) => {
    const { codConsultorio, codHora } = req.params;
    const { dni: newDniStr, name: nombre, credito: creditoStr } = req.body;

     // --- Validation ---
    if (isNaN(parseInt(codConsultorio)) || isNaN(parseInt(codHora))) {
        return res.status(400).json({ message: 'Invalid codConsultorio or codHora parameter.' });
    }
    const newDni = newDniStr === '' || newDniStr === null ? 0 : parseInt(newDniStr);
    const credito = creditoStr === '' || creditoStr === null ? 0 : parseInt(creditoStr);
     if (isNaN(newDni) || isNaN(credito)) {
         return res.status(400).json({ message: 'Invalid DNI or Credito format.' });
     }
     // Basic name validation (optional)
     const cleanNombre = typeof nombre === 'string' ? nombre.trim() : '';


    const connection = await db.getConnection(); // Get connection for transaction

    try {
        await connection.beginTransaction();

        // --- Get Original DNI ---
        const [originalRows] = await connection.query(
            "SELECT dni FROM horasalquiladas WHERE codHora = ? AND codConsultorio = ?",
            [codHora, codConsultorio]
        );
        if (originalRows.length === 0) {
             await connection.rollback();
             return res.status(404).json({ message: 'Hour slot not found.' });
        }
        const originalDni = originalRows[0].dni;

        const costoPorHora = 1500; // Assuming constant

        // --- Update Original Person if DNI changed ---
        if (originalDni != newDni && originalDni != 0) {
            // Recalculate original person's debt *before* removing this hour
             const [countRowsOriginal] = await connection.query("SELECT COUNT(*) as count FROM horasalquiladas WHERE dni = ?", [originalDni]);
             let originalDeuda = countRowsOriginal[0].count * costoPorHora;
             let newOriginalDeuda = originalDeuda - costoPorHora; // Debt after removing this hour

             // Update original person's debt
             await connection.query("UPDATE personas SET deuda = ? WHERE dni = ?", [newOriginalDeuda, originalDni]);

             // If original person has no more hours, clear their credit
             if (newOriginalDeuda <= 0) {
                  await connection.query("UPDATE personas SET credito = 0 WHERE dni = ?", [originalDni]);
                  // Optionally delete the person if debt is 0 and credit is 0? Original PHP didn't seem to.
             }
        }

        // --- Handle New Person ---
        let newDeudaCalculada = 0;
        let isPagado = 0; // Default to not paid
        const isOcupado = newDni !== 0; // Occupied if DNI is not 0

        if (isOcupado) { // Only handle person/debt if the slot is being occupied
            const [existingPerson] = await connection.query("SELECT * FROM personas WHERE dni = ?", [newDni]);

            if (existingPerson.length === 0) {
                // Create new person
                newDeudaCalculada = costoPorHora; // First hour
                await connection.query(
                    "INSERT INTO personas (dni, nombre, credito, deuda) VALUES (?, ?, ?, ?)",
                    [newDni, cleanNombre, credito, newDeudaCalculada]
                );
            } else {
                 // Person exists, update them
                 // Recalculate new person's debt *after* adding/keeping this hour
                 // Need to know if this hour was *already* assigned to newDni
                 let hoursCountNew;
                 if (originalDni == newDni) { // Hour already belonged to this person
                     const [countRowsNew] = await connection.query("SELECT COUNT(*) as count FROM horasalquiladas WHERE dni = ?", [newDni]);
                     hoursCountNew = countRowsNew[0].count;
                 } else { // Hour is newly assigned to this person
                     const [countRowsNew] = await connection.query("SELECT COUNT(*) as count FROM horasalquiladas WHERE dni = ?", [newDni]);
                     hoursCountNew = countRowsNew[0].count + 1; // Add this hour
                 }
                 newDeudaCalculada = hoursCountNew * costoPorHora;

                 await connection.query(
                     "UPDATE personas SET nombre = ?, credito = ?, deuda = ? WHERE dni = ?",
                     [cleanNombre, credito, newDeudaCalculada, newDni]
                 );
            }
             // Determine if paid based on *new* debt and provided credit
             isPagado = credito >= newDeudaCalculada ? 1 : 0;

        } else {
             // Slot is being freed (newDni is 0)
             isPagado = 0; // Free slots are not paid
             // The logic for the original person (if any) was handled above
        }


        // --- Update horasalquiladas table for the specific slot ---
        await connection.query(
            "UPDATE horasalquiladas SET dni = ?, isPagado = ?, isOcupado = ? WHERE codHora = ? AND codConsultorio = ?",
            [newDni, isPagado, isOcupado, codHora, codConsultorio]
        );

        // --- Update isPagado status for ALL hours of the NEW DNI ---
        // This ensures consistency based on the latest credit/debt calculation
        if (isOcupado) {
             await connection.query("UPDATE horasalquiladas SET isPagado = ? WHERE dni = ?", [isPagado, newDni]);
        }
         // Also update isPagado for the original DNI if they changed and still have hours
         if (originalDni != newDni && originalDni != 0) {
             const [originalPersonCheck] = await connection.query("SELECT credito, deuda FROM personas WHERE dni = ?", [originalDni]);
             if (originalPersonCheck.length > 0) {
                 const originalIsPagado = originalPersonCheck[0].credito >= originalPersonCheck[0].deuda ? 1 : 0;
                 await connection.query("UPDATE horasalquiladas SET isPagado = ? WHERE dni = ?", [originalIsPagado, originalDni]);
             }
         }


        await connection.commit(); // Commit transaction
        res.json({ message: 'Update successful.' });

    } catch (error) {
        await connection.rollback(); // Rollback on error
        console.error(`Error updating consultorio ${codConsultorio}, hora ${codHora}:`, error);
        res.status(500).json({ message: 'Error updating data in database.' });
    } finally {
        connection.release(); // Release connection back to pool
    }
});

module.exports = router;
