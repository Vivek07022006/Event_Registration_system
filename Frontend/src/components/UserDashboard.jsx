// src/components/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import UserEvents from './UserEvents';
import RegisterEvent from './RegisterEvent';
import UpdateRegistration from './UpdateRegistration';
import api from '../services/api';
import '../styles/user-dashboard.css';
import '../styles/user-sidebar.css';

const UserDashboard = () => {
  const [currentView, setCurrentView] = useState('events');
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/user/registrations', { 
        headers: { Authorization: token },
      });
      setRegisteredEvents(response.data);
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <div className="user-dashboard">
      <UserSidebar onViewChange={handleViewChange} />
      <div className="user-content">
        {currentView === 'events' && <UserEvents />}
        {currentView === 'register' && <RegisterEvent />}
        {currentView === 'update-registration' && <UpdateRegistration registrations={registeredEvents} />}
      </div>
    </div>
  );
};

export default UserDashboard;
