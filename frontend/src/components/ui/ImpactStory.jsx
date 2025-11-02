import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  MapPinIcon, 
  CalendarIcon,
  ArrowRightIcon,
  ClockIcon,
  TagIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const ImpactStory = ({ 
  title, 
  description, 
  beneficiary, 
  location, 
  date, 
  image,
  impact,
  projectLink,
  tags = [],
  readTime = '3 min read'
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Calculate reading time based on description length
  const calculatedReadTime = description ? 
    Math.max(1, Math.ceil(description.split(' ').length / 200)) + ' min read' : 
    readTime;

  const handleShare = (platform) => {
    // In a real app, this would trigger sharing functionality
    console.log(`Sharing ${title} on ${platform}`);
    setShowShareOptions(false);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300"
    >
      {image ? (
        <div className="h-48 bg-gray-700 relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <UserGroupIcon className="h-12 w-12 mx-auto mb-2" />
            <div className="text-xl font-bold">{impact}</div>
            <div className="text-lg">People Helped</div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1 rounded-full ${isBookmarked ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark story"}
            >
              <BookmarkIcon className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-1 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
              aria-label={isLiked ? "Unlike story" : "Like story"}
            >
              <HeartIcon className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            <span>{beneficiary}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>{calculatedReadTime}</span>
          </div>
        </div>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <TagIcon className="h-4 w-4 text-gray-500 mt-1" />
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Share options */}
        {showShareOptions && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 p-3 bg-gray-750 rounded-lg"
          >
            <div className="flex justify-between">
              <button 
                onClick={() => handleShare('twitter')}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                <span>Twitter</span>
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="flex items-center px-3 py-1 bg-blue-700 text-white rounded text-sm hover:bg-blue-800"
              >
                <span>Facebook</span>
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="flex items-center px-3 py-1 bg-blue-800 text-white rounded text-sm hover:bg-blue-900"
              >
                <span>LinkedIn</span>
              </button>
              <button 
                onClick={() => handleShare('copy')}
                className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                <span>Copy Link</span>
              </button>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="flex items-center text-gray-400 hover:text-white text-sm"
          >
            <ShareIcon className="h-4 w-4 mr-1" />
            <span>Share</span>
          </button>
          <button className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium">
            Read full story
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ImpactStory;