import { createContext, useState, useContext, useEffect } from "react";
import {getFavorites, addFavorite, removeFavorite, getChecklist, addToChecklist, removeFromChecklist} from "../services/api";

const MovieContext = createContext();

export const useMovieContext= () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await getFavorites();
            setFavorites(response);
        };
        fetchFavorites();

        const fetchChecklist = async () => {
            const response = await getChecklist();
            setWatchList(response);
        };
        fetchChecklist();
    }, []);



    const addToFavorites = async (movie) => {
        await addFavorite(movie);
        setFavorites(prev => [...prev, movie]);
    }

    const removeFromFavorites = async (movieId) => {
        try {
            await removeFavorite(movieId);
            setFavorites(prev => prev.filter(movie => movie._id !== movieId));
        } catch (error) {
            console.error("Failed to remove favorite:", error);
        }
    }
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie._id === movieId);
    }

    const addToWatchList = async (movie) => {
        await addToChecklist(movie);
        setWatchList(prev => [...prev, movie]);
    }

    const removeFromWatchList = async (movieId) => {
        try{
            await removeFromChecklist(movieId);
            setWatchList(prev => prev.filter(movie => movie._id !== movieId));
        }catch(error){
            console.error("Failed to remove from watchlist:", error);
        }
    };

    const isInWatchList = (movieId) => {
        return watchList.some(movie => movie._id === movieId);
    }

    const value={
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        watchList,
        addToWatchList,
        removeFromWatchList,
        isInWatchList
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}