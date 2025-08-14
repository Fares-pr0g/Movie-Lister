import React, { useState,useEffect } from 'react';
import {searchMovies, getPopularMovies} from '../services/api';
import MovieCard from '../components/MovieCard';
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuerry] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect (()=>{
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
                setError("Failed to load movies...");
            }finally{
                setLoading(false);
            }
        }

        loadPopularMovies();
    }, [])


    const handleSearch = async (e)=>{
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return; // Prevent search while loading

        setLoading(true);
        try{
            const results = await searchMovies(searchQuery);
            setMovies(results);
            setError(null);

        }catch (err){
            setError("Failed to search movies ...");
            console.log(err);
        } finally{
            setLoading(false);
        }
        setSearchQuerry(""); // Clear search input after search
    };

    return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input value={searchQuery} onChange={(e) => setSearchQuerry(e.target.value)} type="text" placeholder="Search for a movie..." className="search-input"/>
            <button type="submit" className="search-button"> Search</button>
        </form>
        
        {error && <div className="error-message ">{error}</div>}

        {loading? <div className="loading">Loading...</div> :(
        <div className="movie-grid">
            {movies.map(movie => 
             <MovieCard key={movie.id} movie={movie}/>
            ) }
        </div>
        )}
        

    </div>)
}

export default Home;