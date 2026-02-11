import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label, Scatter
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '10px', borderRadius: '8px', boxShadow: '0 100px 15px -3px rgba(0,0,0,0.5)' }}>
        <p style={{ color: '#94a3b8', margin: '0 0 5px 0', fontSize: '12px' }}>{label}</p>
        <p style={{ color: '#f8fafc', margin: '0', fontWeight: 'bold' }}>Price: ${payload[0].value}</p>
        {data.eventName && (
          <div style={{ marginTop: '10px', borderTop: '1px solid #334155', paddingTop: '5px' }}>
            <p style={{ color: data.isNearChangePoint ? '#f59e0b' : '#3b82f6', margin: '0', fontSize: '12px', fontWeight: 'bold' }}>
              Event: {data.eventName}
            </p>
            <p style={{ color: '#94a3b8', margin: '2px 0 0 0', fontSize: '11px', lineHeight: '1.2' }}>{data.eventDesc}</p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

function PriceChart({ prices, analysis, events }) {
  const changeDate = analysis?.change_point?.date;

  // Enhance price data with event flags for the chart
  const chartData = useMemo(() => {
    return prices.map(p => {
      const event = events.find(e => e.Date === p.Date);
      return {
        ...p,
        eventName: event ? event.Event : null,
        eventDesc: event ? event.Description : null,
        isNearChangePoint: event && changeDate && 
          Math.abs((new Date(event.Date) - new Date(changeDate)) / (1000 * 60 * 60 * 24)) <= 30
      };
    });
  }, [prices, events, changeDate]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis 
          dataKey="Date" 
          tick={{ fill: '#94a3b8', fontSize: 12 }} 
          minTickGap={60}
          axisLine={{ stroke: '#334155' }}
        />
        <YAxis 
          tick={{ fill: '#94a3b8', fontSize: 12 }} 
          axisLine={{ stroke: '#334155' }}
          domain={['auto', 'auto']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36}/>
        <Line 
          type="monotone" 
          dataKey="Price" 
          stroke="#3b82f6" 
          dot={(props) => {
            const { cx, cy, payload } = props;
            if (payload.eventName) {
              return (
                <circle 
                  key={payload.Date} 
                  cx={cx} 
                  cy={cy} 
                  r={payload.isNearChangePoint ? 6 : 4} 
                  fill={payload.isNearChangePoint ? '#f59e0b' : '#3b82f6'} 
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            }
            return null;
          }} 
          strokeWidth={2}
          name="Brent Oil Price (USD)"
          activeDot={{ r: 8 }}
        />
        
        {changeDate && prices.some(p => p.Date === changeDate) && (
          <ReferenceLine x={changeDate} stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2}>
            <Label value="Structural Change Point" position="top" fill="#ef4444" fontSize={12} fontWeight="bold" />
          </ReferenceLine>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;
