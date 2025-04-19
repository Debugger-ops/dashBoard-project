"use client";

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import SearchBar from '../../features/SearchBar/SearchBar';
import UserProfile from '../../features/UserProfile/UserProfile';
import DarkModeToggle from '../../theme/DarkModeToggle/DarkModeToggle';
import Logo from '../Logo/Logo.jsx';

import './Header.css';

export default function Header() {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = (query) => {
    // Implementation of search functionality
    console.log('Searching for:', query);
    // This would typically make an API call
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Logo/>
        </div>
        
        <div className="header-search">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="header-actions">
          <UserProfile user={user} className="header-action-item" />
        </div>
      </div>
    </header>
  );
}
