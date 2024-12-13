import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import UserSidebar from './UserSidebar';
import '../styles/user-dashboard.css';

const UpdateRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [deleteRegistrationId, setDeleteRegistrationId] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        console.log(localStorage.getItem('usrEmail'));
        const { data } = await axios.get('/get-registrations', {
          params: {
            email: localStorage.getItem('usrEmail'),
          },
        });
        setRegistrations(data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        alert('Failed to fetch registrations.');
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchRegistrations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await axios.delete(`/registration/${id}`);
        alert('Registration deleted successfully!');
        setRegistrations((prev) => prev.filter((registration) => registration._id !== id));
      } catch (error) {
        console.error('Error deleting registration:', error);
        alert('Failed to delete the registration.');
      }
    }
  };

  const openDeleteConfirmation = (id) => {
    setDeleteRegistrationId(id);
    handleDelete(id);
  };

  return (
    <div className="user-dashboard">
      <UserSidebar />
      <div className="user-content">
        <h2>Update My Registration</h2>
        {loading ? ( 
          <p>Loading events...</p>
        ) : registrations.length === 0 ? ( 
          <p>No Registrations available.</p>
        ) : (
          <div className="event-list">
            {registrations.map((registration) => (
              <div key={registration._id} className="event-item">
                <h3>{registration.eventName}</h3>
                <p>Name: {registration.usrName}</p>
                <p>Date: {new Date(registration.eventDate).toLocaleDateString()}</p>
                <p>Phone: {registration.userPhone}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => openDeleteConfirmation(registration._id)}
                >
                  Delete Registration
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateRegistration;
