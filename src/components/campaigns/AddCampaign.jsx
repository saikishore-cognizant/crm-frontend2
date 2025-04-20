import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../styles/campaigns/AddCampaign.css';

const AddCampaign = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    name: '',
    type: ''
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
      await axios.post('http://localhost:9090/api/campaigns', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Campaign added successfully!');
    } catch (error) {
      console.error('There was an error adding the campaign:', error);
    }
  };

  return (
    <div className="add-campaign-container">
      <h1>Add New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
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
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Campaign</button>
      </form>
    </div>
  );
};

export default AddCampaign;
