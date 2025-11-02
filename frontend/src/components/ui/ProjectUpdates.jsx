import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import * as portfolioService from '../../services/portfolioService';

const ProjectUpdates = ({ 
  projectId, 
  userId,
  showCreateForm = false,
  maxUpdates = 10,
  className = '' 
}) => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    title: '',
    content: '',
    type: 'update'
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch project updates
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        let data;
        
        if (projectId) {
          data = await portfolioService.getProjectUpdates(projectId);
        } else if (userId) {
          // Fetch updates for all user's projects
          const userProjects = await portfolioService.getUserProjects(userId);
          const allUpdates = [];
          
          // Get updates for each project
          for (const project of userProjects) {
            const projectUpdates = await portfolioService.getProjectUpdates(project.id);
            projectUpdates.forEach(update => {
              allUpdates.push({
                ...update,
                project: {
                  id: project.id,
                  title: project.title,
                  image: project.image
                }
              });
            });
          }
          
          // Sort by date
          data = allUpdates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        setUpdates(data.slice(0, maxUpdates));
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load updates');
        console.error('Error fetching updates:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId || userId) {
      fetchUpdates();
    }
  }, [projectId, userId, maxUpdates]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUpdate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newUpdate.title.trim() || !newUpdate.content.trim()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const updateData = await portfolioService.createProjectUpdate(projectId, newUpdate);
      setUpdates(prev => [updateData, ...prev.slice(0, maxUpdates - 1)]);
      setNewUpdate({
        title: '',
        content: '',
        type: 'update'
      });
      setShowForm(false);
    } catch (err) {
      setError(err.message || 'Failed to create update');
      console.error('Error creating update:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

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
          Error loading updates
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

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {projectId ? 'Project Updates' : 'News Feed'}
        </h2>
        
        {showCreateForm && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Update
          </button>
        )}
      </div>

      {/* Create Update Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Update Title
              </label>
              <input
                type="text"
                name="title"
                value={newUpdate.title}
                onChange={handleInputChange}
                placeholder="What's new with your project?"
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={newUpdate.content}
                onChange={handleInputChange}
                placeholder="Share details about your progress, challenges, or achievements..."
                rows={4}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Update Type
              </label>
              <select
                name="type"
                value={newUpdate.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="update">General Update</option>
                <option value="milestone">Milestone Reached</option>
                <option value="challenge">Challenge Faced</option>
                <option value="achievement">Achievement</option>
                <option value="funding">Funding News</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Update'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Empty state */}
      {updates.length === 0 && !showForm && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No updates yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {showCreateForm 
              ? 'Be the first to post an update about your project.' 
              : 'Check back later for project updates.'}
          </p>
        </div>
      )}

      {/* Updates List */}
      {updates.length > 0 && (
        <div className="space-y-6">
          {updates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    {update.project && (
                      <img 
                        src={update.project.image || '/default-project.png'} 
                        alt={update.project.title}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {update.title}
                      </h3>
                      {update.project && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {update.project.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      update.type === 'milestone' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : update.type === 'challenge'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : update.type === 'achievement'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            : update.type === 'funding'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {update.content}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(update.createdAt)}
                  </span>
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span className="text-sm">{update.likes || 0}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm">{update.comments || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectUpdates;