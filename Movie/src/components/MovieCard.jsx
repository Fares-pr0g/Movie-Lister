import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { MdAddTask } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";

function MovieCard({movie}) {
    const { addToFavorites, removeFromFavorites, isFavorite, addToWatchList, removeFromWatchList, isInWatchList } = useMovieContext();
    const favorite = isFavorite(movie.id);
    const inWatchList = isInWatchList(movie.id);

    function onFavClick(e){
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    function onWatchListClick(e){
        e.preventDefault();
        if (inWatchList) removeFromWatchList(movie.id);
        else addToWatchList(movie);
    }
    return(
    <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
                <button className={`watchlist-btn ${inWatchList ? "active" : ""}`} onClick={onWatchListClick}>
                    {inWatchList ? <MdAddTask /> : <MdOutlineAddCircleOutline />}
                </button>
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavClick}>{favorite ? "❤️" : "🤍"}</button>
            </div>
        </div>
        <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p>{movie.release_date?.slice(0,-3)}</p>
        </div>

    </div>
  )
}

export default MovieCard;