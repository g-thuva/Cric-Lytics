import React from 'react';
import { useTheme } from './ThemeContext'; // ensure this is the correct path
import logo1 from "./images/logo1.png";

function Header() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className="header">
      <nav className="nav container flex">
        <a href="/" className="logo-content flex">
          <img src={logo1} alt="Logo" style={{ width: "135px", height: "50px" }} />
        </a>

        <div className="menu-content">
          <ul className="menu-list flex">
            <li><a href="/#home" className="nav-link active-navlink">Home</a></li>
            <li><a href="#Player" className="nav-link">Player</a></li>
            <li><a href="#Match" className="nav-link">Match</a></li>
            <li><a href="#Stats" className="nav-link">Stats</a></li>
            <li><a href="#Pitch" className="nav-link">Pitch</a></li>
            <li><a href="#Moment" className="nav-link">Moment</a></li>
            <li><a href="#News" className="nav-link">News</a></li>
            <li><a href="/contacts" className="nav-link">Contacts</a></li>
            <li>
              <button onClick={() => setDarkMode(prev => !prev)} className="theme-toggle">
                {darkMode ? '☀️ ' : '🌙 '}
              </button>
            </li>
          </ul>

          <div className="media-icons flex">
            <a href="https://www.facebook.com"><i className="bx bxl-facebook"></i></a>
            <a href="https://twitter.com/i/flow/login"><i className="bx bxl-twitter"></i></a>
            <a href="https://www.instagram.com/accounts/login"><i className="bx bxl-instagram-alt"></i></a>
            <a href="https://github.com/login"><i className="bx bxl-github"></i></a>
            <a href="https://www.youtube.com/login"><i className="bx bxl-youtube"></i></a>
          </div>

          <i className="bx bx-x navClose-btn"></i>
        </div>

        <div className="contact-content flex">
          <a href="/profile">
            <div className="profile-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgb(61, 64, 148)"
                className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 
                  11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
              </svg>
              <div className="notification"></div>
            </div>
          </a>
        </div>

        <i className="bx bx-menu navOpen-btn"></i>
      </nav>
    </header>
  );
}

export default Header;
