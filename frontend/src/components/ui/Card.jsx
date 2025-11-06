import React from 'react';

/**
 * Card Component
 * A customizable card that works with the theme
 */
const Card = ({ 
  children, 
  className = '',
  variant = 'default',
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg',
    outlined: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    filled: 'bg-gray-50 dark:bg-gray-700/50'
  };
  
  // Get classes
  const cardClasses = variantClasses[variant] || variantClasses.default;
  
  return (
    <div 
      className={`rounded-xl ${cardClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Header Component
 */
const CardHeader = ({ 
  children, 
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Body Component
 */
const CardBody = ({ 
  children, 
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`px-6 py-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Footer Component
 */
const CardFooter = ({ 
  children, 
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Title Component
 */
const CardTitle = ({ 
  children, 
  className = '',
  ...props
}) => {
  return (
    <h3 
      className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

/**
 * Card Description Component
 */
const CardDescription = ({ 
  children, 
  className = '',
  ...props
}) => {
  return (
    <p 
      className={`text-gray-600 dark:text-gray-400 text-sm mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

// Export all components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;