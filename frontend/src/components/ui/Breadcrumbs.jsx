import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  };

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
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
              <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {isLast ? (
                <span className="text-gray-500 dark:text-gray-400">
                  {capitalize(pathname)}
                </span>
              ) : (
                <Link to={routeTo} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {capitalize(pathname)}
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