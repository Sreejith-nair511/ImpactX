import React from 'react';

/**
 * Loading Spinner Component
 * A customizable loading spinner that works with the theme
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  className = '', 
  fullScreen = false,
  message = '' 
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Color classes
  const colorClasses = {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    white: 'text-white',
    black: 'text-black dark:text-white'
  };

  const spinner = (
    <div className={`inline-block ${sizeClasses[size]} ${className}`} role="status">
      <svg 
        className={`animate-spin ${colorClasses[color]} w-full h-full`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {message && (
        <span className="sr-only">{message}</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center">
          {spinner}
          {message && (
            <p className="mt-4 text-gray-700 dark:text-gray-300">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;