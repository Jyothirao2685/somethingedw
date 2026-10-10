import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// POST new contact lead (public)
router.post('/', async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO enquiries (name, phone, message) VALUES (?, ?, ?)', 
      [name, phone, message || null]
    );
    
    res.status(201).json({ message: 'Message sent successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
