import React from 'react';
import '../styles/navbar.css';

const NavBar = () => {
  return (
    <div className="navbar">
    <div className="logo">
      <img src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png" alt="Logo" />
    </div>
    <div className="nav-links">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/login">Register/Login</a>
    </div>
  </div>
  );
};

export default NavBar;
