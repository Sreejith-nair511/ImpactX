import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Save, Clock, User, Folder, CheckCircle, Users, FileText, Calendar } from 'lucide-react';
import useSearch from '../../hooks/useSearch';
import './SearchBar.css';

/**
 * Search Bar Component
 * Advanced search interface with suggestions and filters
 */
const SearchBar = ({ userId, onResultSelect, className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef(null);
  const inputRef = useRef(null);
  
  const {
    query,
    setQuery,
    suggestions,
    recentSearches,
    savedSearches,
    loading,
    searchType,
    setSearchType,
    performSearch,
    saveSearch,
    deleteSavedSearch
  } = useSearch(userId);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowSuggestions(false);
      }
    };
    
    if (showSuggestions) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSuggestions]);
  
  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch();
      setShowSuggestions(false);
      if (onResultSelect) {
        onResultSelect(query);
      }
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.query || suggestion);
    setShowSuggestions(false);
    performSearch(suggestion.query || suggestion);
    if (onResultSelect) {
      onResultSelect(suggestion.query || suggestion);
    }
  };
  
  // Handle recent search click
  const handleRecentSearchClick = (search) => {
    setQuery(search.query);
    setShowSuggestions(false);
    performSearch(search.query);
    if (onResultSelect) {
      onResultSelect(search.query);
    }
  };
  
  // Handle save search
  const handleSaveSearch = async () => {
    if (query.trim()) {
      try {
        await saveSearch(query);
      } catch (err) {
        console.error('Error saving search:', err);
      }
    }
  };
  
  // Get icon for search type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'users': return User;
      case 'projects': return Folder;
      case 'tasks': return CheckCircle;
      case 'teams': return Users;
      case 'documents': return FileText;
      case 'events': return Calendar;
      default: return Search;
    }
  };
  
  // Get label for search type
  const getTypeLabel = (type) => {
    switch (type) {
      case 'users': return 'Users';
      case 'projects': return 'Projects';
      case 'tasks': return 'Tasks';
      case 'teams': return 'Teams';
      case 'documents': return 'Documents';
      case 'events': return 'Events';
      default: return 'All';
    }
  };
  
  return (
    <div className={`search-bar ${className}`} ref={searchBarRef}>
      <form onSubmit={handleSubmit} className="search-bar__form">
        <div className={`search-bar__input-container ${isFocused ? 'focused' : ''}`}>
          <Search className="search-bar__icon" size={20} />
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Search ImpactX..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            aria-label="Search"
            className="search-bar__input"
          />
          
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="search-bar__clear"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
          
          <button
            type="submit"
            className="search-bar__submit"
            aria-label="Submit search"
          >
            <Search size={20} />
          </button>
        </div>
        
        {showSuggestions && (
          <div className="search-bar__dropdown">
            <div className="search-bar__filters">
              <button
                className={`filter-btn ${searchType === 'all' ? 'active' : ''}`}
                onClick={() => setSearchType('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${searchType === 'users' ? 'active' : ''}`}
                onClick={() => setSearchType('users')}
              >
                <User size={14} />
                Users
              </button>
              <button
                className={`filter-btn ${searchType === 'projects' ? 'active' : ''}`}
                onClick={() => setSearchType('projects')}
              >
                <Folder size={14} />
                Projects
              </button>
              <button
                className={`filter-btn ${searchType === 'tasks' ? 'active' : ''}`}
                onClick={() => setSearchType('tasks')}
              >
                <CheckCircle size={14} />
                Tasks
              </button>
            </div>
            
            {query.trim() && (
              <div className="search-bar__actions">
                <button
                  type="button"
                  onClick={handleSaveSearch}
                  className="search-bar__save-btn"
                  disabled={!query.trim()}
                >
                  <Save size={16} />
                  Save Search
                </button>
              </div>
            )}
            
            {suggestions.length > 0 && (
              <div className="search-bar__section">
                <h4 className="search-bar__section-title">Suggestions</h4>
                <ul className="search-bar__suggestions">
                  {suggestions.map((suggestion, index) => {
                    const IconComponent = getTypeIcon(suggestion.type);
                    return (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="search-bar__suggestion-item"
                        >
                          <IconComponent size={16} />
                          <span>{suggestion.query || suggestion}</span>
                          {suggestion.type && (
                            <span className="search-bar__suggestion-type">
                              {getTypeLabel(suggestion.type)}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            
            {recentSearches.length > 0 && !query.trim() && (
              <div className="search-bar__section">
                <h4 className="search-bar__section-title">
                  <Clock size={16} />
                  Recent Searches
                </h4>
                <ul className="search-bar__recent-searches">
                  {recentSearches.slice(0, 5).map((search, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => handleRecentSearchClick(search)}
                        className="search-bar__recent-item"
                      >
                        <Clock size={16} />
                        <span>{search.query}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSavedSearch(search.id);
                          }}
                          className="search-bar__delete-btn"
                          aria-label="Delete search"
                        >
                          <X size={14} />
                        </button>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {savedSearches.length > 0 && !query.trim() && (
              <div className="search-bar__section">
                <h4 className="search-bar__section-title">
                  <Save size={16} />
                  Saved Searches
                </h4>
                <ul className="search-bar__saved-searches">
                  {savedSearches.slice(0, 5).map((search, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => handleRecentSearchClick(search)}
                        className="search-bar__saved-item"
                      >
                        <Save size={16} />
                        <span>{search.query}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSavedSearch(search.id);
                          }}
                          className="search-bar__delete-btn"
                          aria-label="Delete search"
                        >
                          <X size={14} />
                        </button>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {loading && (
              <div className="search-bar__loading">
                Searching...
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;