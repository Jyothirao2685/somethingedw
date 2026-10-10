import express from 'express';
import pool from '../config/db.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// --- PUBLIC ROUTES ---

// GET all active locations
router.get('/filters/locations', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM locations WHERE is_active = 1 ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET all active categories
router.get('/filters/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM property_categories WHERE is_active = 1 ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// --- ADMIN ROUTES (Protected) ---

// Create Location
router.post('/admin/filters/locations', adminAuth, async (req, res) => {
  try {
    const { name } = req.body;
    await pool.query('INSERT INTO locations (name) VALUES (?)', [name]);
    res.json({ message: 'Location added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Delete Location
router.delete('/admin/filters/locations/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM locations WHERE id = ?', [req.params.id]);
    res.json({ message: 'Location removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Create Category
router.post('/admin/filters/categories', adminAuth, async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    await pool.query('INSERT INTO property_categories (name, slug) VALUES (?, ?)', [name, slug]);
    res.json({ message: 'Category added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Delete Category
router.delete('/admin/filters/categories/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM property_categories WHERE id = ?', [req.params.id]);
    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
