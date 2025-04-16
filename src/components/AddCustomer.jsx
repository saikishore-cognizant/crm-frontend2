import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../styles/AddCustomer.css';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    purchaseHistory: '',
    segmentationData: '',
    salesOpportunities: [],
    supportTickets: []
  });

  const cookies = new Cookies();
  const token = cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9090/api/customers', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Customer added successfully!');
    } catch (error) {
      console.error('There was an error adding the customer:', error);
    }
  };

  return (
    <div className="add-customer-container">
      <h1>Add New Customer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          />
          <input
          type="text"
          name="contactInfo"
          placeholder="Contact Info"
          value={formData.contactInfo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="purchaseHistory"
          placeholder="Purchase History"
          value={formData.purchaseHistory}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="segmentationData"
          placeholder="Segmentation Data"
          value={formData.segmentationData}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
