import { useState, useEffect, useCallback } from 'react';
import * as searchService from '../services/searchService';

/**
 * Custom hook for managing search functionality
 * @param {string} userId - The ID of the user (optional)
 * @returns {Object} Search state and actions
 */
export const useSearch = (userId) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    users: [],
    projects: [],
    tasks: [],
    teams: [],
    documents: [],
    events: []
  });
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('all');
  
  // Fetch search suggestions
  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    
    try {
      const data = await searchService.getSearchSuggestions(searchQuery, { limit: 8 });
      setSuggestions(data.suggestions || data);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  }, []);
  
  // Fetch recent searches
  const fetchRecentSearches = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await searchService.getRecentSearches(userId);
      setRecentSearches(data.searches || data);
    } catch (err) {
      console.error('Error fetching recent searches:', err);
    }
  }, [userId]);
  
  // Fetch saved searches
  const fetchSavedSearches = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await searchService.getSavedSearches(userId);
      setSavedSearches(data.searches || data);
    } catch (err) {
      console.error('Error fetching saved searches:', err);
    }
  }, [userId]);
  
  // Perform search
  const performSearch = useCallback(async (searchQuery = query, type = searchType) => {
    if (!searchQuery.trim()) {
      setResults({
        users: [],
        projects: [],
        tasks: [],
        teams: [],
        documents: [],
        events: []
      });
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let searchResults = {};
      
      if (type === 'all' || type === 'users') {
        const users = await searchService.searchUsers(searchQuery);
        searchResults.users = users.results || users;
      }
      
      if (type === 'all' || type === 'projects') {
        const projects = await searchService.searchProjects(searchQuery);
        searchResults.projects = projects.results || projects;
      }
      
      if (type === 'all' || type === 'tasks') {
        const tasks = await searchService.searchTasks(searchQuery);
        searchResults.tasks = tasks.results || tasks;
      }
      
      if (type === 'all' || type === 'teams') {
        const teams = await searchService.searchTeams(searchQuery);
        searchResults.teams = teams.results || teams;
      }
      
      if (type === 'all' || type === 'documents') {
        const documents = await searchService.searchDocuments(searchQuery);
        searchResults.documents = documents.results || documents;
      }
      
      if (type === 'all' || type === 'events') {
        const events = await searchService.searchEvents(searchQuery);
        searchResults.events = events.results || events;
      }
      
      setResults(prev => ({ ...prev, ...searchResults }));
    } catch (err) {
      setError(err.message || 'Failed to perform search');
      console.error('Error performing search:', err);
    } finally {
      setLoading(false);
    }
  }, [query, searchType]);
  
  // Save search
  const saveSearch = useCallback(async (searchQuery) => {
    if (!userId || !searchQuery.trim()) return;
    
    try {
      const savedSearch = await searchService.saveSearch(userId, searchQuery);
      setSavedSearches(prev => [savedSearch, ...prev]);
      return savedSearch;
    } catch (err) {
      console.error('Error saving search:', err);
      throw err;
    }
  }, [userId]);
  
  // Delete saved search
  const deleteSavedSearch = useCallback(async (searchId) => {
    if (!userId) return;
    
    try {
      await searchService.deleteSavedSearch(userId, searchId);
      setSavedSearches(prev => prev.filter(search => search.id !== searchId));
    } catch (err) {
      console.error('Error deleting saved search:', err);
      throw err;
    }
  }, [userId]);
  
  // Advanced search
  const advancedSearch = useCallback(async (searchQuery, filters) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchService.advancedSearch(searchQuery, filters);
      setResults(data.results || data);
    } catch (err) {
      setError(err.message || 'Failed to perform advanced search');
      console.error('Error performing advanced search:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Clear search results
  const clearResults = useCallback(() => {
    setResults({
      users: [],
      projects: [],
      tasks: [],
      teams: [],
      documents: [],
      events: []
    });
    setQuery('');
  }, []);
  
  // Debounced search function
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim()) {
        performSearch();
        fetchSuggestions(query);
      } else {
        setResults({
          users: [],
          projects: [],
          tasks: [],
          teams: [],
          documents: [],
          events: []
        });
        setSuggestions([]);
      }
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [query, searchType, performSearch, fetchSuggestions]);
  
  // Initialize recent and saved searches
  useEffect(() => {
    if (userId) {
      fetchRecentSearches();
      fetchSavedSearches();
    }
  }, [userId, fetchRecentSearches, fetchSavedSearches]);
  
  return {
    // State
    query,
    setQuery,
    results,
    suggestions,
    recentSearches,
    savedSearches,
    loading,
    error,
    searchType,
    setSearchType,
    
    // Actions
    performSearch,
    fetchSuggestions,
    fetchRecentSearches,
    fetchSavedSearches,
    saveSearch,
    deleteSavedSearch,
    advancedSearch,
    clearResults
  };
};

export default useSearch;