import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../styles/Customer.css';

const Customers = ({ id }) => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:9090/api/customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCustomer(response.data);
          setFormData(response.data);
          setError('');
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('No customer found with the given ID.');
            setCustomer(null);
          } else {
            setError('An error occurred while fetching customer data.');
          }
        }
      }
    };

    fetchCustomer();
  }, [id, token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:9090/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Customer deleted successfully!');
      setCustomer(null);
    } catch (error) {
      console.error('There was an error deleting the customer:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:9090/api/customers/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Customer updated successfully!');
      setCustomer(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('There was an error updating the customer:', error);
    }
  };

  if (error) return <div>{error}</div>;
  if (!customer) return <div>Loading...</div>;

  return (
    <div className="customer-container">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="purchaseHistory"
            value={formData.purchaseHistory}
            onChange={handleChange}
          />
          <input
            type="text"
            name="segmentationData"
            value={formData.segmentationData}
            onChange={handleChange}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <div className="customer-header">{customer.name}</div>
          <div className='customer-info'>
            <span>CustomerId:</span> {customer.customerId}
          </div>
          <div className="customer-info">
            <span>Contact Info:</span> {customer.contactInfo}
          </div>
          <div className="customer-info">
            <span>Purchase History:</span> {customer.purchaseHistory}
          </div>
          <div className="customer-info">
            <span>Segmentation Data:</span> {customer.segmentationData}
          </div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Customers;
