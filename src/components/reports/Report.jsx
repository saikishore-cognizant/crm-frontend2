import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../styles/reports/Report.css';

const Report = ({ id }) => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    generatedDate: '',
    reportType: '',
    dataPoints: ''
  });
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchReport = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:9090/api/reports/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setReport(response.data);
          setFormData(response.data);
          setError('');
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('No report found with the given ID.');
            setReport(null);
          } else {
            setError('An error occurred while fetching report data.');
          }
        }
      }
    };

    fetchReport();
  }, [id, token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:9090/api/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Report deleted successfully!');
      setReport(null);
    } catch (error) {
      console.error('There was an error deleting the report:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:9090/api/reports/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Report updated successfully!');
      setReport(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('There was an error updating the report:', error);
    }
  };

  if (error) return <div>{error}</div>;
  if (!report) return <div>Loading...</div>;

  return (
    <div className="report-container">
      {isEditing ? (
        <div>
          <div className="report-header">Edit Report</div>
          <div className="report-info">
            <span>Generated Date:</span>
            <input
              type="date"
              name="generatedDate"
              value={formData.generatedDate}
              onChange={handleChange}
              className="report-input"
            />
          </div>
          <div className="report-info">
            <span>Report Type:</span>
            <input
              type="text"
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              className="report-input"
            />
          </div>
          <div className="report-info">
            <span>Data Points:</span>
            <input
              type="text"
              name="dataPoints"
              value={formData.dataPoints}
              onChange={handleChange}
              className="report-input"
            />
          </div>
          <button onClick={handleSaveClick} className="report-button">Save</button>
        </div>
      ) : (
        <div>
          <div className="report-header">{report.reportType}</div>
          <div className="report-info">
            <span>Report ID:</span> {report.reportId}
          </div>
          <div className="report-info">
            <span>Generated Date:</span> {report.generatedDate}
          </div>
          <div className="report-info">
            <span>Data Points:</span> {report.dataPoints}
          </div>
          <button onClick={handleEditClick} className="report-button">Edit</button>
          <button onClick={handleDeleteClick} className="report-button">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Report;
