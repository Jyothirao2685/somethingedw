import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET /api/blogs — public (list published)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC'
    );
    // Parse JSON fields
    const posts = rows.map(r => ({
      ...r,
      tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags || [],
    }));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET /api/blogs/all — admin (list all including unpublished)
router.get('/all', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    const posts = rows.map(r => ({
      ...r,
      tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags || [],
    }));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET /api/blogs/:slug
router.get('/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE slug = ?', [req.params.slug]);
    if (rows.length === 0) return res.status(404).json({ message: 'Post not found' });
    const post = rows[0];
    post.tags = typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags || [];
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// POST /api/blogs — admin (create)
router.post('/', async (req, res) => {
  try {
    const { slug, title, excerpt, content, category, category_color, author, image, tags, read_time, is_published, meta_title, meta_description, meta_keywords } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ message: 'Slug and title are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO blog_posts (slug, title, excerpt, content, category, category_color, author, image, tags, read_time, is_published, meta_title, meta_description, meta_keywords)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, excerpt || null, content || null, category || null, category_color || 'orange', author || 'Adroit Team', image || null, JSON.stringify(tags || []), read_time || null, is_published !== undefined ? is_published : 1, meta_title || null, meta_description || null, meta_keywords || null]
    );

    res.status(201).json({ message: 'Blog post created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// PUT /api/blogs/:id — admin (update)
router.put('/:id', async (req, res) => {
  try {
    const { slug, title, excerpt, content, category, category_color, author, image, tags, read_time, is_published, meta_title, meta_description, meta_keywords } = req.body;

    await pool.query(
      `UPDATE blog_posts SET slug=?, title=?, excerpt=?, content=?, category=?, category_color=?, author=?, image=?, tags=?, read_time=?, is_published=?, meta_title=?, meta_description=?, meta_keywords=? WHERE id=?`,
      [slug, title, excerpt, content, category, category_color, author, image, JSON.stringify(tags || []), read_time, is_published, meta_title, meta_description, meta_keywords, req.params.id]
    );

    res.json({ message: 'Blog post updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// DELETE /api/blogs/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
