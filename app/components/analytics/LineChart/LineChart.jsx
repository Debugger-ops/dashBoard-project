"use client";
import { useEffect, useRef } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './LineChart.css';

export default function LineChart({ data, title }) {
  return (
    <div className="line-chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="line-chart">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}