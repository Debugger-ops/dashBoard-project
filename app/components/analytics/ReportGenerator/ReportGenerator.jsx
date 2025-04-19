'use client';

import { useState } from 'react';
import './ReportGenerator.css';

export default function ReportGenerator({ metrics, charts, title = "Generate Report" }) {
  const [reportName, setReportName] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [format, setFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleMetricToggle = (metricId) => {
    setSelectedMetrics(prevSelected => {
      if (prevSelected.includes(metricId)) {
        return prevSelected.filter(id => id !== metricId);
      } else {
        return [...prevSelected, metricId];
      }
    });
  };

  const handleChartToggle = (chartId) => {
    setSelectedCharts(prevSelected => {
      if (prevSelected.includes(chartId)) {
        return prevSelected.filter(id => id !== chartId);
      } else {
        return [...prevSelected, chartId];
      }
    });
  };

  const handleGenerateReport = () => {
    if (!reportName) {
      alert("Please provide a report name");
      return;
    }
    
    if (selectedMetrics.length === 0 && selectedCharts.length === 0) {
      alert("Please select at least one metric or chart");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulating report generation
    setTimeout(() => {
      console.log("Generating report with:", {
        name: reportName,
        metrics: selectedMetrics,
        charts: selectedCharts,
        dateRange,
        format
      });
      setIsGenerating(false);
      alert(`Report "${reportName}" has been generated!`);
    }, 2000);
  };

  return (
    <div className="report-generator">
      <h3 className="report-generator-title">{title}</h3>
      
      <div className="report-form">
        <div className="form-group">
          <label htmlFor="report-name">Report Name</label>
          <input
            id="report-name"
            type="text"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            placeholder="Enter report name"
          />
        </div>
        
        <div className="form-group">
          <label>Select Metrics</label>
          <div className="checkbox-group">
            {metrics && metrics.map((metric) => (
              <label key={metric.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric.id)}
                  onChange={() => handleMetricToggle(metric.id)}
                />
                {metric.name}
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Select Charts</label>
          <div className="checkbox-group">
            {charts && charts.map((chart) => (
              <label key={chart.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCharts.includes(chart.id)}
                  onChange={() => handleChartToggle(chart.id)}
                />
                {chart.name}
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
          </div>
          
          <div className="form-group half-width">
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="format">Format</label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
          </select>
        </div>
        
        <button 
          className="generate-button" 
          onClick={handleGenerateReport}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Report"}
        </button>
      </div>
    </div>
  );
}