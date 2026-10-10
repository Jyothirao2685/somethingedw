import express from 'express';
import crypto from 'crypto';
import pool from '../config/db.js';
import { logActivity } from '../utils/activityLogger.js';

const router = express.Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM admin_users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const token = crypto.randomBytes(32).toString('hex');

    // Store token in memory
    if (!req.app.locals.adminTokens) {
      req.app.locals.adminTokens = new Map();
    }
    req.app.locals.adminTokens.set(token, {
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });

    // Log login
    logActivity(user.id, 'ADMIN_LOGIN', `Admin logged in: ${user.username}`, req.ip);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token && req.app.locals.adminTokens) {
    req.app.locals.adminTokens.delete(token);
  }
  res.json({ message: 'Logged out' });
});

export default router;
