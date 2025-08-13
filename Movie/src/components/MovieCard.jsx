
function MovieCard({movie}) {

    function onFavClick(){
        alert(`You clicked on the favorite button for ${movie.title}`);
    }
  
  return(
    <div className="movie-card">
        <div className="movie-poster">
            <img src={movie.url} alt={movie.title} />
            <div className="movie-overlay">
                <button className="favorite" onClick={onFavClick}>🤍</button>
            </div>
        </div>
        <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>

    </div>
  )
}

export default MovieCard;