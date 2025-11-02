import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ 
  tabs, 
  defaultActiveTab = 0,
  orientation = 'horizontal',
  variant = 'default',
  onTabChange,
  className = '',
  tabClassName = '',
  contentClassName = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const tabRefs = useRef([]);

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    let newIndex = index;
    
    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        newIndex = index > 0 ? index - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowRight') {
        newIndex = index < tabs.length - 1 ? index + 1 : 0;
      }
    } else {
      if (e.key === 'ArrowUp') {
        newIndex = index > 0 ? index - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowDown') {
        newIndex = index < tabs.length - 1 ? index + 1 : 0;
      }
    }
    
    if (newIndex !== index) {
      e.preventDefault();
      setActiveTab(newIndex);
      tabRefs.current[newIndex]?.focus();
      if (onTabChange) onTabChange(newIndex);
    }
  };

  // Variant styles
  const variantStyles = {
    default: {
      container: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden',
      tabList: 'border-b border-gray-200 dark:border-gray-700',
      tab: 'flex-shrink-0 px-4 py-3 text-sm font-medium relative whitespace-nowrap',
      tabActive: 'text-blue-600 dark:text-blue-400',
      tabInactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
      indicator: 'absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500'
    },
    minimal: {
      container: '',
      tabList: 'flex border-b border-gray-200 dark:border-gray-700',
      tab: 'px-4 py-2 text-sm font-medium relative',
      tabActive: 'text-blue-600 dark:text-blue-400',
      tabInactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
      indicator: 'absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500'
    },
    boxed: {
      container: 'bg-gray-100 dark:bg-gray-800 rounded-lg p-1',
      tabList: 'flex',
      tab: 'flex-1 px-4 py-2 text-sm font-medium rounded-md relative',
      tabActive: 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow',
      tabInactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
      indicator: 'hidden'
    }
  };

  const styles = variantStyles[variant] || variantStyles.default;

  // Handle tab change
  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Tab Headers */}
      <div className={`${styles.tabList} ${orientation === 'vertical' ? 'flex-col' : ''}`}>
        <div className={`flex ${orientation === 'vertical' ? 'flex-col' : 'overflow-x-auto md:overflow-x-visible'}`}>
          {tabs.map((tab, index) => (
            <button
              ref={el => tabRefs.current[index] = el}
              key={index}
              onClick={() => handleTabClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`${styles.tab} ${tabClassName} ${
                activeTab === index
                  ? styles.tabActive
                  : styles.tabInactive
              } ${orientation === 'vertical' ? 'w-full text-left justify-start' : ''}`}
              role="tab"
              aria-selected={activeTab === index}
              tabIndex={activeTab === index ? 0 : -1}
              id={`tab-${index}`}
              aria-controls={`panel-${index}`}
            >
              <span className="flex items-center">
                {tab.icon && (
                  <tab.icon className={`w-4 h-4 mr-2 ${activeTab === index ? 'text-current' : 'text-gray-400'}`} />
                )}
                {tab.title}
                {tab.count !== undefined && (
                  <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </span>
              {activeTab === index && variant !== 'boxed' && (
                <motion.div
                  className={styles.indicator}
                  layoutId="tabIndicator"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className={`p-4 md:p-6 ${contentClassName}`}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            id={`panel-${index}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            hidden={activeTab !== index}
          >
            {activeTab === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {tab.content}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;