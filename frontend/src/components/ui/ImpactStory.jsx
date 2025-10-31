import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  MapPinIcon, 
  CalendarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const ImpactStory = ({ 
  title, 
  description, 
  beneficiary, 
  location, 
  date, 
  image,
  impact,
  projectLink
}) => {
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
        <h3 className="text-xl font-bold mb-2">{title}</h3>
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
        </div>
        
        <button className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium">
          Read full story
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default ImpactStory;