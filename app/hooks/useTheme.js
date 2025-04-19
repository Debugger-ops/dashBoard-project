import { useState, useEffect } from 'react';

/**
 * Custom hook for theme management
 * @param {string} defaultTheme - Default theme ('light' or 'dark')
 * @returns {Object} Theme state and toggle function
 */
export function useTheme(defaultTheme = 'light') {
  const [theme, setTheme] = useState(() => {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem('theme');
    // If no saved preference, check system preference
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : defaultTheme;
    }
    return savedTheme;
  });
}