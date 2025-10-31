import React from 'react';
import { motion } from 'framer-motion';

const DataMap = ({ title, locations }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-5 border border-gray-100 dark:border-gray-700 h-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      
      <div className="relative w-full h-48 md:h-56 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl overflow-hidden">
        {/* Simplified map representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-green-100/30 dark:from-blue-800/20 dark:to-green-800/20"></div>
        
        {/* Location markers */}
        {locations.map((location, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"
            style={{
              left: `${location.x}%`,
              top: `${location.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {location.name}
            </div>
          </motion.div>
        ))}
        
        {/* Map grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border border-blue-200/30 dark:border-blue-800/30 rounded"></div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {locations.map((location, index) => (
          <div key={index} className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600 dark:text-gray-300">{location.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataMap;