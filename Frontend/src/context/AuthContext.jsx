// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  const login = (role) => {
    setIsAuthenticated(true);
    setRole(role);
    localStorage.setItem('role', role); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('role'); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
