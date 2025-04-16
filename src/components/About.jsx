import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>Welcome to the CRM System</h1>
      <p>
        This Customer Relationship Management (CRM) system is designed to help businesses manage their interactions with current and potential customers. 
        It uses Spring Boot and Spring frameworks for the backend and React for the frontend.
      </p>
      <p>Features include:</p>
      <ul>
        <li>Customer Profiles Management</li>
        <li>Sales Opportunities Tracking</li>
        <li>Support Ticket Handling</li>
        <li>Campaign Management</li>
        <li>Comprehensive Reporting</li>
      </ul>
      <p>
        Use the navigation bar on the left to explore different modules and manage your customer data efficiently.
      </p>
    </div>
  );
};

export default About;
