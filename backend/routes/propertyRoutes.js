import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all properties (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM properties WHERE is_active = 1 ORDER BY priority DESC, created_at DESC');
    const props = rows.map(r => ({
      ...r,
      gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery) : r.gallery || [],
      configurations: typeof r.configurations === 'string' ? JSON.parse(r.configurations) : r.configurations || [],
      highlights: typeof r.highlights === 'string' ? JSON.parse(r.highlights) : r.highlights || [],
    }));
    res.json(props);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET featured properties for homepage (public)
router.get('/featured-homes', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM properties WHERE show_on_home = 1 AND is_active = 1 ORDER BY priority DESC'
    );
    const props = rows.map(r => ({
      ...r,
      gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery) : r.gallery || [],
      configurations: typeof r.configurations === 'string' ? JSON.parse(r.configurations) : r.configurations || [],
      highlights: typeof r.highlights === 'string' ? JSON.parse(r.highlights) : r.highlights || [],
    }));
    res.json(props);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// GET single property by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.query('SELECT * FROM properties WHERE slug = ? AND is_active = 1', [slug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const prop = rows[0];
    prop.gallery = typeof prop.gallery === 'string' ? JSON.parse(prop.gallery) : prop.gallery || [];
    prop.configurations = typeof prop.configurations === 'string' ? JSON.parse(prop.configurations) : prop.configurations || [];
    prop.highlights = typeof prop.highlights === 'string' ? JSON.parse(prop.highlights) : prop.highlights || [];
    
    res.json(prop);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
