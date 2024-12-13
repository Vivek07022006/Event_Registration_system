import React from 'react';
import '../styles/home.css';
import NavBar from './NavBar';

const Home = () => {
  return (
    <div className="home">
      <NavBar />
      <div >
        <h1>Welcome to Event Registration System</h1>
        <p>Manage and register for events seamlessly!</p>
      </div>
    </div>
  );
};

export default Home;
