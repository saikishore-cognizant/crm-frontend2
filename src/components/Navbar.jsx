import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ handleSectionChange }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src="/images/admin.png" alt="Logo" className="logo" />
        <div className="user-info">
          <span className="user-role">Admin</span>
          <span className="user-name">John Doe</span>
          <span className="user-email">john.doe@example.com</span>
        </div>
      </div>
      <div className="navbar-center">
        <h1>CRM</h1>
      </div>
      <div className="navbar-links">
        <button onClick={() => handleSectionChange('AllCustomers')}>Customers</button>
        <button onClick={() => handleSectionChange('Sales')}>Sales</button>
        <button onClick={() => handleSectionChange('Tickets')}>Tickets</button>
        <button onClick={() => handleSectionChange('Campaigns')}>Campaigns</button>
        <button onClick={() => handleSectionChange('Reports')}>Reports</button>
      </div>
      <div className="navbar-right">
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
