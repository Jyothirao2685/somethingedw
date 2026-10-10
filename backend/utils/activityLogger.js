import pool from '../config/db.js';

/**
 * Utility to log admin activities to the database
 */
export const logActivity = async (adminId, action, details, ip) => {
  try {
    await pool.query(
      'INSERT INTO activity_logs (admin_id, action, details, ip_address) VALUES (?, ?, ?, ?)',
      [adminId, action, typeof details === 'string' ? details : JSON.stringify(details), ip]
    );
  } catch (error) {
    console.error('Failed to save activity log:', error.message);
  }
};
