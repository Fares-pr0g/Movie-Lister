const API_KEY = "c6b819aef30b1fae91d6c9f8c8b23b49";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }
    const data= await response.json()
    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error("Failed to fetch searching movies");
    }
    const data= await response.json()
    return data.results;
}