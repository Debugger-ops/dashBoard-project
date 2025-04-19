import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching with loading and error states
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Object} Data, loading state, error state, and refetch function
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // Execute the fetch when the component mounts or when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to manually refetch data
  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}