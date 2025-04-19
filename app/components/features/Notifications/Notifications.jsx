import { useState, useEffect } from 'react';
import Dropdown from '../../ui/Dropdown/Dropdown';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      // Simulated API call with dummy data
      setTimeout(() => {
        const dummyNotifications = [
          {
            id: 1,
            type: 'info',
            message: 'Welcome to the dashboard!',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            read: false
          },
          {
            id: 2,
            type: 'alert',
            message: 'Your subscription is expiring soon.',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            read: false
          },
          {
            id: 3,
            type: 'success',
            message: 'Report successfully generated.',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            read: true
          }
        ];
        
        setNotifications(dummyNotifications);
        setUnreadCount(dummyNotifications.filter(n => !n.read).length);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setIsLoading(false);
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString();
  };

  // Components
  const NotificationIcon = () => (
    <div className="notification-trigger">
      <svg className="notification-bell" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1 1 16 0v7zm-2 0v-7a6 6 0 1 0-12 0v7h12zm-9 4h6v2H9v-2z"/>
      </svg>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );

  const NotificationHeader = () => (
    <div className="notifications-header">
      <h3>Notifications</h3>
      {unreadCount > 0 && (
        <button className="mark-all-read" onClick={markAllAsRead}>
          Mark all as read
        </button>
      )}
    </div>
  );

  const NotificationList = () => {
    if (isLoading) {
      return <div className="loading">Loading notifications...</div>;
    }
    
    if (notifications.length === 0) {
      return <div className="empty-state">No notifications</div>;
    }
    
    return (
      <ul className="notification-list">
        {notifications.map((notification) => (
          <NotificationItem 
            key={notification.id}
            notification={notification}
            onMarkAsRead={markAsRead}
            onDelete={deleteNotification}
          />
        ))}
      </ul>
    );
  };

  const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => (
    <li className={`notification-item ${notification.read ? 'read' : 'unread'} type-${notification.type}`}>
      <div className="notification-indicator"></div>
      <div className="notification-content" onClick={() => onMarkAsRead(notification.id)}>
        <p className="message">{notification.message}</p>
        <span className="timestamp">{formatTime(notification.timestamp)}</span>
      </div>
      <button 
        className="delete-button" 
        onClick={() => onDelete(notification.id)}
        aria-label="Delete notification"
      >
        ×
      </button>
    </li>
  );

  const NotificationFooter = () => (
    <div className="notifications-footer">
      <a href="/notifications" className="view-all">View all notifications</a>
    </div>
  );

  return (
    <div className="notifications-container">
      <Dropdown
        trigger={<NotificationIcon />}
        position="bottom-right"
        closeOnSelect={false}
      >
        <div className="notifications-panel">
          <NotificationHeader />
          <div className="notifications-body">
            <NotificationList />
          </div>
          <NotificationFooter />
        </div>
      </Dropdown>
    </div>
  );
}