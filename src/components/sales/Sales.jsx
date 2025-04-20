import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Sale from './Sale';
import AddSale from './AddSale';
import '../../styles/sales/Sales.css';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [activeSaleId, setActiveSaleId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [view, setView] = useState('all'); // 'all', 'search', 'add'
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/sales-opportunities', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales data', error);
      }
    };

    fetchSales();
  }, [token]);

  const handleSaleClick = (saleId) => {
    setActiveSaleId(activeSaleId === saleId ? null : saleId);
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim() !== '') {
      setView('search');
      setActiveSaleId(searchId);
    }
  };

  const handleAddSaleClick = () => {
    setView('add');
  };

  if (view === 'add') {
    return <AddSale />;
  }

  return (
    <div className="all-sales-container">
      <div className="header">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Enter Sale ID"
            value={searchId}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={handleAddSaleClick}>Add Sale</button>
      </div>
      {view === 'search' && activeSaleId ? (
        <Sale id={activeSaleId} />
      ) : (
        sales.map(sale => (
          <div key={sale.opportunityId} className="sale-item">
            <div className="sale-name" onClick={() => handleSaleClick(sale.opportunityId)}>
              {sale.salesStage}
            </div>
            {activeSaleId === sale.opportunityId && (
              <Sale id={sale.opportunityId} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Sales;
