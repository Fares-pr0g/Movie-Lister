
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/MyWatchList.css";
import NavBar from "../components/NavBar";

function MyWatchList(){
    const {watchList} = useMovieContext();

    if (watchList.length > 0){
        return(
            <>
            <NavBar/>
            <div className="my-watchlist">
                <h2 className="my-watch-list-title">My Watch List</h2>
                <div className="movies-grid">
                    {watchList.map(movie => 
                        <MovieCard key={movie._id} movie={movie}/>
                    )}
                </div>
            </div>
            </>
        )
    }
    return (<><NavBar/>
        <div className="my-watchlist-empty">
            <h2>No Movies in Watch List Yet</h2>
            <p>Start adding some movies to your watch list!</p>
        </div>
    </>);
}

export default MyWatchList;
