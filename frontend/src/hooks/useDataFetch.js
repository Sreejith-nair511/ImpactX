import { useState, useEffect } from 'react';
import { debounce } from '../utils/dataFormatter';

/**
 * Custom hook for fetching data with loading and error states
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @returns {object} Data, loading, and error states
 */
export const useDataFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};

/**
 * Custom hook for debounced search
 * @param {string} initialValue - Initial search value
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {object} Search value and setter
 */
export const useDebounce = (initialValue, delay) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => {
      clearTimeout(handler.timeoutId);
    };
  }, [value, delay]);

  return [value, setValue, debouncedValue];
};

/**
 * Custom hook for pagination
 * @param {Array} data - Full dataset
 * @param {number} itemsPerPage - Items per page
 * @returns {object} Pagination state and controls
 */
export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((current) => Math.min(current + 1, maxPage));
  };

  const prevPage = () => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  };

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, maxPage));
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    maxPage,
    currentData,
    nextPage,
    prevPage,
    goToPage,
  };
};