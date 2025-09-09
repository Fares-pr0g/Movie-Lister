// routes/authRoutes.js
import express from 'express';
import passport from '../config/passport.js';
import { getCurrentUser, logoutUser } from '../controllers/authController.js';

const authRouter = express.Router();

// Google OAuth
// Route 1: Start OAuth login with Google
authRouter.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] })
);
// Route 2: OAuth callback after Google login
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful login
    res.redirect(process.env.FRONTEND_URL); // Redirect to frontend
  }
);

// GitHub OAuth
authRouter.get('/github', passport.authenticate('github', { scope: [ 'user:email'] })
);

authRouter.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=github`
  }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL); // success
  }
);

// session routes
authRouter.get('/me', getCurrentUser);
authRouter.post('/logout', logoutUser);

export default authRouter;
