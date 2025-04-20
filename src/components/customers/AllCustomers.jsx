import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Customers from './Customers';
import AddCustomer from './AddCustomer';
import '../../styles/AllCustomers.css';

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [activeCustomerId, setActiveCustomerId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [view, setView] = useState('all'); // 'all', 'search', 'add'
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/customers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers data', error);
      }
    };

    fetchCustomers();
  }, [token]);

  const handleCustomerClick = (customerId) => {
    setActiveCustomerId(activeCustomerId === customerId ? null : customerId);
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim() !== '') {
      setView('search');
      setActiveCustomerId(searchId);
    }
  };

  const handleAddCustomerClick = () => {
    setView('add');
  };

  if (view === 'add') {
    return <AddCustomer />;
  }

  return (
    <div className="all-customers-container">
      <div className="header">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Enter Customer ID"
            value={searchId}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={handleAddCustomerClick}>Add Customer</button>
      </div>
      {view === 'search' && activeCustomerId ? (
        <Customers id={activeCustomerId} />
      ) : (
        customers.map(customer => (
          <div key={customer.customerId} className="customer-item">
            <div className="customer-name" onClick={() => handleCustomerClick(customer.customerId)}>
              {customer.name}
            </div>
            {activeCustomerId === customer.customerId && (
              <Customers id={customer.customerId} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AllCustomers;
