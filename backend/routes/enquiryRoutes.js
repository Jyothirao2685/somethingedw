import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// POST /api/enquiries  — public (from consultation form)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message, property_interest } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO enquiries (name, phone, email, message, property_interest) VALUES (?, ?, ?, ?, ?)',
      [name, phone, email || null, message || null, property_interest || null]
    );

    res.status(201).json({ message: 'Enquiry submitted successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET /api/enquiries  — admin only (list all)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// PATCH /api/enquiries/:id/status  — admin only (update status)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    await pool.query('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// DELETE /api/enquiries/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM enquiries WHERE id = ?', [req.params.id]);
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
