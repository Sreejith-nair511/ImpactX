import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ 
  id, 
  title, 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  show = true,
  actions = [],
  persistent = false,
  progress = false
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  
  const typeStyles = {
    success: {
      container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30',
      icon: 'text-green-500 dark:text-green-400',
      title: 'text-green-800 dark:text-green-200',
      message: 'text-green-700 dark:text-green-300',
      progress: 'bg-green-500'
    },
    error: {
      container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30',
      icon: 'text-red-500 dark:text-red-400',
      title: 'text-red-800 dark:text-red-200',
      message: 'text-red-700 dark:text-red-300',
      progress: 'bg-red-500'
    },
    warning: {
      container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900/30',
      icon: 'text-yellow-500 dark:text-yellow-400',
      title: 'text-yellow-800 dark:text-yellow-200',
      message: 'text-yellow-700 dark:text-yellow-300',
      progress: 'bg-yellow-500'
    },
    info: {
      container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30',
      icon: 'text-blue-500 dark:text-blue-400',
      title: 'text-blue-800 dark:text-blue-200',
      message: 'text-blue-700 dark:text-blue-300',
      progress: 'bg-blue-500'
    }
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  const styles = typeStyles[type];

  // Handle auto-dismiss timer
  useEffect(() => {
    if (!persistent && duration > 0 && !isPaused) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 100) {
            if (onClose) onClose(id);
            return 0;
          }
          return prev - 100;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [duration, id, onClose, persistent, isPaused]);

  // Reset timer when notification becomes visible
  useEffect(() => {
    if (show) {
      setTimeLeft(duration);
    }
  }, [show, duration]);

  if (!show) return null;

  const progressPercentage = duration > 0 ? (timeLeft / duration) * 100 : 0;

  const handleActionClick = (action) => {
    if (action.onClick) {
      action.onClick(id);
    }
    if (!action.keepOpen && onClose) {
      onClose(id);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className={`border rounded-lg p-4 mb-4 relative ${styles.container}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Progress bar */}
        {progress && !persistent && duration > 0 && (
          <div className="absolute top-0 left-0 right-0 h-1">
            <motion.div
              className={`h-full ${styles.progress}`}
              initial={{ width: '100%' }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}
        
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${styles.icon}`}>
            {icons[type]}
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <h4 className={`text-sm font-medium ${styles.title}`}>
                {title}
              </h4>
            )}
            {message && (
              <p className={`mt-1 text-sm ${styles.message}`}>
                {message}
              </p>
            )}
            
            {/* Actions */}
            {actions && actions.length > 0 && (
              <div className="mt-3 flex space-x-2">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleActionClick(action)}
                    className={`text-xs px-2 py-1 rounded ${
                      action.type === 'primary' 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex space-x-2">
            {/* Persistent toggle */}
            {duration > 0 && (
              <button
                onClick={() => {
                  if (persistent) {
                    // Re-enable timer
                    setIsPaused(false);
                  }
                  // Toggle persistent state
                  // This would need to be handled by parent component in a real implementation
                }}
                className={`${styles.icon} hover:opacity-75`}
                aria-label={persistent ? "Allow auto-dismiss" : "Keep notification"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {persistent ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  )}
                </svg>
              </button>
            )}
            
            {/* Close button */}
            <button
              onClick={() => onClose && onClose(id)}
              className={`${styles.icon} hover:opacity-75`}
              aria-label="Close notification"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;