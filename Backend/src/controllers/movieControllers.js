import axios from 'axios';
import Favorites from '../models/Favorites.js';
import Checklist from '../models/Checklist.js';
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

// Favorites controllers

export const addToFavorites= async(req,res) =>{
    try{
        const {_id,title, release_date,poster_path, overview }=req.body
        const newMovie= new Favorites({_id, title, release_date, poster_path, overview});
        await newMovie.save();
        res.status(201).json({message: "Movie added to favorites", movie: newMovie});

    }catch(error){
        console.error('Add to favorites error:', error);
        res.status(500).json({ error: "Failed to add to favorites" });
    }
}

export const getFavorites= async (_,res) =>{
    try{
        const favorites = await Favorites.find().sort({ createdAt: -1 });
        res.status(200).json(favorites);
    }catch(err){
        console.error('Get favorites error:', err);
        res.status(500).json({ error: "Failed to get favorites" });
    }
}

export const removeFromFavorites = async (req, res) => {
    try {
        const deleteFavorite= await Favorites.findByIdAndDelete(req.params.id);
        deleteFavorite 
            ? res.status(200).json({ message: "Movie removed from favorites" }) 
            : res.status(404).json({ error: "Movie not found" });
    } catch (err) {
        console.error('Remove from favorites error:', err);
        res.status(500).json({ error: "Failed to remove from favorites" });
    }
};



// Checklist controllers

export const addToChecklist= async(req,res) =>{
    try{
        const {_id,title, release_date,poster_path, overview }=req.body
        const newMovie= new Checklist({_id, title, release_date, poster_path, overview});
        await newMovie.save();
        res.status(201).json({message: "Movie added to checklist", movie: newMovie});
    }catch(error){
        console.error('Add to checklist error:', error);
        res.status(500).json({ error: "Failed to add to checklist" });
    }
}

export const getChecklist= async (_,res) =>{
    try{
        const checklist = await Checklist.find().sort({ createdAt: -1 });
        res.status(200).json(checklist);
    }catch(err){
        console.error('Get checklist error:', err);
        res.status(500).json({ error: "Failed to get checklist" });
    }
}

export const removeFromChecklist = async (req, res) => {
    try {
        const deleteChecklist= await Checklist.findByIdAndDelete(req.params.id);
        deleteChecklist
            ? res.status(200).json({ message: "Movie removed from checklist" })
            : res.status(404).json({ error: "Movie not found" });
    } catch (err) {
        console.error('Remove from checklist error:', err);
        res.status(500).json({ error: "Failed to remove from checklist" });
    }
};

