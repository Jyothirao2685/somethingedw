import express from 'express';
import upload from '../middleware/upload.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// POST /api/media/upload
// Upload single image
router.post('/upload', adminAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // Return the relative URL to be saved in DB
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// POST /api/media/upload-multiple
// Upload multiple images
router.post('/upload-multiple', adminAuth, upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const urls = req.files.map(file => `/uploads/${file.filename}`);
  res.json({ urls });
});

export default router;
