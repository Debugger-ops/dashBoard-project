import React, { createContext, useContext } from 'react';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../lib/constants';

// Create context
const ThemeContext = createContext(null);

/**
 * Theme context provider component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Provider component
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useTheme(THEMES.LIGHT);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };
  
  // Set specific theme
  const setThemeValue = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
    } else {
      console.warn(`Invalid theme: ${newTheme}. Must be one of: ${Object.values(THEMES).join(', ')}`);
    }
  };
  
  // Apply theme to document body
  React.useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const value = {
    theme,
    toggleTheme,
    setTheme: setThemeValue,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme context
 * @returns {Object} Theme context value
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);
  
  if (context === null) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
}

export default ThemeContext;