// Simple token-based admin auth middleware
// In production, use JWT or session-based auth

const ADMIN_TOKEN_KEY = 'x-admin-token';

const adminAuth = (req, res, next) => {
  const token = req.headers[ADMIN_TOKEN_KEY];
  
  if (!token) {
    return res.status(401).json({ message: 'No auth token provided' });
  }

  // Token is set during login — stored in memory for simplicity
  // In production, use JWT verification
  if (req.app.locals.adminTokens && req.app.locals.adminTokens.has(token)) {
    req.adminUser = req.app.locals.adminTokens.get(token);
    return next();
  }

  return res.status(403).json({ message: 'Invalid or expired token' });
};

export default adminAuth;
