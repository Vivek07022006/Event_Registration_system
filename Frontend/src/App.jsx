import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminEvents from './components/AdminEvents';
import AddEvent from './components/AddEvent';
import UpdateDeleteEvent from './components/UpdateDeleteEvent';
import UserEvents from './components/UserEvents';
import RegisterEvent from './components/RegisterEvent';
import UpdateRegistration from './components/UpdateRegistration';
import Home from './components/Home';
import About from './components/About';
import Login from './components/LoginRegister';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />


            <Route 
              path="/dashboard-admin/" 
              element={<AdminDashboard />}
            />
            <Route 
              path="/dashboard-admin/events" 
              element={<AdminEvents />}
            />
            <Route 
              path="/dashboard-admin/add-event" 
              element={<AddEvent />} 
            />
            <Route 
              path="/dashboard-admin/update-delete-event" 
              element={<UpdateDeleteEvent />}  
            />
            
   
            <Route 
              path="/dashboard-user/" 
              element={<UserDashboard />} 
            />
            <Route 
              path="/dashboard-user/events" 
              element={<UserEvents />} 
            />
            <Route 
              path="/dashboard-user/register-event" 
              element={<RegisterEvent />}
            />
            <Route 
              path="/dashboard-user/update-registration" 
              element={<UpdateRegistration />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
