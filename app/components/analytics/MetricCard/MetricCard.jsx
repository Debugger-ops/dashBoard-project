'use client';

import './MetricCard.css';

export default function MetricCard({ title, value, change, period }) {
  const isPositive = change && change.startsWith('+');
  const changeClass = isPositive ? 'positive' : 'negative';
  
  return (
    <div className="metric-card">
      <h3 className="metric-title">{title}</h3>
      <div className="metric-value">{value}</div>
      {change && (
        <div className={`metric-change ${changeClass}`}>
          {change} <span className="metric-period">{period}</span>
        </div>
      )}
    </div>
  );
}