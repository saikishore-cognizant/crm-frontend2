import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import '../styles/Login.css'
const Login = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const cookies = new Cookies();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
const response = await axios.post('http://localhost:9090/login', formData);
const token = response.data; // Extract the token from response.data
      console.log('JWT Token:', token); // Log the token
      cookies.set("token",token);
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
