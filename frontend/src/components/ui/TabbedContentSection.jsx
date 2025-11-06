import React from 'react';
import Tabs from './Tabs';

/**
 * Tabbed Content Section Component
 * A pre-styled tabbed content section with common configurations
 */
const TabbedContentSection = ({ 
  title,
  tabs,
  defaultActiveTab = 0,
  variant = 'default',
  className = '',
  headerClassName = '',
  tabsClassName = '',
  contentClassName = '',
  ...props
}) => {
  return (
    <div className={`tabbed-content-section ${className}`}>
      {title && (
        <div className={`tabbed-content-header ${headerClassName}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
      )}
      
      <Tabs
        tabs={tabs}
        defaultActiveTab={defaultActiveTab}
        variant={variant}
        className={tabsClassName}
        contentClassName={contentClassName}
        lazyLoad={true}
        persistState={true}
        animationType="slide"
        {...props}
      />
    </div>
  );
};

export default TabbedContentSection;