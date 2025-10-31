import React from 'react';
import { motion } from 'framer-motion';

const ImpactChart = ({ title, data, type = 'bar' }) => {
  // Mock data visualization
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      
      <div className="flex items-end justify-between h-64 mt-8">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 px-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / maxValue) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg flex items-end justify-center pb-2"
            >
              <span className="text-white text-xs font-bold">{item.value}</span>
            </motion.div>
            <span className="text-gray-500 dark:text-gray-400 text-xs mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ImpactChart;