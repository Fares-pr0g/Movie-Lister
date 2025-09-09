import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

// External Api controllers
export const getPopularMovies = async (req,res) => {
    try{
        const response= await axios.get(`${BASE_URL}/movie/popular`,{params:{api_key:API_KEY}})
        if(response.status !== 200){
            throw new Error("Failed to fetch popular movies");
        }
        res.send(response.data.results.map(movie => ({
            ...movie,
            _id: movie.id,
        })));

    }catch(error){
        console.error('Popular movies error:', error);
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
}
    
    

export const searchMovies = async (req,res) => {
    try{
        const { query } = req.query;
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query
            }
        });
        if(response.status !== 200){
            throw new Error("Failed to search movies");
        }
        res.send(response.data.results.map(movie => ({
            ...movie,
            _id: movie.id,
        })));
    }catch(error){
        console.error('Search movies error:', error);
        res.status(500).json({ error: "Failed to search movies" });
    }
}


