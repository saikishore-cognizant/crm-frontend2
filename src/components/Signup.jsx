import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css'

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9090/register', formData);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;