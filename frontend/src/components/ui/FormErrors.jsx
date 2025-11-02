import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const FormErrors = ({ 
  errors = {}, 
  className = '',
  showFieldNames = true,
  variant = 'list' // 'list' or 'summary'
}) => {
  const errorKeys = Object.keys(errors);
  
  if (errorKeys.length === 0) {
    return null;
  }

  if (variant === 'summary') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 p-4 ${className}`}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              There {errorKeys.length === 1 ? 'is' : 'are'} {errorKeys.length} validation error{errorKeys.length !== 1 ? 's' : ''}
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              <ul className="list-disc pl-5 space-y-1">
                {errorKeys.map((fieldName) => (
                  <li key={fieldName}>
                    {showFieldNames ? `${fieldName}: ${errors[fieldName]}` : errors[fieldName]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`space-y-2 ${className}`}
    >
      {errorKeys.map((fieldName) => (
        <motion.div
          key={fieldName}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 p-3"
        >
          <ExclamationCircleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
          <div className="ml-3 text-sm text-red-700 dark:text-red-300">
            {showFieldNames ? (
              <span>
                <span className="font-medium">{fieldName}:</span> {errors[fieldName]}
              </span>
            ) : (
              errors[fieldName]
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Individual field error component
FormErrors.Field = ({ 
  error, 
  fieldName,
  className = '',
  showFieldName = true
}) => {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 p-2 ${className}`}
    >
      <ExclamationCircleIcon className="h-4 w-4 text-red-400 flex-shrink-0" />
      <div className="ml-2 text-xs text-red-700 dark:text-red-300">
        {showFieldName ? (
          <span>
            <span className="font-medium">{fieldName}:</span> {error}
          </span>
        ) : (
          error
        )}
      </div>
    </motion.div>
  );
};

export default FormErrors;