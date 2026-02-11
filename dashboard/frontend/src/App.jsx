import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import PriceChart from './components/PriceChart';
import StatCards from './components/StatCards';
import EventTable from './components/EventTable';
import Filters from './components/Filters';
import { RefreshCw } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [data, setData] = useState({ prices: [], analysis: {} });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dataRes, eventsRes] = await Promise.all([
        axios.get(`${API_BASE}/data`),
        axios.get(`${API_BASE}/events`)
      ]);
      setData(dataRes.data);
      setEvents(eventsRes.data);
      
      // Set initial date range if data exists
      if (dataRes.data.prices?.length > 0) {
        setStartDate(dataRes.data.prices[0].Date);
        setEndDate(dataRes.data.prices[dataRes.data.prices.length - 1].Date);
      }
      
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

  const handleDateChange = (type, value) => {
    if (type === 'start') setStartDate(value);
    else setEndDate(value);
  };

  // Filtered data
  const filteredPrices = useMemo(() => {
    return data.prices.filter(p => {
      const date = p.Date;
      return (!startDate || date >= startDate) && (!endDate || date <= endDate);
    });
  }, [data.prices, startDate, endDate]);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const date = e.Date;
      return (!startDate || date >= startDate) && (!endDate || date <= endDate);
    });
  }, [events, startDate, endDate]);

  if (loading) return <div className="loading">Loading dashboard data...</div>;
  if (error) return <div className="error">{error}</div>;

  const minDate = data.prices.length > 0 ? data.prices[0].Date : '';
  const maxDate = data.prices.length > 0 ? data.prices[data.prices.length - 1].Date : '';

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="title-section">
          <h1>Brent Oil Analysis</h1>
          <p className="subtitle">Structural changes and geopolitical impact visualizer</p>
        </div>
        <button onClick={fetchData} className="refresh-btn" title="Refresh Data">
          <RefreshCw size={20} />
        </button>
      </header>

      <main className="dashboard-content">
        <div className="top-section">
          <StatCards data={{...data, prices: filteredPrices}} events={filteredEvents} />
          <Filters 
            startDate={startDate} 
            endDate={endDate} 
            onDateChange={handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        <div className="content-grid">
          <div className="card chart-section">
            <div className="section-header">
              <h3>Price Trends & Change Points</h3>
            </div>
            <div className="chart-container">
              <PriceChart 
                prices={filteredPrices} 
                analysis={data.analysis} 
                events={filteredEvents}
              />
            </div>
          </div>

          <div className="card table-section">
            <div className="section-header">
              <h3>Geopolitical & Economic Events</h3>
            </div>
            <EventTable 
              events={filteredEvents} 
              changePointDate={data.analysis?.change_point?.date} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
