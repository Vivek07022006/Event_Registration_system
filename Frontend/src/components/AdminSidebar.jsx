import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin-dashboard.css';
import '../styles/admin-sidebar.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="side-bar-items">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard-admin/events">Events</Link>
        </li>
        <li>
          <Link to="/dashboard-admin/add-event">Add an Event</Link>
        </li>
        <li>
          <Link to="/dashboard-admin/update-delete-event">Update/Delete Event</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
