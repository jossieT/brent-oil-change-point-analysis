import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PriceChart from './components/PriceChart';
import StatCards from './components/StatCards';
import EventTable from './components/EventTable';
import { RefreshCw } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [data, setData] = useState({ prices: [], analysis: {} });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dataRes, eventsRes] = await Promise.all([
        axios.get(`${API_BASE}/data`),
        axios.get(`${API_BASE}/events`)
      ]);
      setData(dataRes.data);
      setEvents(eventsRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data from backend. Make sure the Flask server is running.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <header>
        <div>
          <h1>Brent Oil Analysis Dashboard</h1>
          <p style={{ color: '#94a3b8' }}>Visualizing structural changes and geopolitical events</p>
        </div>
        <button onClick={fetchData} className="refresh-btn">
          <RefreshCw size={20} />
        </button>
      </header>

      <StatCards data={data} events={events} />

      <div className="card chart-container">
        <h3>Historical Prices and Detected Change Points</h3>
        <PriceChart prices={data.prices} analysis={data.analysis} />
      </div>

      <div className="card">
        <h3>Significant Geopolitical/Economic Events</h3>
        <EventTable events={events} changePointDate={data.analysis?.change_point?.date} />
      </div>
    </div>
  );
}

export default App;
