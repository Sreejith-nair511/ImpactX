import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useFeedback from '../../hooks/useFeedback';

const UserFeedback = ({ userId, showForm = true, className = '' }) => {
  const {
    feedback,
    categories,
    loading,
    error,
    submitFeedback,
    searchFeedback
  } = useFeedback(userId);

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    type: 'general',
    category: 'feature',
    title: '',
    description: '',
    rating: 5
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setNewFeedback(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newFeedback.title.trim() || !newFeedback.description.trim()) {
      return;
    }
    
    setSubmitting(true);
    setSubmitSuccess(false);
    
    try {
      await submitFeedback(newFeedback);
      setNewFeedback({
        type: 'general',
        category: 'feature',
        title: '',
        description: '',
        rating: 5
      });
      setShowFeedbackForm(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        await searchFeedback(query);
      } catch (err) {
        console.error('Error searching feedback:', err);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusStyles = {
      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
      in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
      closed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    
    const statusLabels = {
      new: 'New',
      in_progress: 'In Progress',
      resolved: 'Resolved',
      closed: 'Closed'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.new}`}>
        {statusLabels[status] || statusLabels.new}
      </span>
    );
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-64 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-6 text-center ${className}`}>
        <div className="text-red-600 dark:text-red-400 font-medium mb-2">
          Error loading feedback
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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Feedback & Suggestions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Share your thoughts and see what others are saying
          </p>
        </div>
        
        {showForm && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Give Feedback
            </button>
          </div>
        )}
      </div>
      
      {/* Submit success indicator */}
      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 dark:text-green-200">
              Thank you for your feedback! We'll review it shortly.
            </span>
          </div>
        </motion.div>
      )}
      
      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Submit Feedback
                </h3>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Feedback Type
                    </label>
                    <select
                      value={newFeedback.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="general">General Feedback</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="improvement">Improvement Suggestion</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={newFeedback.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="feature">Feature</option>
                      <option value="ui">User Interface</option>
                      <option value="performance">Performance</option>
                      <option value="security">Security</option>
                      <option value="accessibility">Accessibility</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newFeedback.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Briefly describe your feedback"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      value={newFeedback.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Provide detailed information about your feedback..."
                      rows={4}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Rating
                    </label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleInputChange('rating', star)}
                          className="text-2xl focus:outline-none"
                        >
                          {star <= newFeedback.rating ? (
                            <span className="text-yellow-500">★</span>
                          ) : (
                            <span className="text-gray-300 dark:text-gray-600">☆</span>
                          )}
                        </button>
                      ))}
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {newFeedback.rating} of 5
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Empty state */}
      {feedback.length === 0 && !showFeedbackForm && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No feedback yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {showForm 
              ? 'Be the first to share your thoughts and suggestions.' 
              : 'There is no feedback to display at this time.'}
          </p>
        </div>
      )}
      
      {/* Feedback List */}
      {feedback.length > 0 && (
        <div className="space-y-4">
          {feedback.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">
                      {formatDate(item.createdAt)}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    {item.type}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < item.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {item.rating}/5
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{item.responseCount || 0} responses</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFeedback;