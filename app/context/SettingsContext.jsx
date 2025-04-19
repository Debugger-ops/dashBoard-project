import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create context
const SettingsContext = createContext(null);

// Default settings
const defaultSettings = {
  language: 'en',
  notifications: {
    email: true,
    push: true,
    inApp: true,
  },
  display: {
    density: 'comfortable',
    fontSize: 'medium',
    animations: true,
  },
  privacy: {
    shareAnalytics: true,
    shareCrashReports: true,
  },
};

/**
 * Settings context provider component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Provider component
 */
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('app-settings', defaultSettings);
  
  // Update entire settings object
  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };
  
  // Update a specific setting by path (e.g., 'display.fontSize')
  const updateSetting = (path, value) => {
    const pathArray = path.split('.');
    const newSettings = { ...settings };
    
    let current = newSettings;
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    
    const lastKey = pathArray[pathArray.length - 1];
    current[lastKey] = value;
    
    setSettings(newSettings);
  };
  
  // Reset settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
  };
  
  const value = {
    settings,
    updateSettings,
    updateSetting,
    resetSettings,
  };
  
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

/**
 * Custom hook to use settings context
 * @returns {Object} Settings context value
 */
export function useSettingsContext() {
  const context = useContext(SettingsContext);
  
  if (context === null) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  
  return context;
}

export default SettingsContext;