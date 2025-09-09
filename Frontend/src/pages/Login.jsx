import React, { useEffect, useState } from "react";
import Image from "../assets/movies_wallpaper.jpg";
import CircularText from '../TextAnimations/CircularText/CircularText.jsx';
import GoogleSvg from "../assets/icons8-google.svg";
import GithubPng from "../assets/github_logo.png";
import "../css/Login.css";



const Login = () => {

        // Redirect user to backend OAuth routes
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/api/auth/google";
    }

    const handleGithubLogin = () => {
        window.location.href = "http://localhost:3000/api/auth/github";
    }

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <CircularText
              text="FARES*MOVIE*APP*"
              onHover="pause"/>
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please choose your login method:</p>

              <div className="login-center-buttons">
                <button onClick={handleGithubLogin} className="github" type="button">
                    <img  src={GithubPng} alt="github button" />
                  Log In with Github
                </button>
                <button onClick={handleGoogleLogin} className="google" type="button">
                  <img  src={GoogleSvg} alt="google button" />
                  Log In with Google
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;