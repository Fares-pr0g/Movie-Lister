import express from 'express';
import {addToFavorites, getFavorites, removeFromFavorites, addToWatchlist, getWatchlist, removeFromWatchlist } from '../controllers/userControllers.js';
import { requireAuth } from '../controllers/authController.js';


const userRouter = express.Router();

//favorites routes
userRouter.post('/favorites', requireAuth, addToFavorites);
userRouter.get('/favorites', requireAuth, getFavorites);
userRouter.delete('/favorites/:id', requireAuth, removeFromFavorites);

//watchlist routes
userRouter.post('/watchlist', requireAuth, addToWatchlist);
userRouter.get('/watchlist', requireAuth, getWatchlist);
userRouter.delete('/watchlist/:id', requireAuth, removeFromWatchlist);

export default userRouter;

// require authentication middleware for all user routes (protects the user info)