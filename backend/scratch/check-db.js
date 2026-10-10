import pool from '../config/db.js';

async function checkDb() {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM properties');
    console.log('Total properties in DB:', rows[0].count);
    
    const [allRows] = await pool.query('SELECT id, title, slug FROM properties');
    console.log('Property List:', allRows);

    const [logs] = await pool.query('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 10');
    console.log('Recent Activity Logs:', logs);
    
    process.exit(0);
  } catch (err) {
    console.error('Database error:', err);
    process.exit(1);
  }
}

checkDb();
