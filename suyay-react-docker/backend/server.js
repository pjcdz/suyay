require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Database connection

const app = express();
const PORT = process.env.PORT || 3001;

// Global error handler
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
};

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Basic Route
app.get('/', (req, res) => {
  res.send('Suyay Backend API is running!');
});

// API routes
const consultorioRoutes = require('./routes/consultorios');
const authRoutes = require('./routes/auth');
const horasAlquiladasRoutes = require('./routes/horasAlquiladas');
const personasRoutes = require('./routes/personas');

app.use('/api/consultorios', consultorioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/horasalquiladas', horasAlquiladasRoutes);
app.use('/api/personas', personasRoutes);

// Apply global error handler
app.use(errorHandler);

// Handle uncaught exceptions to prevent server crash
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Keep the server running despite the error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Keep the server running despite the error
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  // DB connection is tested within db.js pool creation now
});
