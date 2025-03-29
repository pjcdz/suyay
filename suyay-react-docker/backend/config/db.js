const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db', // Service name in docker-compose
  user: process.env.DB_USER || 'suyayuser',
  password: process.env.DB_PASSWORD || 'suyaypassword',
  database: process.env.DB_NAME || 'suyaydb',
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
  // Add connection timeout settings
  connectTimeout: 60000, // Increase timeout to 60s
  debug: process.env.DB_DEBUG === 'true' ? true : false, // Only enable debug when explicitly set
  // MySQL 8.0 compatibility settings
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  // Removed authSwitchHandler which is deprecated
});

// Optional: Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database pool:', err.stack);
    // Depending on the error, you might want to exit or handle differently
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    return; // Stop further execution if connection fails initially
  }
  if (connection) {
    console.log(`Connected to database pool with threadId ${connection.threadId}`);
    connection.release(); // Release the connection back to the pool
  }
});

// Promisify the pool for async/await usage
const promisePool = pool.promise();

module.exports = promisePool; // Export the promise-based pool
