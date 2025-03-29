const bcrypt = require('bcrypt');
const db = require('./config/db');

async function createAdminUser() {
  try {
    console.log('Iniciando creación de usuario admin...');
    
    // Generate hash for 'admin123'
    const saltRounds = 10;
    const password = 'admin123';
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('Hash generado:', hash);
    
    // Check if admin user exists
    const [existingUsers] = await db.query('SELECT * FROM admins WHERE username = ?', ['admin']);
    
    if (existingUsers.length > 0) {
      // Update existing admin
      console.log('Actualizando usuario admin existente...');
      await db.query(
        'UPDATE admins SET password_hash = ? WHERE username = ?',
        [hash, 'admin']
      );
      console.log('Usuario admin actualizado con éxito!');
    } else {
      // Create new admin
      console.log('Creando nuevo usuario admin...');
      await db.query(
        'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
        ['admin', hash]
      );
      console.log('Usuario admin creado con éxito!');
    }
    
    // Verify the user was created/updated
    const [users] = await db.query('SELECT * FROM admins WHERE username = ?', ['admin']);
    console.log('Usuario en la base de datos:', users[0]);
    
    console.log('Proceso completado con éxito!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdminUser();