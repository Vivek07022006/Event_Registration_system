import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import AdminSidebar from './AdminSidebar';
import '../styles/admin-events.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateDeleteEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({ name: '', date: '', description: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/events');
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/events/${selectedEvent}`, eventData);
      toast.success('Event updated successfully!');
      resetForm();
      await refreshEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/events/${deleteEventId}`);
      toast.success('Event deleted successfully!');
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== deleteEventId));
      setConfirmDelete(false);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event.');
    }
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setEventData({ name: '', date: '', description: '' });
    setShowPopup(false);
    setConfirmDelete(false);
  };

  const refreshEvents = async () => {
    const { data } = await axios.get('/events');
    setEvents(data);
  };

  const handleClosePopup = () => {
    resetForm();
  };

  const openDeleteConfirmation = (id) => {
    setDeleteEventId(id);
    setConfirmDelete(true);
  };

  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />
      <div className="content admin-events">
        <h2 className="text-center mb-4">Update/Delete Events</h2>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading events...</p>
        ) : events.length > 0 ? (
          <div className="event-cards">
            {events.map((event) => (
              <div key={event._id} className="card event-card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">{event.name}</h3>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="card-text">{event.description}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setSelectedEvent(event._id);
                        setEventData({
                          name: event.name,
                          date: event.date.split('T')[0],
                          description: event.description,
                        });
                        setShowPopup(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => openDeleteConfirmation(event._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No Event Available , Please Add Event</p>
        )}

        {showPopup && (
          <div className="popup-wrapper" onClick={handleClosePopup}>
            <div
              className="popup-box"
              onClick={(e) => e.stopPropagation()} 
            >
              <h4>Update Event</h4>
              <form onSubmit={handleUpdate}>
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
                <div className="d-flex justify-content-end">
                  <button className="btn btn-secondary me-2" onClick={handleClosePopup} type="button">
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Update Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {confirmDelete && (
          <div className="popup-wrapper" onClick={() => setConfirmDelete(false)}>
            <div
              className="popup-box"
              onClick={(e) => e.stopPropagation()} 
            >
              <h4>Confirm Deletion</h4>
              <p>Are you sure you want to delete this event?</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateDeleteEvent;
