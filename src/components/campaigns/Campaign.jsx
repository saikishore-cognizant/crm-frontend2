import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../styles/campaigns/Campaign.css';

const Campaign = ({ id }) => {
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    name: '',
    type: ''
  });
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchCampaign = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:9090/api/campaigns/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCampaign(response.data);
          setFormData(response.data);
          setError('');
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('No campaign found with the given ID.');
            setCampaign(null);
          } else {
            setError('An error occurred while fetching campaign data.');
          }
        }
      }
    };

    fetchCampaign();
  }, [id, token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:9090/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Campaign deleted successfully!');
      setCampaign(null);
    } catch (error) {
      console.error('There was an error deleting the campaign:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:9090/api/campaigns/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Campaign updated successfully!');
      setCampaign(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('There was an error updating the campaign:', error);
    }
  };

  if (error) return <div>{error}</div>;
  if (!campaign) return <div>Loading...</div>;

  return (
    <div className="campaign-container">
      {isEditing ? (
        <div>
          <div className="campaign-header">Edit Campaign</div>
          <div className="campaign-info">
            <span>Start Date:</span>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="campaign-input"
            />
          </div>
          <div className="campaign-info">
            <span>End Date:</span>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="campaign-input"
            />
          </div>
          <div className="campaign-info">
            <span>Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="campaign-input"
            />
          </div>
          <div className="campaign-info">
            <span>Type:</span>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="campaign-input"
            />
          </div>
          <button onClick={handleSaveClick} className="campaign-button">Save</button>
        </div>
      ) : (
        <div>
          <div className="campaign-header">{campaign.name}</div>
          <div className="campaign-info">
            <span>Campaign ID:</span> {campaign.campaignId}
          </div>
          <div className="campaign-info">
            <span>Start Date:</span> {campaign.startDate}
          </div>
          <div className="campaign-info">
            <span>End Date:</span> {campaign.endDate}
          </div>
          <div className="campaign-info">
            <span>Type:</span> {campaign.type}
          </div>
          <button onClick={handleEditClick} className="campaign-button">Edit</button>
          <button onClick={handleDeleteClick} className="campaign-button">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Campaign;