import express from 'express';
import { getPopularMovies, searchMovies} from "../controllers/movieControllers.js";

const movieRouter= express.Router();

movieRouter.get('/popular', getPopularMovies);
movieRouter.get('/search', searchMovies);


export default movieRouter;