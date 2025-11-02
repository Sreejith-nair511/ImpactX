import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/apiClient';

/**
 * Custom hook for API data fetching
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {object} Data, loading, and error states
 */
export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    try {
      setLoading(true);
      setError(null);
      
      const result = await api.get(endpoint, options);
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch, lastUpdated };
};

/**
 * Custom hook for API data mutation
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @returns {object} Mutation function and state
 */
export const useApiMutation = (endpoint, method = 'POST') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (payload = {}) => {
    if (!endpoint) {
      throw new Error('Endpoint is required');
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await api[method.toLowerCase()](endpoint, payload);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      console.error('API Mutation Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, method]);

  return { mutate, data, loading, error };
};

/**
 * Custom hook for paginated API data
 * @param {string} endpoint - API endpoint
 * @param {object} options - Pagination options
 * @returns {object} Paginated data and controls
 */
export const useApiPagination = (endpoint, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(options.initialPage || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(options.pageSize || 10);

  const fetchPage = useCallback(async (pageNum) => {
    if (!endpoint) return;

    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: pageNum,
        limit: pageSize,
        ...options.params
      });
      
      const url = `${endpoint}?${params.toString()}`;
      const result = await api.get(url);
      
      setData(result.data || result.items || []);
      setTotalPages(result.totalPages || result.pages || 1);
      setTotalItems(result.totalItems || result.total || 0);
    } catch (err) {
      setError(err);
      console.error('Pagination Error:', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, pageSize, options.params]);

  useEffect(() => {
    fetchPage(page);
  }, [fetchPage, page]);

  const goToPage = useCallback((pageNum) => {
    setPage(Math.max(1, Math.min(pageNum, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const setItemsPerPage = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page
  }, []);

  return {
    data,
    loading,
    error,
    page,
    totalPages,
    totalItems,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage
  };
};

/**
 * Custom hook for API data with caching
 * @param {string} endpoint - API endpoint
 * @param {object} options - Cache options
 * @returns {object} Cached data and controls
 */
export const useApiCache = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());

  const { ttl = 5 * 60 * 1000, enabled = true } = options; // 5 minutes default

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    // Check cache first
    if (enabled && cacheRef.current.has(endpoint)) {
      const cached = cacheRef.current.get(endpoint);
      const now = Date.now();
      
      if (now - cached.timestamp < ttl) {
        setData(cached.data);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await api.get(endpoint);
      
      // Cache the result
      if (enabled) {
        cacheRef.current.set(endpoint, {
          data: result,
          timestamp: Date.now()
        });
      }
      
      setData(result);
    } catch (err) {
      setError(err);
      console.error('Cached API Error:', err);
      
      // Try to return cached data if available on error
      if (enabled && cacheRef.current.has(endpoint)) {
        const cached = cacheRef.current.get(endpoint);
        setData(cached.data);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, ttl, enabled]);

  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  const invalidateCache = useCallback((key = endpoint) => {
    cacheRef.current.delete(key);
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, clearCache, invalidateCache };
};

/**
 * Custom hook for API data polling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Polling options
 * @returns {object} Polled data and controls
 */
export const useApiPolling = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);

  const { interval = 5000, enabled = true } = options; // 5 seconds default

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    try {
      setLoading(true);
      setError(null);
      
      const result = await api.get(endpoint);
      setData(result);
    } catch (err) {
      setError(err);
      console.error('Polling Error:', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchData();
    
    // Set up polling
    setIsPolling(true);
    const intervalId = setInterval(fetchData, interval);
    
    return () => {
      clearInterval(intervalId);
      setIsPolling(false);
    };
  }, [fetchData, interval, enabled]);

  const startPolling = useCallback(() => {
    setIsPolling(true);
  }, []);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  return { data, loading, error, isPolling, startPolling, stopPolling };
};