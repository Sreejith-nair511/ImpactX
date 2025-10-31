import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Map of route paths to display names
  const routeNames = {
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
    'press': 'Press'
  };

  return (
    <nav className="mb-4 md:mb-6 text-sm">
      <ol className="flex items-center space-x-2 overflow-x-auto pb-2">
        <li>
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Home
          </Link>
        </li>
        
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={routeTo} className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {isLast ? (
                <span className="text-gray-500 dark:text-gray-400 font-medium truncate max-w-xs">
                  {routeNames[pathname] || pathname}
                </span>
              ) : (
                <Link 
                  to={routeTo} 
                  className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-xs"
                >
                  {routeNames[pathname] || pathname}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;