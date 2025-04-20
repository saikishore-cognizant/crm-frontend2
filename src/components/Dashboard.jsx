import React, { useState } from 'react';
import '../styles/Dashboard.css';
import AllCustomers from './customers/AllCustomers';
import About from './About';
import Navbar from './Navbar';
import Sales from './sales/Sales';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <Navbar handleSectionChange={handleSectionChange} />
      <div className="dashboard-container">
        <div className="content">
          <h1>This Customer Relationship Management (CRM) system</h1>
          <div className="inner-content">
            {activeSection === 'AllCustomers' && <AllCustomers />}
            {activeSection === 'Sales' && <div><Sales/> </div>}
            {activeSection === 'Tickets' && <div>Tickets Section</div>}
            {activeSection === 'Campaigns' && <div>Campaigns Section</div>}
            {activeSection === 'Reports' && <div>Reports Section</div>}
            {!activeSection && <About />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
