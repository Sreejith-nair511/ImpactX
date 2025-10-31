import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, description, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h3>
          {description && (
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">{description}</p>
          )}
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`inline-flex items-center text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;