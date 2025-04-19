"use client";
import { useState } from 'react';
import './DataTable.css';

export default function DataTable({ data, title }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  if (!data || data.length === 0) {
    return <div className="data-table-empty">No data available</div>;
  }
  
  // Get column headers from first data item
  const columns = Object.keys(data[0]).filter(key => key !== 'id');
  
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });
  
  return (
    <div className="data-table-container">
      {title && <h3 className="table-title">{title}</h3>}
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column}
                onClick={() => requestSort(column)}
                className={sortConfig.key === column ? sortConfig.direction : ''}
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
                {sortConfig.key === column && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`${row.id}-${column}`}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}