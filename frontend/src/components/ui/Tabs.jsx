import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Tab Headers - Horizontal on larger screens, vertical on mobile */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto md:overflow-x-visible">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium relative whitespace-nowrap ${
                activeTab === index
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span className="flex items-center">
                {tab.title}
                {tab.count && (
                  <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </span>
              {activeTab === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="tabIndicator"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="p-4 md:p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </div>
    </div>
  );
};

export default Tabs;