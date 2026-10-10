import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all testimonials (is_active filter handled by query param if needed, or separate routes)
router.get('/', async (req, res) => {
  try {
    // If admin header is present (checked by middleware in server.js), show all, otherwise only active
    // But for simplicity, we'll use a query param or just separate logic
    const showAll = req.query.admin === 'true';
    const query = showAll 
      ? 'SELECT * FROM testimonials ORDER BY created_at DESC' 
      : 'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY created_at DESC';
    
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new testimonial
router.post('/', async (req, res) => {
  const { name, role, content, rating } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO testimonials (name, role, content, rating) VALUES (?, ?, ?, ?)',
      [name, role, content, rating || 5]
    );
    res.status(201).json({ id: result.insertId, name, role, content, rating: rating || 5 });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update testimonial
router.put('/:id', async (req, res) => {
  const { name, role, content, rating, is_active } = req.body;
  try {
    await pool.query(
      'UPDATE testimonials SET name = ?, role = ?, content = ?, rating = ?, is_active = ? WHERE id = ?',
      [name, role, content, rating, is_active, req.params.id]
    );
    res.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
