import React from 'react';

/**
 * Badge Component
 * A customizable badge that works with the theme
 */
const Badge = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
    info: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };
  
  // Get classes
  const badgeClasses = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium ${badgeClasses} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;