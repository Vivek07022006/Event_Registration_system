import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import AdminSidebar from './AdminSidebar';
import '../styles/admin-events.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('/events');
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar /> 

      <div className="content admin-events">
        <h2 className="text-center mb-4">All Events</h2>
        {loading ? (
          <p style={{textAlign:"center"}}>Loading events...</p>
        ) : events.length === 0 ? (
          <p style={{textAlign:"center"}}>No events available.</p>
        ) : (
          <div className="event-cards">
            {events.map((event) => (
              <div key={event._id} className="card event-card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">{event.name}</h3>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="card-text">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
