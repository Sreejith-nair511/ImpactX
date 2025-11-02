import React, { useState } from 'react';
import { Search, User, Folder, CheckCircle, Users, FileText, Calendar, TrendingUp } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import useSearch from '../hooks/useSearch';
import './GlobalSearch.css';

/**
 * Global Search Page
 * Comprehensive search interface for all platform entities
 */
const GlobalSearch = () => {
  // In a real application, this would come from auth context
  const userId = 'user-123'; // Mock user ID
  
  const {
    query,
    setQuery,
    results,
    loading,
    error,
    searchType,
    setSearchType,
    performSearch
  } = useSearch(userId);
  
  const [activeTab, setActiveTab] = useState('all');
  
  // Get icon for entity type
  const getEntityIcon = (type) => {
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
  
  // Get label for entity type
  const getEntityLabel = (type) => {
    switch (type) {
      case 'users': return 'Users';
      case 'projects': return 'Projects';
      case 'tasks': return 'Tasks';
      case 'teams': return 'Teams';
      case 'documents': return 'Documents';
      case 'events': return 'Events';
      default: return 'All Results';
    }
  };
  
  // Render search results
  const renderResults = () => {
    if (error) {
      return (
        <div className="search-error">
          <p>Error: {error}</p>
        </div>
      );
    }
    
    if (loading) {
      return (
        <div className="search-loading">
          <p>Searching...</p>
        </div>
      );
    }
    
    const resultTypes = Object.keys(results);
    const hasResults = resultTypes.some(type => results[type].length > 0);
    
    if (!hasResults) {
      return (
        <div className="search-empty">
          <Search size={48} />
          <h3>No results found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      );
    }
    
    return (
      <div className="search-results">
        {resultTypes.map(type => {
          if (results[type].length === 0) return null;
          
          const IconComponent = getEntityIcon(type);
          const label = getEntityLabel(type);
          
          return (
            <div key={type} className="result-section">
              <div className="result-section-header">
                <IconComponent size={20} />
                <h3>{label} ({results[type].length})</h3>
              </div>
              
              <div className="result-list">
                {results[type].map((item, index) => (
                  <div key={index} className="result-item">
                    <div className="result-item-content">
                      <h4>{item.name || item.title || item.query}</h4>
                      {item.description && (
                        <p>{item.description}</p>
                      )}
                      {item.email && (
                        <p className="result-meta">{item.email}</p>
                      )}
                      {item.date && (
                        <p className="result-meta">{new Date(item.date).toLocaleDateString()}</p>
                      )}
                    </div>
                    <div className="result-item-actions">
                      <button className="view-btn">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="global-search">
      <div className="search-header">
        <h1>Global Search</h1>
        <p>Search across all projects, users, tasks, and more</p>
      </div>
      
      <div className="search-container">
        <SearchBar 
          userId={userId}
          onResultSelect={(searchQuery) => {
            setQuery(searchQuery);
            performSearch(searchQuery);
          }}
        />
      </div>
      
      <div className="search-filters">
        <button 
          className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <TrendingUp size={16} />
          All Results
        </button>
        <button 
          className={`filter-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <User size={16} />
          Users
        </button>
        <button 
          className={`filter-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <Folder size={16} />
          Projects
        </button>
        <button 
          className={`filter-tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <CheckCircle size={16} />
          Tasks
        </button>
      </div>
      
      <div className="search-content">
        {renderResults()}
      </div>
    </div>
  );
};

export default GlobalSearch;