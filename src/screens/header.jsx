// Header.js
import React from 'react';
import logo from '../assets/app_icon.png';
const Header = ({ isLoggedIn, userName, handleLogin }) => (
  <header className="header" style={{ backgroundColor: 'lightSkyBlue' }}>
    <div className="brand">
      <img src={logo} alt="Logo" className="brand-logo" />
      <h1 className="brand-name">Telemoni</h1>
    </div>
    <div className="login-icon">
      {isLoggedIn ? (
        <span className="user-name">{userName}</span>
      ) : (
        <button className="login-button" onClick={handleLogin}>Login</button>
      )}
    </div>
  </header>
);

export default Header;
