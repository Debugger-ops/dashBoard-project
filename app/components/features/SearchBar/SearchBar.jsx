import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

import './SearchBar.css';

export default function SearchBar({ onSearch, placeholder = 'Search...', debounceTime = 300 }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceTime);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Focus the input after expansion
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className={`search-bar ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="search-icon" 
        onClick={toggleExpand}
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
        </svg>
      </button>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
        />
        {searchTerm && (
          <button 
            type="button"
            className="clear-button"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </form>
    </div>
  );
}