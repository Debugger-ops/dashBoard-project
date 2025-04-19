"use client";

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import './Sidebar.css';

export default function Sidebar() {
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'users', label: 'Users', icon: 'users' },
    { id: 'products', label: 'Products', icon: 'products' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];
  
  const adminItems = [
    { id: 'user-management', label: 'User Management', icon: 'user-management' },
    { id: 'system-settings', label: 'System Settings', icon: 'system-settings' }
  ];
  
  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Navigation logic would go here
  };
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="toggle-icon"></span>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <a
                href={`#${item.id}`}
                className={`nav-link ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className={`nav-icon icon-${item.icon}`}></span>
                <span className="nav-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {user && user.role === 'admin' && (
        <div className="sidebar-section admin-section">
          <h3 className="section-title">Admin</h3>
          <ul className="nav-list">
            {adminItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span className={`nav-icon icon-${item.icon}`}></span>
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="sidebar-footer">
        <div className="app-version">v1.0.0</div>
      </div>
    </aside>
  );
}