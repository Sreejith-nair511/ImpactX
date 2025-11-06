import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Performance Optimized Tabs Component
 * Memoized version with optimized rendering and reduced re-renders
 */
const PerformanceTabs = ({ 
  tabs, 
  defaultActiveTab = 0,
  onTabChange,
  className = '',
  tabClassName = '',
  contentClassName = '',
  lazyLoad = true,
  cacheTabs = true
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [loadedTabs, setLoadedTabs] = useState(new Set(lazyLoad ? [defaultActiveTab] : []));
  const [cachedContent, setCachedContent] = useState(new Map());
  const tabRefs = useRef([]);

  // Load tab content when activated
  useEffect(() => {
    if (lazyLoad) {
      setLoadedTabs(prev => {
        const newSet = new Set(prev);
        newSet.add(activeTab);
        return newSet;
      });
    }
  }, [activeTab, lazyLoad]);

  // Cache tab content
  useEffect(() => {
    if (cacheTabs) {
      tabs.forEach((tab, index) => {
        if (!cachedContent.has(index) && (loadedTabs.has(index) || !lazyLoad)) {
          setCachedContent(prev => new Map(prev.set(index, tab.content)));
        }
      });
    }
  }, [tabs, loadedTabs, lazyLoad, cacheTabs, cachedContent]);

  // Handle tab change
  const handleTabClick = useCallback((index) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
  }, [onTabChange]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e, index) => {
    let newIndex = index;
    
    if (e.key === 'ArrowLeft') {
      newIndex = index > 0 ? index - 1 : tabs.length - 1;
    } else if (e.key === 'ArrowRight') {
      newIndex = index < tabs.length - 1 ? index + 1 : 0;
    }
    
    if (newIndex !== index) {
      e.preventDefault();
      handleTabClick(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  }, [tabs.length, handleTabClick]);

  // Memoized tab headers
  const renderTabHeaders = useCallback(() => {
    return tabs.map((tab, index) => (
      <button
        ref={el => tabRefs.current[index] = el}
        key={index}
        onClick={() => handleTabClick(index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        className={`px-4 py-3 text-sm font-medium relative whitespace-nowrap ${
          activeTab === index
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        } ${tabClassName}`}
        role="tab"
        aria-selected={activeTab === index}
        tabIndex={activeTab === index ? 0 : -1}
      >
        <span className="flex items-center">
          {tab.icon && (
            <tab.icon className={`w-4 h-4 mr-2 ${activeTab === index ? 'text-current' : 'text-gray-400'}`} />
          )}
          {tab.title}
        </span>
        {activeTab === index && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
            layoutId="performanceTabIndicator"
            aria-hidden="true"
          />
        )}
      </button>
    ));
  }, [tabs, activeTab, tabClassName, handleTabClick, handleKeyDown]);

  // Memoized tab content
  const renderTabContent = useCallback(() => {
    return tabs.map((tab, index) => {
      const shouldRender = !lazyLoad || loadedTabs.has(index);
      const content = cachedContent.get(index) || tab.content;
      
      return (
        <div
          key={index}
          role="tabpanel"
          hidden={activeTab !== index}
        >
          {shouldRender && activeTab === index && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {content}
            </motion.div>
          )}
        </div>
      );
    });
  }, [tabs, activeTab, lazyLoad, loadedTabs, cachedContent]);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Tab Headers */}
      <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="flex min-w-max">
          {renderTabHeaders()}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className={`p-4 md:p-6 ${contentClassName}`}>
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(PerformanceTabs);