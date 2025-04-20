import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../styles/reports/AddReport.css';

const AddReport = () => {
  const [formData, setFormData] = useState({
    generatedDate: '',
    reportType: '',
    dataPoints: ''
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
      await axios.post('http://localhost:9090/api/reports', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Report added successfully!');
    } catch (error) {
      console.error('There was an error adding the report:', error);
    }
  };

  return (
    <div className="add-report-container">
      <h1>Add New Report</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="generatedDate"
          placeholder="Generated Date"
          value={formData.generatedDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reportType"
          placeholder="Report Type"
          value={formData.reportType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dataPoints"
          placeholder="Data Points"
          value={formData.dataPoints}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Report</button>
      </form>
    </div>
  );
};

export default AddReport;
