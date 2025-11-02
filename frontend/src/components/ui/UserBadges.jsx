import React from 'react';
import { motion } from 'framer-motion';

const UserBadges = ({ 
  user, 
  badges = [], 
  showAwardButton = false, 
  onAwardBadge,
  className = '' 
}) => {
  // Group badges by category
  const groupedBadges = badges.reduce((acc, badge) => {
    const category = badge.category || 'other';
    if (!acc[category]) {
      acc[category] = {
        name: category.charAt(0).toUpperCase() + category.slice(1),
        badges: []
      };
    }
    acc[category].badges.push(badge);
    return acc;
  }, {});

  // Badge rarity colors
  const rarityColors = {
    common: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    uncommon: 'bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    rare: 'bg-blue-200 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    epic: 'bg-purple-200 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    legendary: 'bg-yellow-200 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
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

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Badges & Recognition
        </h2>
        {showAwardButton && (
          <button
            onClick={onAwardBadge}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Award Badge
          </button>
        )}
      </div>

      {/* Empty state */}
      {badges.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No badges earned yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {showAwardButton 
              ? 'Start awarding badges to recognize achievements.' 
              : 'This user hasn\'t earned any badges yet.'}
          </p>
        </div>
      )}

      {/* Badges by category */}
      {Object.keys(groupedBadges).length > 0 && (
        <div className="space-y-8">
          {Object.entries(groupedBadges).map(([category, group]) => (
            <div key={category}>
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {group.name}
                </h3>
                <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                  {group.badges.length}
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden"
                  >
                    {/* Badge rarity indicator */}
                    <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${rarityColors[badge.rarity] || rarityColors.common}`}>
                      {badge.rarity || 'Common'}
                    </div>
                    
                    {/* Badge icon */}
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      {badge.icon ? (
                        <img 
                          src={badge.icon} 
                          alt={badge.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl">
                          {badge.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    {/* Badge name */}
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {badge.name}
                    </h4>
                    
                    {/* Badge description */}
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                      {badge.description}
                    </p>
                    
                    {/* Awarded date */}
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Awarded {formatDate(badge.awardedAt)}
                    </div>
                    
                    {/* Points */}
                    {badge.points && (
                      <div className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        +{badge.points} points
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Badge statistics */}
      {badges.length > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Badge Statistics
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {badges.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Badges
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {badges.filter(b => b.rarity === 'legendary').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Legendary
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {badges.filter(b => b.rarity === 'epic').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Epic
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {badges.filter(b => b.rarity === 'rare').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Rare
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {badges.filter(b => b.rarity === 'uncommon').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Uncommon
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBadges;