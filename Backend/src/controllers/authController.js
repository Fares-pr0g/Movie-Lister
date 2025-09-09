// controllers/authController.js

// GET /api/me
export const getCurrentUser = (req, res) => {
  if (!req.user) return res.status(401).json({ user: null });
  const { _id, username, displayName, email, avatar, profileUrl } = req.user;
  res.json({ user: { _id, username, displayName, email, avatar, profileUrl } });
};

// POST /api/logout
export const logoutUser = (req, res) => {
  req.logout(err => {
    if (err) {
      res.status(500).json({ error: 'Logout failed' });
      return next(err);
    }
    res.clearCookie('movieapp.sid');
    res.status(204).end();
  });
};

// Protected route middleware
export const requireAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  next();
};
