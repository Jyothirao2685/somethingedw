import pool from './config/db.js';

async function clearDB() {
  try {
    await pool.query('TRUNCATE TABLE properties');
    console.log('Successfully cleared properties table.');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing table:', error);
    process.exit(1);
  }
}

clearDB();
