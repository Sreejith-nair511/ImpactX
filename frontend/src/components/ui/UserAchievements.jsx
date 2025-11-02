import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UserAchievements = ({ 
  user, 
  achievements = [], 
  showAddButton = false, 
  onAddAchievement,
  className = '' 
}) => {
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    organization: '',
    date: '',
    description: '',
    type: 'achievement',
    url: ''
  });

  // Achievement types
  const achievementTypes = [
    { key: 'achievement', label: 'Achievement', icon: '🏆' },
    { key: 'certification', label: 'Certification', icon: '📜' },
    { key: 'award', label: 'Award', icon: '🥇' },
    { key: 'publication', label: 'Publication', icon: '📚' },
    { key: 'course', label: 'Course', icon: '🎓' },
    { key: 'project', label: 'Project', icon: '🚀' }
  ];

  // Handle adding achievement
  const handleAddAchievement = () => {
    if (!newAchievement.title.trim() || !newAchievement.organization.trim()) return;
    
    if (onAddAchievement) {
      onAddAchievement({
        ...newAchievement,
        date: newAchievement.date || new Date().toISOString().split('T')[0]
      });
    }
    
    setNewAchievement({
      title: '',
      organization: '',
      date: '',
      description: '',
      type: 'achievement',
      url: ''
    });
    setShowAchievementForm(false);
  };

  // Group achievements by type
  const groupedAchievements = achievementTypes.map(type => ({
    ...type,
    achievements: achievements.filter(achievement => achievement.type === type.key)
  })).filter(type => type.achievements.length > 0);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Achievements & Certifications
        </h2>
        {showAddButton && (
          <button
            onClick={() => setShowAchievementForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Achievement
          </button>
        )}
      </div>

      {/* Empty state */}
      {achievements.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No achievements added yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {showAddButton 
              ? 'Add your achievements and certifications to showcase your accomplishments.' 
              : 'This user hasn\'t added any achievements yet.'}
          </p>
        </div>
      )}

      {/* Achievements by type */}
      {groupedAchievements.length > 0 && (
        <div className="space-y-8">
          {groupedAchievements.map((type) => (
            <div key={type.key}>
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{type.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {type.label}
                </h3>
                <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                  {type.achievements.length}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {type.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ y: -2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {achievement.organization}
                        </p>
                      </div>
                      <span className="text-2xl">{type.icon}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(achievement.date)}</span>
                    </div>
                    
                    {achievement.description && (
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        {achievement.description}
                      </p>
                    )}
                    
                    {achievement.url && (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                      >
                        View Details
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Achievement Modal */}
      {showAchievementForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Add Achievement
                </h3>
                <button
                  onClick={() => {
                    setShowAchievementForm(false);
                    setNewAchievement({
                      title: '',
                      organization: '',
                      date: '',
                      description: '',
                      type: 'achievement',
                      url: ''
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Achievement Title
                  </label>
                  <input
                    type="text"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                    placeholder="e.g., Project Management Professional"
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={newAchievement.organization}
                    onChange={(e) => setNewAchievement({...newAchievement, organization: e.target.value})}
                    placeholder="e.g., PMI, Coursera, Company Name"
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Type
                  </label>
                  <select
                    value={newAchievement.type}
                    onChange={(e) => setNewAchievement({...newAchievement, type: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {achievementTypes.map((type) => (
                      <option key={type.key} value={type.key}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newAchievement.date}
                    onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                    placeholder="Describe your achievement..."
                    rows={3}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newAchievement.url}
                    onChange={(e) => setNewAchievement({...newAchievement, url: e.target.value})}
                    placeholder="https://example.com/certificate"
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAchievementForm(false);
                    setNewAchievement({
                      title: '',
                      organization: '',
                      date: '',
                      description: '',
                      type: 'achievement',
                      url: ''
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAchievement}
                  disabled={!newAchievement.title.trim() || !newAchievement.organization.trim()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  Add Achievement
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserAchievements;