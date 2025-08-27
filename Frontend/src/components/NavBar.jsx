import {Link} from 'react-router-dom'
import "../css/NavBar.css"
import CircularText from '../TextAnimations/CircularText/CircularText.jsx';

function NavBar() {
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <CircularText
                    text="FARES*MOVIE*WATCHLIST*"
                    onHover="pause"
                    spinDuration={20} 
                    className="custom-class"
                    />
                </Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/watchlist" className="nav-link">My Watch List</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    )
}

export default NavBar;