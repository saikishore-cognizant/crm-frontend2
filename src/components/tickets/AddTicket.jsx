import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../styles/tickets/AddTicket.css';

const AddTicket = () => {
  const [formData, setFormData] = useState({
    assignedAgent: '',
    issueDescription: '',
    status: '',
    customerProfile: {
      customerId: ''
    }
  });

  const cookies = new Cookies();
  const token = cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customerId') {
      setFormData({ ...formData, customerProfile: { customerId: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9090/api/support-tickets', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Ticket added successfully!');
    } catch (error) {
      console.error('There was an error adding the ticket:', error);
    }
  };

  return (
    <div className="add-ticket-container">
      <h1>Add New Ticket</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="assignedAgent"
          placeholder="Assigned Agent"
          value={formData.assignedAgent}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="issueDescription"
          placeholder="Issue Description"
          value={formData.issueDescription}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="customerId"
          placeholder="Customer ID"
          value={formData.customerProfile.customerId}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Ticket</button>
      </form>
    </div>
  );
};

export default AddTicket;
