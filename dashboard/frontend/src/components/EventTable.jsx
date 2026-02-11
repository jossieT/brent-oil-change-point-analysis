import React from 'react';

function EventTable({ events, changePointDate }) {
  if (!events || events.length === 0) return <p>No events data available.</p>;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="events-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => {
            const isMatch = event.Date === changePointDate;
            return (
              <tr key={idx} className={isMatch ? 'highlight' : ''}>
                <td style={{ whiteSpace: 'nowrap' }}>{event.Date}</td>
                <td style={{ fontWeight: '500' }}>{event.Event}</td>
                <td style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{event.Description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;
