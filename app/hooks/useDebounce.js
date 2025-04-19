import { useState, useEffect } from 'react';

/**
 * Custom hook that delays updating a value by a specified amount of time
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay time in milliseconds
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up timeout to update debounced value after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timeout if value changes or component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}