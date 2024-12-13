import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import UserSidebar from './UserSidebar';
import '../styles/user-dashboard.css'; 
import '../styles/user-sidebar.css';
const UserEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('/events');
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="user-dashboard">
      <UserSidebar />
      <div className="user-content">
        <h2>Available Events</h2>
        {events.length > 0 ? (
          <ul className="event-list">
            {events.map((event) => (
              <li key={event._id} className="event-item">
                <h3>{event.name}</h3>
                <p>
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p
            
          >
            No Events Available.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserEvents;
