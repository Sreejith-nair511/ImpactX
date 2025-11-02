/**
 * API client service for handling HTTP requests
 */

// Default configuration
const DEFAULT_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Global API client instance
let apiClient = {
  config: { ...DEFAULT_CONFIG }
};

/**
 * Set API configuration
 * @param {object} config - Configuration object
 */
export const setApiConfig = (config) => {
  apiClient.config = { ...apiClient.config, ...config };
};

/**
 * Get API configuration
 * @returns {object} Configuration object
 */
export const getApiConfig = () => {
  return { ...apiClient.config };
};

/**
 * Create full URL
 * @param {string} endpoint - API endpoint
 * @returns {string} Full URL
 */
const createUrl = (endpoint) => {
  // If endpoint is already a full URL, return it
  if (endpoint.startsWith('http')) {
    return endpoint;
  }
  
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Combine base URL with endpoint
  return `${apiClient.config.baseURL.replace(/\/$/, '')}/${cleanEndpoint}`;
};

/**
 * Create request options
 * @param {string} method - HTTP method
 * @param {object} options - Request options
 * @param {object} data - Request data
 * @returns {object} Fetch options
 */
const createOptions = (method, options = {}, data = null) => {
  const fetchOptions = {
    method,
    headers: {
      ...apiClient.config.headers,
      ...options.headers
    },
    ...options
  };

  // Add body for POST, PUT, PATCH requests
  if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    fetchOptions.body = JSON.stringify(data);
  }

  // Add authentication token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    fetchOptions.headers.Authorization = `Bearer ${token}`;
  }

  return fetchOptions;
};

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise} Parsed response data
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data;
  
  // Handle different response types
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  // Handle HTTP errors
  if (!response.ok) {
    const error = new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

/**
 * Handle fetch errors
 * @param {Error} error - Error object
 * @returns {Error} Enhanced error object
 */
const handleError = (error) => {
  // Network error
  if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    const networkError = new Error('Network error: Please check your connection');
    networkError.type = 'NETWORK_ERROR';
    return networkError;
  }

  // Timeout error
  if (error.name === 'AbortError') {
    const timeoutError = new Error('Request timeout: Please try again');
    timeoutError.type = 'TIMEOUT_ERROR';
    return timeoutError;
  }

  return error;
};

/**
 * Make HTTP request
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request data
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const request = async (method, endpoint, data = null, options = {}) => {
  const url = createUrl(endpoint);
  const fetchOptions = createOptions(method, options, data);
  
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), apiClient.config.timeout);
  fetchOptions.signal = controller.signal;

  try {
    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);
    return await handleResponse(response);
  } catch (error) {
    clearTimeout(timeoutId);
    throw handleError(error);
  }
};

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const get = (endpoint, options = {}) => {
  return request('GET', endpoint, null, options);
};

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request data
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const post = (endpoint, data = {}, options = {}) => {
  return request('POST', endpoint, data, options);
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request data
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const put = (endpoint, data = {}, options = {}) => {
  return request('PUT', endpoint, data, options);
};

/**
 * PATCH request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request data
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const patch = (endpoint, data = {}, options = {}) => {
  return request('PATCH', endpoint, data, options);
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const del = (endpoint, options = {}) => {
  return request('DELETE', endpoint, null, options);
};

/**
 * Set authentication token
 * @param {string} token - Authentication token
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

/**
 * Get authentication token
 * @returns {string|null} Authentication token
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * API client instance
 */
export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  setAuthToken,
  getAuthToken,
  isAuthenticated,
  setConfig: setApiConfig,
  getConfig: getApiConfig
};

export default api;