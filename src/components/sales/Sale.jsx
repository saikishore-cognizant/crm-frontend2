import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../styles/sales/Sale.css';

const Sale = ({ id }) => {
  const [sale, setSale] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    const fetchSale = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:9090/api/sales-opportunities/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSale(response.data);
          setFormData({
            closingDate: response.data.closingDate,
            estimatedValue: response.data.estimatedValue,
            salesStage: response.data.salesStage,
            customerProfile: {
              customerId: '' // Initialize with an empty value
            }
          });
          setError('');
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('No sale found with the given ID.');
            setSale(null);
          } else {
            setError('An error occurred while fetching sale data.');
          }
        }
      }
    };

    fetchSale();
  }, [id, token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:9090/api/sales-opportunities/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Sale deleted successfully!');
      setSale(null);
    } catch (error) {
      console.error('There was an error deleting the sale:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customerId') {
      setFormData({ ...formData, customerProfile: { customerId: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveClick = async () => {
    try {
      const updatedFormData = {
        ...formData,
        customerProfile: {
          customerId: formData.customerProfile.customerId || 1 // Default to 1 if not set
        }
      };
      await axios.put(`http://localhost:9090/api/sales-opportunities/${id}`, updatedFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Sale updated successfully!');
      setSale(updatedFormData);
      setIsEditing(false);
    } catch (error) {
      console.error('There was an error updating the sale:', error);
      setError('An error occurred while updating the sale.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!sale) return <div>Loading...</div>;

  return (
    <div className="sale-container">
      {isEditing ? (
        <div>
          <input
            type="date"
            name="closingDate"
            value={formData.closingDate}
            onChange={handleChange}
          />
          <input
            type="number"
            name="estimatedValue"
            value={formData.estimatedValue}
            onChange={handleChange}
          />
          <input
            type="text"
            name="salesStage"
            value={formData.salesStage}
            onChange={handleChange}
          />
          <input
            type="number"
            name="customerId"
            placeholder="Customer ID"
            value={formData.customerProfile.customerId}
            onChange={handleChange}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <div className="sale-header">{sale.salesStage}</div>
          <div className='sale-info'>
            <span>OpportunityId:</span> {sale.opportunityId}
          </div>
          <div className="sale-info">
            <span>Closing Date:</span> {sale.closingDate}
          </div>
          <div className="sale-info">
            <span>Estimated Value:</span> {sale.estimatedValue}
          </div>
          <div className="sale-info">
            <span>Sales Stage:</span> {sale.salesStage}
          </div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Sale;
