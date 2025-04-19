import { useState } from 'react';
import { Bell } from 'lucide-react';
import './NotificationBell.css';

export default function NotificationBell({ count = 0, onOpen = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registered', time: '2 minutes ago', read: false },
    { id: 2, message: 'Sales report available', time: '1 hour ago', read: false },
    { id: 3, message: 'System update completed', time: '3 hours ago', read: true }
  ]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      onOpen();
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bellContainer">
      <button 
        onClick={handleToggle}
        className="bellButton"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="badge">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="dropdown">
          <div className="header">
            <h3 className="title">Notifications</h3>
          </div>
          <div className="notificationList">
            {notifications.length === 0 ? (
              <div className="emptyState">
                No notifications
              </div>
            ) : (
              <ul>
                {notifications.map(notification => (
                  <li 
                    key={notification.id} 
                    className={`notificationItem ${!notification.read ? 'unread' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notificationContent">
                      <p className="message">{notification.message}</p>
                      {!notification.read && (
                        <span className="unreadIndicator"></span>
                      )}
                    </div>
                    <p className="time">{notification.time}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="footer">
            <button className="viewAllButton">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
