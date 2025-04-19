import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state in localStorage
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Default value if no value exists in localStorage
 * @returns {Array} State value and setter function
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState(initialValue);
  
  useEffect(() => {
    // Check if window is defined (only available on the client)
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        } else {
          setStoredValue(initialValue);
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        setStoredValue(initialValue); // fall back to initial value on error
      }
    }
  }, [key, initialValue]);

  // Update localStorage when the state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
