import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Mobile Tabs Component
 * Optimized tabs for mobile devices with horizontal scrolling and touch gestures
 */
const MobileTabs = ({ 
  tabs, 
  defaultActiveTab = 0,
  onTabChange,
  className = '',
  tabClassName = '',
  contentClassName = '',
  showScrollIndicator = true
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const tabListRef = useRef(null);
  const tabRefs = useRef([]);

  // Check scroll position to show/hide scroll indicators
  const checkScrollPosition = () => {
    if (tabListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabListRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle scroll events
  useEffect(() => {
    const tabList = tabListRef.current;
    if (tabList) {
      tabList.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      
      // Check on resize
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        tabList.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  // Handle tab change
  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
    
    // Scroll tab into view
    tabRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  // Scroll tab list horizontally
  const scrollTabList = (direction) => {
    if (tabListRef.current) {
      const scrollAmount = 100;
      tabListRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Handle touch swipe gestures
  const handleTouchStart = (e) => {
    // Implementation for swipe gestures could be added here
  };

  return (
    <div className={`mobile-tabs ${className}`}>
      {/* Scrollable Tab List with Indicators */}
      <div className="relative">
        {showScrollIndicator && showLeftScroll && (
          <button 
            className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pl-2"
            onClick={() => scrollTabList('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        )}
        
        <div 
          ref={tabListRef}
          className="flex overflow-x-auto scrollbar-hide py-2 px-4 -mx-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex space-x-1 min-w-max">
            {tabs.map((tab, index) => (
              <button
                ref={el => tabRefs.current[index] = el}
                key={index}
                onClick={() => handleTabClick(index)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === index
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                } ${tabClassName}`}
                aria-selected={activeTab === index}
                tabIndex={activeTab === index ? 0 : -1}
              >
                <span className="flex items-center">
                  {tab.icon && (
                    <tab.icon className="w-4 h-4 mr-2" />
                  )}
                  {tab.title}
                  {tab.count !== undefined && (
                    <span className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-1.5 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {showScrollIndicator && showRightScroll && (
          <button 
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pr-2"
            onClick={() => scrollTabList('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>
      
      {/* Tab Content with Swipe Gestures */}
      <div 
        className={`p-4 ${contentClassName}`}
        onTouchStart={handleTouchStart}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab > defaultActiveTab ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab > defaultActiveTab ? -20 : 20 }}
            transition={{ duration: 0.2 }}
          >
            {tabs[activeTab]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileTabs;