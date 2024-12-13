import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminEvents from './AdminEvents';
import AddEvent from './AddEvent';
import UpdateDeleteEvent from './UpdateDeleteEvent';
import '../styles/admin-dashboard.css'; 


const AdminDashboard = () => {
  return (
    <div className="admin-dashboard d-flex">
      
      <div className="content flex-grow-1">
      <AdminSidebar />
        <Routes>
          <Route path="/events" element={<AdminEvents />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/update-delete-event" element={<UpdateDeleteEvent />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
