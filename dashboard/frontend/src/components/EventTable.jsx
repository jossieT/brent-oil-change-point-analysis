import React from 'react';

function EventTable({ events, changePointDate }) {
  if (!events || events.length === 0) return <p style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No events data match the current filters.</p>;

  const calculateProximity = (eventDate) => {
    if (!changePointDate) return null;
    const diffTime = Math.abs(new Date(eventDate) - new Date(changePointDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="events-table-wrapper">
      <table className="events-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Description</th>
            <th>Proximity</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => {
            const proximity = calculateProximity(event.Date);
            const isMatch = proximity !== null && proximity <= 30; // Within a month
            const isExact = event.Date === changePointDate;

            return (
              <tr key={idx} className={isMatch ? 'highlight' : ''}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <span className={isMatch ? 'highlight-text' : ''}>{event.Date}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{event.Event}</span>
                </td>
                <td>
                  <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>{event.Description}</p>
                </td>
                <td>
                  {proximity !== null && (
                    <span className="proximity-tag">
                      {isExact ? 'Exact Match' : `${proximity} days`}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;
