import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Report from './Report';
import AddReport from './AddReport';
import '../../styles/reports/Reports.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [activeReportId, setActiveReportId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [view, setView] = useState('all'); // 'all', 'search', 'add'
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/reports', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports data', error);
      }
    };

    fetchReports();
  }, [token]);

  const handleReportClick = (reportId) => {
    setActiveReportId(activeReportId === reportId ? null : reportId);
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim() !== '') {
      setView('search');
      setActiveReportId(searchId);
    }
  };

  const handleAddReportClick = () => {
    setView('add');
  };

  if (view === 'add') {
    return <AddReport />;
  }

  return (
    <div className="all-reports-container">
      <div className="header">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Enter Report ID"
            value={searchId}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={handleAddReportClick}>Add Report</button>
      </div>
      {view === 'search' && activeReportId ? (
        <Report id={activeReportId} />
      ) : (
        reports.map(report => (
          <div key={report.reportId} className="report-item">
            <div className="report-name" onClick={() => handleReportClick(report.reportId)}>
              {report.reportType}
            </div>
            {activeReportId === report.reportId && (
              <Report id={report.reportId} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Reports;
