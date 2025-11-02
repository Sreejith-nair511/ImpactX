import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  CalendarIcon,
  ArrowRightIcon,
  ShareIcon,
  HeartIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, formatNumber } from '../../utils/dataFormatter';

const ProjectCard = ({ 
  title, 
  description, 
  location, 
  goal, 
  raised, 
  donors, 
  endDate, 
  category, 
  image,
  impact,
  progress,
  id,
  onDonate,
  onShare
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const percentage = Math.min(100, Math.round((raised / goal) * 100));
  
  // Calculate days remaining
  const daysRemaining = Math.max(0, Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)));

  const handleShare = (platform) => {
    if (onShare) {
      onShare(id, platform);
    }
    setShowShareOptions(false);
  };

  const handleDonate = () => {
    if (onDonate) {
      onDonate(id);
    }
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
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center relative">
          <div className="text-white text-center">
            <div className="text-4xl font-bold mb-2">{impact}</div>
            <div className="text-lg">People Impacted</div>
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white text-indigo-600 text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-1 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
              aria-label={isLiked ? "Unlike project" : "Like project"}
            >
              <HeartIcon className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="p-1 rounded-full text-gray-400 hover:text-white"
              aria-label="Share project"
            >
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progress</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            ></motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-gray-400 text-xs">Raised</div>
            <div className="font-bold">{formatCurrency(raised)}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">Goal</div>
            <div className="font-bold">{formatCurrency(goal)}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">Donors</div>
            <div className="font-bold">{formatNumber(donors)}</div>
          </div>
        </div>
        
        {/* Days remaining and impact metrics */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{daysRemaining} days left</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ChartBarIcon className="h-4 w-4 mr-1" />
            <span>{impact} impacted</span>
          </div>
        </div>
        
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
          <div className="text-sm text-gray-500 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>Ends {endDate}</span>
          </div>
          <button 
            onClick={handleDonate}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Donate
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;