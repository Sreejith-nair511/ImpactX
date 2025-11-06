import React from 'react';

/**
 * Progress Bar Component
 * A customizable progress bar that works with the theme
 */
const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  color = 'primary',
  size = 'md',
  showPercentage = false,
  className = ''
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Color classes
  const colorClasses = {
    primary: 'bg-blue-600 dark:bg-blue-500',
    secondary: 'bg-gray-600 dark:bg-gray-500',
    success: 'bg-green-600 dark:bg-green-500',
    warning: 'bg-yellow-600 dark:bg-yellow-500',
    error: 'bg-red-600 dark:bg-red-500',
    indigo: 'bg-indigo-600 dark:bg-indigo-500',
    purple: 'bg-purple-600 dark:bg-purple-500'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };
  
  // Bar color class
  const barColorClass = colorClasses[color] || colorClasses.primary;
  const barSizeClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center">
        <div className="flex-1">
          <div 
            className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${barSizeClass}`}
          >
            <div 
              className={`h-full rounded-full transition-all duration-300 ease-out ${barColorClass}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        {showPercentage && (
          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;