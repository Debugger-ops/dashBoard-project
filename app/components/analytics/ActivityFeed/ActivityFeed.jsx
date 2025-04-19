"use client";
import { useState } from 'react';
import './ActivityFeed.css';

export default function ActivityFeed({ activities, maxItems = 5 }) {
  const [visibleItems, setVisibleItems] = useState(maxItems);
  
  const showMoreItems = () => {
    setVisibleItems(prevCount => prevCount + maxItems);
  };
  
  if (!activities || activities.length === 0) {
    return <div className="activity-feed-empty">No recent activity</div>;
  }
  
  return (
    <div className="activity-feed">
      <ul className="activity-list">
        {activities.slice(0, visibleItems).map((activity) => (
          <li key={activity.id} className="activity-item">
            <div className="activity-user">{activity.user}</div>
            <div className="activity-action">{activity.action}</div>
            <div className="activity-timestamp">{activity.timestamp}</div>
          </li>
        ))}
      </ul>
      {activities.length > visibleItems && (
        <button className="show-more-button" onClick={showMoreItems}>
          Show More
        </button>
      )}
    </div>
  );
}