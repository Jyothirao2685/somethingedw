import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import propertyRoutes from './routes/propertyRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import adminPropertyRoutes from './routes/adminPropertyRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import filterRoutes from './routes/filterRoutes.js';
import adminAuth from './middleware/adminAuth.js';
import initDB from './config/initDB.js';
import logger from './middleware/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(logger);
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// TEST ROUTE
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));


// Consolidated Routes
app.use('/api', filterRoutes);

// Public Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);

// Admin Routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/properties', adminAuth, adminPropertyRoutes);
app.use('/api/admin/enquiries', adminAuth, enquiryRoutes);
app.use('/api/admin/testimonials', adminAuth, testimonialRoutes);
app.use('/api/admin/blogs', adminAuth, blogRoutes);
app.use('/api/media', mediaRoutes);

// Serve built frontend (production)
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// SPA fallback — must come AFTER all API routes
// Use a middleware function to avoid Express 5 path-to-regexp issues
app.use((req, res, next) => {
  // Only serve index.html for GET requests that don't match an API route
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

const PORT = process.env.PORT || 5005;

// Initialize DB tables then start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});
