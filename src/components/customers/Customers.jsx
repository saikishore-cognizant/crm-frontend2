import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../styles/Customer.css';

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
          <div className="customer-header">Edit Customer</div>
          <div className="customer-info">
            <span>Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="customer-input"
            />
          </div>
          <div className="customer-info">
            <span>Contact Info:</span>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              className="customer-input"
            />
          </div>
          <div className="customer-info">
            <span>Purchase History:</span>
            <input
              type="text"
              name="purchaseHistory"
              value={formData.purchaseHistory}
              onChange={handleChange}
              className="customer-input"
            />
          </div>
          <div className="customer-info">
            <span>Segmentation Data:</span>
            <input
              type="text"
              name="segmentationData"
              value={formData.segmentationData}
              onChange={handleChange}
              className="customer-input"
            />
          </div>
          <button onClick={handleSaveClick} className="customer-button">Save</button>
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
          {customer.salesOpportunities.length > 0 && (
            <div className="sales-opportunities">
              <span>Sales Opportunities:</span>
              <ul>
                {customer.salesOpportunities.map(opportunity => (
                  <li key={opportunity.opportunityId}>
                    <span>Opportunity ID:</span> {opportunity.opportunityId}, 
                    <span> Closing Date:</span> {opportunity.closingDate}, 
                    <span> Estimated Value:</span> {opportunity.estimatedValue}, 
                    <span> Sales Stage:</span> {opportunity.salesStage}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {customer.supportTickets.length > 0 && (
            <div className="support-tickets">
              <span>Support Tickets:</span>
              <ul>
                {customer.supportTickets.map(ticket => (
                  <li key={ticket.ticketId}>
                    <span>Ticket ID:</span> {ticket.ticketId}, 
                    <span> Assigned Agent:</span> {ticket.assignedAgent}, 
                    <span> Issue Description:</span> {ticket.issueDescription}, 
                    <span> Status:</span> {ticket.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={handleEditClick} className="customer-button">Edit</button>
          <button onClick={handleDeleteClick} className="customer-button">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Customers;
