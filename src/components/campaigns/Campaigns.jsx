import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Campaign from './Campaign';
import AddCampaign from './AddCampaign';
import '../../styles/campaigns/Campaigns.css';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaignId, setActiveCampaignId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [view, setView] = useState('all'); // 'all', 'search', 'add'
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/campaigns', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns data', error);
      }
    };

    fetchCampaigns();
  }, [token]);

  const handleCampaignClick = (campaignId) => {
    setActiveCampaignId(activeCampaignId === campaignId ? null : campaignId);
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim() !== '') {
      setView('search');
      setActiveCampaignId(searchId);
    }
  };

  const handleAddCampaignClick = () => {
    setView('add');
  };

  if (view === 'add') {
    return <AddCampaign />;
  }

  return (
    <div className="all-campaigns-container">
      <div className="header">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Enter Campaign ID"
            value={searchId}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={handleAddCampaignClick}>Add Campaign</button>
      </div>
      {view === 'search' && activeCampaignId ? (
        <Campaign id={activeCampaignId} />
      ) : (
        campaigns.map(campaign => (
          <div key={campaign.campaignId} className="campaign-item">
            <div className="campaign-name" onClick={() => handleCampaignClick(campaign.campaignId)}>
              {campaign.name}
            </div>
            {activeCampaignId === campaign.campaignId && (
              <Campaign id={campaign.campaignId} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Campaigns;
