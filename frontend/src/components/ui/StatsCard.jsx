import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, description, trend, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-5 border border-gray-100 dark:border-gray-700 h-full"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-blue-50 dark:bg-gray-700 rounded-lg">
          {icon}
        </div>
        {trend !== null && (
          <div className={`flex items-center text-sm font-medium ${
            trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            <svg className={`w-4 h-4 mr-1 ${trend >= 0 ? '' : 'transform rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div className="mb-1">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      
      <div className="mb-2">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h4>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-xs">
        {description}
      </p>
    </motion.div>
  );
};

export default StatsCard;