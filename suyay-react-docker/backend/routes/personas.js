const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the promise-based pool
const { authenticateToken } = require('../middleware/authMiddleware'); // Import auth middleware

// GET /api/personas
// Fetches aggregated data for people with debt, similar to personas.php
// Protected by authentication middleware
router.get('/', authenticateToken, async (req, res) => {
  try {
    // SQL query replicating the logic from personas.php
    const query = `
        SELECT 
            p.dni, 
            p.nombre, 
            p.credito, 
            p.deuda, 
            c.descripcion AS consultorio, 
            h.descripcion AS hora_descripcion
        FROM personas p
        LEFT JOIN horasalquiladas ha ON p.dni = ha.dni
        LEFT JOIN consultorios c ON ha.codConsultorio = c.codConsultorio
        LEFT JOIN horas h ON ha.codHora = h.codHora
        WHERE p.deuda != 0 AND p.dni != 0 AND ha.codHora IS NOT NULL 
        ORDER BY p.dni, ha.codConsultorio, ha.codHora 
    `; 
    // Added p.dni != 0 and ha.codHora IS NOT NULL for cleaner data
    // Removed p.deuda > 0 condition to match original PHP logic more closely (it seemed to calculate deuda based on hours)
    // We might need to adjust the WHERE clause based on how deuda is truly calculated/updated later in edit logic

    const [rows] = await db.query(query);

    // Process the flat results into a nested structure grouped by person
    const personas = {};
    const costoPorHora = 1500; // Assuming this is constant as in edit.php

    for (const row of rows) {
      const dni = row.dni;

      if (!personas[dni]) {
         // Calculate number of hours based on deuda (as done in personas.php for display)
         // Note: This might be inaccurate if deuda isn't consistently updated.
         // A potentially more accurate way is to count the rows for this DNI *after* fetching all rows.
         const horasCount = Math.round(row.deuda / costoPorHora); // Approximate hours

        personas[dni] = {
          nombre: row.nombre,
          credito: row.credito,
          deuda: row.deuda,
          horas: horasCount, // Store calculated hours
          ocupacion: {}
        };
      }

      // Group by consultorio
      if (row.consultorio) { // Check if consultorio exists (due to LEFT JOIN)
          if (!personas[dni].ocupacion[row.consultorio]) {
            personas[dni].ocupacion[row.consultorio] = {};
          }

          // Extract day and time from hora_descripcion (e.g., "Lunes 08 - 09")
          const horaParts = row.hora_descripcion.match(/^(\S+)\s+(.*)$/);
          if (horaParts) {
              const dia = horaParts[1];
              const hora = horaParts[2];

              // Group by day
              if (!personas[dni].ocupacion[row.consultorio][dia]) {
                  personas[dni].ocupacion[row.consultorio][dia] = [];
              }
              // Add the hour description
              personas[dni].ocupacion[row.consultorio][dia].push(hora);
          }
      }
    }

     // Sort hours within each day (optional, but matches PHP logic)
     const diasOrdenados = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
     for (const dni in personas) {
         for (const consultorio in personas[dni].ocupacion) {
             // Sort days
             const sortedDias = {};
             Object.keys(personas[dni].ocupacion[consultorio])
                 .sort((a, b) => diasOrdenados.indexOf(a) - diasOrdenados.indexOf(b))
                 .forEach(dia => {
                     // Sort hours within the day
                     personas[dni].ocupacion[consultorio][dia].sort((a, b) => {
                         const aHora = parseInt(a.split(' ')[0]);
                         const bHora = parseInt(b.split(' ')[0]);
                         return aHora - bHora;
                     });
                     sortedDias[dia] = personas[dni].ocupacion[consultorio][dia];
                 });
             personas[dni].ocupacion[consultorio] = sortedDias;
         }
     }


    res.json(personas); // Send the processed data

  } catch (error) {
    console.error('Error fetching personas data:', error);
    res.status(500).json({ message: 'Error fetching data from database.' });
  }
});

module.exports = router;
