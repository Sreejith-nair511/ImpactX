import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  CalendarIcon,
  ArrowRightIcon
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
  progress 
}) => {
  const percentage = Math.min(100, Math.round((raised / goal) * 100));

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
        <h3 className="text-xl font-bold mb-2">{title}</h3>
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
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>Ends {endDate}</span>
          </div>
          <button className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium">
            Donate
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;