import React, { useState } from 'react';
import { useTabAnimations } from '../hooks/useTabAnimations';
import { motion } from 'framer-motion';

/**
 * Animated Tabs Demo Component
 * Demonstrates the useTabAnimations hook with visual examples
 */
const AnimatedTabsDemo = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    animationType,
    animationDuration,
    isAnimating,
    changeAnimation,
    cycleAnimation,
    getAnimationVariants
  } = useTabAnimations('slide', 300);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const animationVariants = getAnimationVariants();

  return (
    <div className="animated-tabs-demo bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Animation Controls</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={cycleAnimation}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
          >
            Cycle Animation: {animationType}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Duration:</span>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={animationDuration}
              onChange={(e) => changeAnimation(parseInt(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{animationDuration}ms</span>
          </div>
        </div>
      </div>

      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 text-sm font-medium relative ${
              activeTab === index
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.title}
            {activeTab === index && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                layoutId="animatedTabIndicator"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content with Animation */}
      <div className="min-h-[200px]">
        <motion.div
          key={activeTab}
          variants={animationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: animationDuration / 1000 }}
          className="p-4"
        >
          {tabs[activeTab]?.content}
        </motion.div>
      </div>

      {isAnimating && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Animation in progress...
        </div>
      )}
    </div>
  );
};

export default AnimatedTabsDemo;