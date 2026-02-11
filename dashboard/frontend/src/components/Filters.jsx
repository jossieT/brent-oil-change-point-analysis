import React from 'react';
import { Filter } from 'lucide-react';

function Filters({ startDate, endDate, onDateChange, minDate, maxDate }) {
  return (
    <div className="card filters-container">
      <div className="filter-header">
        <Filter size={18} />
        <span style={{ fontWeight: 600 }}>Filter Analysis Range</span>
      </div>
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="start-date">From:</label>
          <input 
            type="date" 
            id="start-date" 
            value={startDate} 
            onChange={(e) => onDateChange('start', e.target.value)}
            min={minDate}
            max={endDate || maxDate}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="end-date">To:</label>
          <input 
            type="date" 
            id="end-date" 
            value={endDate} 
            onChange={(e) => onDateChange('end', e.target.value)}
            min={startDate || minDate}
            max={maxDate}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
