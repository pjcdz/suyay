const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the promise-based pool

// GET /api/consultorios
// Fetches all consultorios from the database
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT codConsultorio, descripcion FROM consultorios ORDER BY codConsultorio ASC';
    const [rows] = await db.query(query);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching consultorios:', error);
    res.status(500).json({ message: 'Error fetching data from database.' });
  }
});

module.exports = router;