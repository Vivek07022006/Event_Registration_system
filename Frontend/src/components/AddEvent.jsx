import React, { useState } from 'react';
import axios from '../services/api';
import AdminSidebar from './AdminSidebar'; 
import '../styles/add-event.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEvent = () => {
  const [eventData, setEventData] = useState({ name: '', date: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/events', eventData); 
      toast.success('Event added successfully!');
      setEventData({ name: '', date: '', description: '' });
    } catch (error) {
      console.error('Error adding event:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to add the event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />

      <div className="content add-event">
        <h2 className="text-center mb-4">Add New Event</h2>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Event Name</label>
            <input
              type="text"
              className="form-control"
              value={eventData.name}
              onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-success" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Event'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEvent;
