import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../styles/sales/AddSale.css';

const AddSale = () => {
  const [formData, setFormData] = useState({
    closingDate: '',
    estimatedValue: '',
    salesStage: '',
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
      await axios.post('http://localhost:9090/api/sales-opportunities', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Sale added successfully!');
    } catch (error) {
      console.error('There was an error adding the sale:', error);
    }
  };

  return (
    <div className="add-sale-container">
      <h1>Add New Sale</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="closingDate"
          placeholder="Closing Date"
          value={formData.closingDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="estimatedValue"
          placeholder="Estimated Value"
          value={formData.estimatedValue}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="salesStage"
          placeholder="Sales Stage"
          value={formData.salesStage}
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
        <button type="submit">Add Sale</button>
      </form>
    </div>
  );
};

export default AddSale;
