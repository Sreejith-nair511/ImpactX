import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = ({ 
  customRoutes = {},
  separator = 'chevron',
  maxItems = 5,
  className = '',
  itemClassName = '',
  linkClassName = '',
  currentClassName = ''
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Default route names
  const defaultRouteNames = {
    '': 'Home',
    'global-impact': 'Global Impact',
    'data-insights': 'Data Insights',
    'climate-forecast': 'Climate Forecast',
    'verification-engine': 'Verification Engine',
    'fraud-detection': 'Fraud Detection',
    'automation': 'Automation',
    'impact-market': 'Impact Market',
    'treasury': 'Treasury',
    'proposals': 'Proposals',
    'community': 'Community',
    'volunteers': 'Volunteers',
    'academy': 'Academy',
    'events': 'Events',
    'api-playground': 'API Playground',
    'contracts': 'Contracts',
    'tools': 'Tools',
    'pipeline': 'Pipeline',
    'ledger': 'Ledger',
    'security': 'Security',
    'charter': 'Charter',
    'localization': 'Localization',
    'accessibility': 'Accessibility',
    'lab': 'Lab',
    'interoperability': 'Interoperability',
    'roadmap': 'Roadmap',
    'about': 'About',
    'careers': 'Careers',
    'press': 'Press',
    'analytics': 'Analytics',
    'detailed': 'Detailed Analytics',
    'settings': 'Settings',
    'profile': 'Profile',
    'projects': 'Projects',
    'impact-stories': 'Impact Stories'
  };

  // Merge custom routes with default routes
  const routeNames = useMemo(() => ({
    ...defaultRouteNames,
    ...customRoutes
  }), [customRoutes]);

  // Get separator icon
  const getSeparator = () => {
    switch (separator) {
      case 'chevron':
        return (
          <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
      case 'slash':
        return (
          <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8" />
          </svg>
        );
      case 'arrow':
        return (
          <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
    }
  };

  // Truncate pathnames if they exceed maxItems
  const truncatedPathnames = useMemo(() => {
    if (pathnames.length <= maxItems) {
      return pathnames;
    }
    
    // Keep first, last, and middle items
    const first = pathnames[0];
    const last = pathnames[pathnames.length - 1];
    const middle = pathnames[Math.floor(pathnames.length / 2)];
    
    return [first, '...', middle, '...', last];
  }, [pathnames, maxItems]);

  // Generate breadcrumb items
  const breadcrumbItems = useMemo(() => {
    return truncatedPathnames.map((pathname, index) => {
      // Handle ellipsis
      if (pathname === '...') {
        return {
          type: 'ellipsis',
          key: `ellipsis-${index}`
        };
      }
      
      const routeTo = `/${pathnames.slice(0, pathnames.indexOf(pathname) + 1).join('/')}`;
      const isLast = pathnames.indexOf(pathname) === pathnames.length - 1;
      
      return {
        type: 'item',
        key: routeTo,
        routeTo,
        isLast,
        displayName: routeNames[pathname] || pathname
      };
    });
  }, [truncatedPathnames, pathnames, routeNames]);

  return (
    <nav 
      className={`mb-4 md:mb-6 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol 
        className="flex items-center space-x-2 overflow-x-auto pb-2"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li 
          className={itemClassName}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link 
            to="/" 
            className={`text-blue-600 dark:text-blue-400 hover:underline ${linkClassName}`}
            itemProp="item"
          >
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        
        {breadcrumbItems.map((item, index) => {
          if (item.type === 'ellipsis') {
            return (
              <li key={item.key} className="flex items-center">
                {getSeparator()}
                <span className="text-gray-400">...</span>
              </li>
            );
          }
          
          return (
            <li 
              key={item.key} 
              className={`flex items-center ${itemClassName}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {getSeparator()}
              {item.isLast ? (
                <span 
                  className={`text-gray-500 dark:text-gray-400 font-medium truncate max-w-xs ${currentClassName}`}
                  itemProp="name"
                >
                  {item.displayName}
                </span>
              ) : (
                <Link 
                  to={item.routeTo} 
                  className={`text-blue-600 dark:text-blue-400 hover:underline truncate max-w-xs ${linkClassName}`}
                  itemProp="item"
                >
                  <span itemProp="name">{item.displayName}</span>
                </Link>
              )}
              <meta itemProp="position" content={index + 2} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;