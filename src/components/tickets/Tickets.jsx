import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Ticket from './Ticket';
import AddTicket from './AddTicket';
import '../../styles/tickets/Tickets.css';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [activeTicketId, setActiveTicketId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [view, setView] = useState('all'); // 'all', 'search', 'add'
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/support-tickets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets data', error);
      }
    };

    fetchTickets();
  }, [token]);

  const handleTicketClick = (ticketId) => {
    setActiveTicketId(activeTicketId === ticketId ? null : ticketId);
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim() !== '') {
      setView('search');
      setActiveTicketId(searchId);
    }
  };

  const handleAddTicketClick = () => {
    setView('add');
  };

  if (view === 'add') {
    return <AddTicket />;
  }

  return (
    <div className="all-tickets-container">
      <div className="header">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Enter Ticket ID"
            value={searchId}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={handleAddTicketClick}>Add Ticket</button>
      </div>
      {view === 'search' && activeTicketId ? (
        <Ticket id={activeTicketId} />
      ) : (
        tickets.map(ticket => (
          <div key={ticket.ticketId} className="ticket-item">
            <div className="ticket-name" onClick={() => handleTicketClick(ticket.ticketId)}>
              {ticket.issueDescription}
            </div>
            {activeTicketId === ticket.ticketId && (
              <Ticket id={ticket.ticketId} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Tickets;
