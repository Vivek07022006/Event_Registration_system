import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/user-sidebar.css';

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <h2>User Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard-user/events">Available Events</Link>
        </li>
        <li>
          <Link to="/dashboard-user/register-event">Register for an Event</Link>
        </li>
        <li>
          <Link to="/dashboard-user/update-registration">Update My Registration</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
