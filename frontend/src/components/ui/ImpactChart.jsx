import React from 'react';
import { motion } from 'framer-motion';

const ImpactChart = ({ title, data }) => {
  // Find min and max values for scaling
  const values = data.map(item => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1; // Avoid division by zero

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-5 border border-gray-100 dark:border-gray-700 h-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      
      <div className="flex items-end justify-between h-48 md:h-56">
        {data.map((item, index) => {
          const height = ((item.value - minValue) / range) * 100 + 10; // Minimum 10% height
          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center flex-1 mx-1"
            >
              <div className="w-full bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg flex-1 flex items-end justify-center pb-2">
                <span className="text-white text-xs font-medium transform -rotate-90 origin-center whitespace-nowrap">
                  {item.value}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
                {item.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ImpactChart;