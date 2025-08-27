import express from 'express';
import { getPopularMovies, searchMovies, addToFavorites ,getFavorites,removeFromFavorites, addToChecklist, getChecklist, removeFromChecklist } from "../controllers/movieControllers.js";

const movieRouter= express.Router();

movieRouter.get('/popular', getPopularMovies);
movieRouter.get('/search', searchMovies);

movieRouter.get('/favorites', getFavorites);
movieRouter.post('/favorites', addToFavorites);
movieRouter.delete('/favorites/:id', removeFromFavorites);

movieRouter.get('/checklist', getChecklist);
movieRouter.post('/checklist', addToChecklist);
movieRouter.delete('/checklist/:id', removeFromChecklist);

export default movieRouter;