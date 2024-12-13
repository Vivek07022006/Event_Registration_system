import React from 'react';
import '../styles/about.css';
import NavBar from './Navbar.jsx';

const About = () => {
  return (
    <div className="about">
      <NavBar />
      <div >
        <h1>About Event Registration System</h1>
        <p>
          Event Registration is a comprehensive platform designed to make event management
          effortless and efficient. Whether you're planning a conference, workshop, or
          seminar, our tools help you manage registrations, scheduling, and more.
        </p>
      </div>
    </div>
  );
};

export default About;
