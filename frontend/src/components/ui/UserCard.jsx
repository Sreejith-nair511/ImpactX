import React from 'react';
import { motion } from 'framer-motion';

const UserCard = ({ 
  user, 
  variant = 'default', 
  showActions = true, 
  onMessage,
  onFollow,
  className = '' 
}) => {
  const {
    id,
    name,
    username,
    avatar,
    role,
    location,
    bio,
    stats,
    isVerified = false,
    isFollowing = false
  } = user;

  const handleMessage = (e) => {
    e.stopPropagation();
    if (onMessage) onMessage(user);
  };

  const handleFollow = (e) => {
    e.stopPropagation();
    if (onFollow) onFollow(user, !isFollowing);
  };

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700 ${className}`}
      >
        <div className="flex items-center">
          <img 
            src={avatar || '/default-avatar.png'} 
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {name}
              </h3>
              {isVerified && (
                <svg className="w-4 h-4 text-blue-500 ml-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              @{username}
            </p>
            {role && (
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {role}
              </p>
            )}
          </div>
          {showActions && (
            <div className="flex space-x-2 ml-2">
              <button
                onClick={handleMessage}
                className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Message user"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button
                onClick={handleFollow}
                className={`px-3 py-1 text-xs rounded-full ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {/* Cover Image */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        <div className="absolute -bottom-8 left-4">
          <img 
            src={avatar || '/default-avatar.png'} 
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="pt-10 pb-4 px-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {name}
              </h3>
              {isVerified && (
                <svg className="w-5 h-5 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              @{username}
            </p>
            {role && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {role}
              </p>
            )}
            {location && (
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </p>
            )}
          </div>
        </div>
        
        {bio && (
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-3">
            {bio}
          </p>
        )}
        
        {stats && (
          <div className="flex mt-4 space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {stats.projects || 0}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {stats.followers || 0}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Followers
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {stats.donations || 0}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Donations
              </div>
            </div>
          </div>
        )}
        
        {showActions && (
          <div className="flex mt-4 space-x-2">
            <button
              onClick={handleMessage}
              className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Message
            </button>
            <button
              onClick={handleFollow}
              className={`py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
                isFollowing
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isFollowing ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Following
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Follow
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;