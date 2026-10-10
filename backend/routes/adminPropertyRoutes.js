import express from 'express';
import pool from '../config/db.js';
import { logActivity } from '../utils/activityLogger.js';

const router = express.Router();

// GET /api/admin/properties — all (including inactive)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM properties ORDER BY priority DESC, created_at DESC');
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

// GET /api/admin/properties/home — only show_on_home=1 & is_active=1 (for frontend)
router.get('/home', async (req, res) => {
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

// POST /api/admin/properties
router.post('/', async (req, res) => {
  try {
    const {
      slug, title, location, price, price_per_sqft, status, type, category,
      image, gallery, developer, configurations, area, floors,
      possession, rera, highlights, about, priority, show_on_home, is_active,
      meta_title, meta_description, meta_keywords
    } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ message: 'Slug and title are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO properties (slug, title, location, price, price_per_sqft, status, type, category, image, gallery, developer, configurations, area, floors, possession, rera, highlights, about, priority, show_on_home, is_active, meta_title, meta_description, meta_keywords)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug, title, location, price, price_per_sqft, status, type, category || 'residential',
        image, JSON.stringify(gallery || []), developer, JSON.stringify(configurations || []),
        area, floors, possession, rera, JSON.stringify(highlights || []),
        about, priority || 0, show_on_home ? 1 : 0, is_active !== undefined ? (is_active ? 1 : 0) : 1,
        meta_title || null, meta_description || null, meta_keywords || null
      ]
    );

    res.status(201).json({ message: 'Property created', id: result.insertId });

    // Log activity
    logActivity(req.admin.id, 'CREATE_PROPERTY', `Created property: ${title} (${slug})`, req.ip);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// PUT /api/admin/properties/:id
router.put('/:id', async (req, res) => {
  try {
    const {
      slug, title, location, price, price_per_sqft, status, type, category,
      image, gallery, developer, configurations, area, floors,
      possession, rera, highlights, about, priority, show_on_home, is_active,
      meta_title, meta_description, meta_keywords
    } = req.body;

    await pool.query(
      `UPDATE properties SET slug=?, title=?, location=?, price=?, price_per_sqft=?, status=?, type=?, category=?, image=?, gallery=?, developer=?, configurations=?, area=?, floors=?, possession=?, rera=?, highlights=?, about=?, priority=?, show_on_home=?, is_active=?, meta_title=?, meta_description=?, meta_keywords=? WHERE id=?`,
      [
        slug, title, location, price, price_per_sqft, status, type, category || 'residential',
        image, JSON.stringify(gallery || []), developer, JSON.stringify(configurations || []),
        area, floors, possession, rera, JSON.stringify(highlights || []),
        about, priority || 0, show_on_home ? 1 : 0, is_active ? 1 : 0,
        meta_title || null, meta_description || null, meta_keywords || null,
        req.params.id,
      ]
    );

    res.json({ message: 'Property updated' });

    // Log activity
    logActivity(req.admin.id, 'UPDATE_PROPERTY', `Updated property ID: ${req.params.id} (${title})`, req.ip);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// PATCH /api/admin/properties/:id/toggle — quick toggle show_on_home / is_active
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { field } = req.body; // 'show_on_home' or 'is_active'
    if (!['show_on_home', 'is_active'].includes(field)) {
      return res.status(400).json({ message: 'Invalid field' });
    }
    await pool.query(
      `UPDATE properties SET ${field} = NOT ${field} WHERE id = ?`,
      [req.params.id]
    );
    res.json({ message: `${field} toggled` });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// PATCH /api/admin/properties/:id/priority
router.patch('/:id/priority', async (req, res) => {
  try {
    const { priority } = req.body;
    await pool.query('UPDATE properties SET priority = ? WHERE id = ?', [priority, req.params.id]);
    res.json({ message: 'Priority updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// DELETE /api/admin/properties/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM properties WHERE id = ?', [req.params.id]);
    res.json({ message: 'Property deleted' });

    // Log activity
    logActivity(req.admin.id, 'DELETE_PROPERTY', `Deleted property ID: ${req.params.id}`, req.ip);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
