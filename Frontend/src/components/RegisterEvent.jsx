import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import UserSidebar from './UserSidebar';
import '../styles/user-dashboard.css';

const RegisterEvent = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/events');
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to fetch events.');
      } finally {
        setLoading(false); 
      }
    };
    fetchEvents();
  }, []);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setUserName('');
    setUserPhone('');
  };

  const handleRegister = async () => {
    if (!userName || !userPhone) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      const { name, date } = selectedEvent;
      const response = await axios.post('/registration', {
        eventName: name,
        eventDate: date,
        userEmail: localStorage.getItem('usrEmail'),
        userName,
        userPhone,
      });

      if (response.status === 201) {
        alert(`Successfully registered for the event: ${name}`);
        handleCloseModal();
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering for the event:', error);
      alert('Failed to register for the event. Please try again later.');
    }
  };

  return (
    <div className="user-dashboard">
      <UserSidebar />
      <div className="user-content">
        <h2>Register for an Event</h2>
        {loading ? ( 
          <p>Loading events...</p>
        ) : events.length === 0 ? ( 
          <p>No Events available to register.</p>
        ) : (
          <div className="event-list">
            {events.map((event) => (
              <div className="event-item" key={event._id}>
                <h3>{event.name}</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.description}</p>
                <button className="btn" onClick={() => handleOpenModal(event)}>
                  Register
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <h2>Register for {selectedEvent.name}</h2>
            <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>

            <label>
              Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </label>

            <label>
              Phone:
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                required
              />
            </label>

            <button className="btn" onClick={handleRegister}>
              Register
            </button>
            <button className="btn btn-warning" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterEvent;
