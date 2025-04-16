import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const cookies = new Cookies();
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:9090/login', formData);
        const token = response.data; // Extract the token from response.data
        console.log('JWT Token:', token); // Log the token
        cookies.set("token", token);
        alert('Login successful!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        await axios.post('http://localhost:9090/register', formData);
        alert('Registration successful!');
        const loginResponse = await axios.post('http://localhost:9090/login', formData);
        const token = loginResponse.data; // Extract the token from response.data
        console.log('JWT Token:', token); // Log the token
        cookies.set("token", token);
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      console.error(`Error ${isLogin ? 'logging in' : 'registering'} user`, error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" onChange={toggleForm} />
          <span className="slider" />
          <span className="card-side" />
          <div className="flip-card__inner">
            <div className={`flip-card__front ${isLogin ? '' : 'hidden'}`}>
              <div className="title">Log in</div>
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button className="flip-card__btn" type="submit">Let's go!</button>
              </form>
            </div>
            <div className={`flip-card__back ${isLogin ? 'hidden' : ''}`}>
              <div className="title">Sign up</div>
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button className="flip-card__btn" type="submit">Confirm!</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Form;
