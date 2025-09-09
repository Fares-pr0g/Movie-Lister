import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import "../css/NavBar.css"
import CircularText from '../TextAnimations/CircularText/CircularText.jsx';
import { getCurrentUser, logoutUser } from '../services/api.js';
import { FiLogOut } from "react-icons/fi";

function NavBar() {
    const [user,setUser]= useState(null);

    useEffect(()=>{
        const fetchUser= async()=>{
            const currentUser = await getCurrentUser();
            setUser(currentUser.user);
        };
        fetchUser();
    },[]);

    const handleLogout= async()=>{
        await logoutUser();
        setUser(null); //reset user state
    };


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
                
                {user ? (
                <div className="user-info">
                    <img
                        src={user.avatar}
                        alt={user.displayName || user.username}
                    />
                    
                    <span className="username">{user.displayName || user.username}</span>
                    <button onClick={handleLogout} className="logout-button">Logout <FiLogOut /></button>
                </div>
                ):(
                    <Link to="/login" className="nav-link">Login</Link>
                )}
            </div>
        </nav>
    )
}

export default NavBar;