import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UserCard from './UserCard';
import LoadingSpinner from './LoadingSpinner';
import * as userConnectionsService from '../../services/userConnections';

const UserConnections = ({ 
  userId, 
  type = 'followers', 
  title, 
  showSearch = true,
  showSuggestions = false,
  className = '' 
}) => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Fetch connections
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const data = await userConnectionsService.getUserConnections(userId, type);
        setConnections(data.connections || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load connections');
        console.error('Error fetching connections:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchConnections();
    }
  }, [userId, type]);

  // Fetch suggestions when enabled
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (showSuggestions && type === 'suggestions') {
        try {
          setLoading(true);
          const data = await userConnectionsService.getSuggestedUsers();
          setSuggestions(data);
          setError(null);
        } catch (err) {
          setError(err.message || 'Failed to load suggestions');
          console.error('Error fetching suggestions:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSuggestions();
  }, [showSuggestions, type]);

  // Handle follow/unfollow
  const handleFollowToggle = async (user, isFollowing) => {
    try {
      if (isFollowing) {
        await userConnectionsService.unfollowUser(user.id);
      } else {
        await userConnectionsService.followUser(user.id);
      }
      
      // Update local state
      if (type === 'followers' || type === 'following') {
        setConnections(prev => 
          prev.map(conn => 
            conn.id === user.id 
              ? { ...conn, isFollowing: !isFollowing } 
              : conn
          )
        );
      } else if (type === 'suggestions') {
        setSuggestions(prev => 
          prev.map(suggestion => 
            suggestion.id === user.id 
              ? { ...suggestion, isFollowing: !isFollowing } 
              : suggestion
          )
        );
      }
    } catch (err) {
      console.error('Error toggling follow status:', err);
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const results = await userConnectionsService.searchUsers(query);
        setConnections(results);
      } catch (err) {
        console.error('Error searching users:', err);
      }
    } else if (query.length === 0) {
      // Reset to original connections
      const data = await userConnectionsService.getUserConnections(userId, type);
      setConnections(data.connections || []);
    }
  };

  // Filter connections based on search query
  const filteredConnections = connections.filter(connection => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      connection.name.toLowerCase().includes(query) ||
      connection.username.toLowerCase().includes(query) ||
      (connection.role && connection.role.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-64 ${className}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-6 text-center ${className}`}>
        <div className="text-red-600 dark:text-red-400 font-medium mb-2">
          Error loading connections
        </div>
        <div className="text-red-500 dark:text-red-300 text-sm mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const displayUsers = type === 'suggestions' ? suggestions : filteredConnections;

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title || (type === 'followers' ? 'Followers' : type === 'following' ? 'Following' : 'Connections')}
        </h2>
        
        {showSearch && (
          <div className="mt-2 sm:mt-0 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search connections..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Empty state */}
      {displayUsers.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {type === 'followers' 
              ? 'No followers yet' 
              : type === 'following' 
                ? 'Not following anyone' 
                : 'No connections'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {type === 'followers' 
              ? 'When people follow you, they\'ll appear here' 
              : type === 'following' 
                ? 'Follow people to see their activity' 
                : 'Connect with others to build your network'}
          </p>
        </div>
      )}

      {/* User grid */}
      {displayUsers.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <UserCard
                user={user}
                onFollow={handleFollowToggle}
                showActions={true}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default UserConnections;