import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import './RefreshButton.css';

export default function RefreshButton({ onRefresh = () => {}, interval = null }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      onRefresh();
      setIsRefreshing(false);
      setLastRefreshed(new Date());
    }, 1000);
  };

  // Set up auto-refresh interval if provided
  useEffect(() => {
    if (!interval) return;
    
    const timer = setInterval(() => {
      handleRefresh();
    }, interval);
    
    return () => clearInterval(timer);
  }, [interval, onRefresh]);

  // Format the last refreshed time
  const formatLastRefreshed = () => {
    const now = new Date();
    const diffMs = now - lastRefreshed;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    
    if (diffSecs < 60) {
      return `Updated ${diffSecs} seconds ago`;
    } else if (diffMins < 60) {
      return `Updated ${diffMins} minutes ago`;
    } else {
      return `Updated at ${lastRefreshed.toLocaleTimeString()}`;
    }
  };

  return (
    <div className="refreshContainer">
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="refreshButton"
        title="Refresh data"
      >
        <RefreshCw 
          size={18} 
          className={`refreshIcon ${isRefreshing ? 'spinning' : ''}`} 
        />
        {interval && <span className="autoLabel">Auto</span>}
      </button>
      <div className="refreshStatus">{formatLastRefreshed()}</div>
    </div>
  );
}
