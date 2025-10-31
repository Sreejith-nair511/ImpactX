import React from 'react';
import { motion } from 'framer-motion';

const DataMap = ({ title, locations }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl h-80 overflow-hidden">
        {/* Simplified world map representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Continents simplified */}
            <div className="absolute top-1/4 left-1/4 w-1/4 h-1/3 bg-green-200/50 dark:bg-green-900/30 rounded-lg"></div>
            <div className="absolute top-1/3 right-1/4 w-1/5 h-1/4 bg-green-200/50 dark:bg-green-900/30 rounded-lg"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1/5 h-1/4 bg-green-200/50 dark:bg-green-900/30 rounded-lg"></div>
            
            {/* Location markers */}
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer"
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                  {location.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {locations.map((location, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">{location.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DataMap;