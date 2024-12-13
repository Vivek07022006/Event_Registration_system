import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar.jsx';
import '../styles/login-register.css';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'User', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    try {
      const { data } = await api.post(endpoint, formData);
      console.log(data);
      

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usrEmail', formData.email);
        const redirectPath = data.role === 'Admin' ? '/dashboard-admin/events' : '/dashboard-user/events';
        window.location.href = redirectPath;
      } else {
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred.');
      alert(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="login">
      <NavBar />
      <div className="login__form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {isLogin && (
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <button
          className="btn-link"
          onClick={() => setIsLogin(!isLogin)}
          style={{
            marginTop: '10px',
            background: 'none',
            border: 'none',
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {isLogin ? 'Need to register? Click here' : 'Already a user? Log in'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;
