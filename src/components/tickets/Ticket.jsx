import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../styles/tickets/Ticket.css';

const Ticket = ({ id }) => {
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    const fetchTicket = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:9090/api/support-tickets/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTicket(response.data);
          setFormData({
            assignedAgent: response.data.assignedAgent,
            issueDescription: response.data.issueDescription,
            status: response.data.status,
            customerProfile: {
              customerId: '' // Initialize with an empty value
            }
          });
          setError('');
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('No ticket found with the given ID.');
            setTicket(null);
          } else {
            setError('An error occurred while fetching ticket data.');
          }
        }
      }
    };

    fetchTicket();
  }, [id, token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:9090/api/support-tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Ticket deleted successfully!');
      setTicket(null);
    } catch (error) {
      console.error('There was an error deleting the ticket:', error);
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
      await axios.put(`http://localhost:9090/api/support-tickets/${id}`, updatedFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Ticket updated successfully!');
      setTicket(updatedFormData);
      setIsEditing(false);
    } catch (error) {
      console.error('There was an error updating the ticket:', error);
      setError('An error occurred while updating the ticket.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="ticket-container">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="assignedAgent"
            value={formData.assignedAgent}
            onChange={handleChange}
          />
          <input
            type="text"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleChange}
          />
          <input
            type="text"
            name="status"
            value={formData.status}
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
          <div className="ticket-header">{ticket.issueDescription}</div>
          <div className="ticket-info">
            <span>Ticket ID:</span> {ticket.ticketId}
          </div>
          <div className="ticket-info">
            <span>Assigned Agent:</span> {ticket.assignedAgent}
          </div>
          <div className="ticket-info">
            <span>Status:</span> {ticket.status}
          </div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Ticket;
