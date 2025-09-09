import axios from 'axios';
axios.defaults.withCredentials = true; // Enable sending cookies with requests


const BASE_URL = "http://localhost:3000/api";

// External API calls running through our API
export const getPopularMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movies/popular`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch popular movies");
    }
    return response.data;
}

export const searchMovies = async (query) => {
    const response = await axios.get(`${BASE_URL}/movies/search`, {
        params: {
            query: query
        }
    });
    if (response.status !== 200) {
        throw new Error("Failed to fetch searching movies");
    }
    return response.data;
}

//Auth Controllers
export const getCurrentUser = async() =>{
    const response = await axios.get(`${BASE_URL}/auth/me`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch current user");
    }
    return response.data;
}

export const logoutUser = async() =>{
    const response = await axios.post(`${BASE_URL}/auth/logout`);
    return response.data;
}

// Favorites Controllers
export const getFavorites= async() =>{
    const response = await axios.get(`${BASE_URL}/users/favorites`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch favorite movies");
    }
    return response.data;
}

export const addFavorite = async (movie) => {
    const response = await axios.post(`${BASE_URL}/users/favorites`, movie);
    if (response.status !== 201) {
        throw new Error("Failed to add favorite movie");
    }
    return response.data;
}

export const removeFavorite= async (movieId) =>{
    const response= await axios.delete(`${BASE_URL}/users/favorites/${movieId}`);
    if (response.status !== 200) {
        throw new Error("Failed to remove favorite movie");
    }
    return response.data;
}

//Checklist Controllers
export const getChecklist= async() =>{
    const response = await axios.get(`${BASE_URL}/users/watchlist`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch checklist movies");
    }
    return response.data;
}

export const addToChecklist = async (movie) => {
    const response = await axios.post(`${BASE_URL}/users/watchlist`, movie);
    if (response.status !== 201) {
        throw new Error("Failed to add movie to checklist");
    }
    return response.data;
}

export const removeFromChecklist = async (movieId) => {
    const response = await axios.delete(`${BASE_URL}/users/watchlist/${movieId}`);
    if (response.status !== 200) {
        throw new Error("Failed to remove movie from checklist");
    }
    return response.data;
}