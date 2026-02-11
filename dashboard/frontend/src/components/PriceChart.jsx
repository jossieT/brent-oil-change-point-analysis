import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label
} from 'recharts';

function PriceChart({ prices, analysis }) {
  const changeDate = analysis?.change_point?.date;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={prices} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis 
          dataKey="Date" 
          tick={{ fill: '#94a3b8' }} 
          minTickGap={50}
        />
        <YAxis tick={{ fill: '#94a3b8' }} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
          itemStyle={{ color: '#f8fafc' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="Price" 
          stroke="#3b82f6" 
          dot={false} 
          strokeWidth={2}
          name="Brent Oil Price (USD)"
        />
        
        {changeDate && (
          <ReferenceLine x={changeDate} stroke="#ef4444" strokeDasharray="5 5">
            <Label value="Change Point" position="top" fill="#ef4444" />
          </ReferenceLine>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;
