"use client";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './BarChart.css';

export default function BarChart({ data, title }) {
  return (
    <div className="bar-chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="bar-chart">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#82ca9d" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
