import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search...", 
  suggestions = [],
  onSuggestionsFetch,
  debounceDelay = 300,
  loading = false,
  autoFocus = false,
  className = '',
  inputClassName = ''
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  // Handle debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query) {
      debounceRef.current = setTimeout(() => {
        if (onSearch) {
          onSearch(query);
        }
        if (onSuggestionsFetch) {
          onSuggestionsFetch(query);
        }
      }, debounceDelay);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch, onSuggestionsFetch, debounceDelay]);

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    const value = typeof suggestion === 'string' ? suggestion : suggestion.value || suggestion.label;
    setQuery(value);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    
    if (onSearch) {
      onSearch(value);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`relative ${className}`} ref={inputRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setActiveSuggestionIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            placeholder={placeholder}
            className={`w-full px-4 py-2 pl-10 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white ${inputClassName}`}
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            aria-controls="search-suggestions"
          />
          
          {/* Search icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {loading ? (
              <svg className="w-5 h-5 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
          
          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setShowSuggestions(false);
                setActiveSuggestionIndex(-1);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Submit button (hidden, for form submission) */}
        <button
          type="submit"
          className="hidden"
          aria-label="Submit search"
        >
          Search
        </button>
      </form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          id="search-suggestions"
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => {
            const displayText = typeof suggestion === 'string' ? suggestion : suggestion.label;
            const isSelected = index === activeSuggestionIndex;
            
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isSelected 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                role="option"
                aria-selected={isSelected}
              >
                {displayText}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;