const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// POST /api/auth/login
// Authenticate user and generate JWT token
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Check if the user exists
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    
    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = rows[0];
    
    // Ensure password_hash exists before comparing
    if (!user.password_hash) {
      console.error('User found but password_hash is missing or invalid');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare passwords
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (bcryptError) {
      console.error('Error comparing passwords:', bcryptError);
      return res.status(401).json({ message: 'Authentication error' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'suyay-secret-key', // Changed to match authMiddleware.js
      { expiresIn: '24h' }
    );
    
    // Send the token
    res.json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during authentication' });
  }
});

// POST /api/auth/verify
// Verify if token is valid (for frontend authentication check)
router.post('/verify', async (req, res) => {
  const token = req.body.token;
  
  if (!token) {
    return res.status(401).json({ valid: false });
  }
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'suyay-secret-key'); // Changed to match authMiddleware.js
    
    // Token is valid
    res.json({ 
      valid: true,
      user: {
        id: decoded.id,
        username: decoded.username
      } 
    });
  } catch (error) {
    // Token is invalid
    res.json({ valid: false });
  }
});

module.exports = router;
