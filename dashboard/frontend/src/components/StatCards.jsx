import React from 'react';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';

function StatCards({ data, events }) {
  const latestPrice = data.prices?.length > 0 ? data.prices[data.prices.length - 1].Price : 'N/A';
  const changeDate = data.analysis?.change_point?.date || 'N/A';
  const eventCount = events?.length || 0;

  const stats = [
    { title: 'Latest Brent Price', value: `$${latestPrice}`, icon: <TrendingUp className="text-blue-500" />, color: '#3b82f6' },
    { title: 'Detected Change Point', value: changeDate, icon: <Calendar className="text-amber-500" />, color: '#f59e0b' },
    { title: 'Historical Events analyzed', value: eventCount, icon: <AlertCircle className="text-red-500" />, color: '#ef4444' }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => (
        <div key={idx} className="card" style={{ borderLeft: `4px solid ${stat.color}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#94a3b8', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>{stat.title}</p>
              <h2 style={{ margin: 0 }}>{stat.value}</h2>
            </div>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCards;
