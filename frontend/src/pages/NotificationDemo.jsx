import React from 'react';
import { useNotifications } from '../components/NotificationProvider';

const NotificationDemo = () => {
  const { addNotification } = useNotifications();

  const showNotification = (type) => {
    addNotification({
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      message: `This is a ${type} notification message. It will automatically disappear after 5 seconds.`,
      duration: 5000
    });
  };

  const showPersistentNotification = () => {
    addNotification({
      type: 'info',
      title: 'Persistent Notification',
      message: 'This notification will stay until you manually close it.',
      duration: 0 // 0 means it won't auto-close
    });
  };

  const showQuickNotification = () => {
    addNotification({
      type: 'success',
      title: 'Quick Notification',
      message: 'This notification will disappear quickly.',
      duration: 2000
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Notification System Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This page demonstrates the notification system. Click the buttons below to trigger different types of notifications.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notification Types</h2>
            
            <button
              onClick={() => showNotification('info')}
              className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 dark:text-blue-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Info Notification
            </button>
            
            <button
              onClick={() => showNotification('success')}
              className="w-full bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/30 dark:hover:bg-green-800/50 dark:text-green-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Success Notification
            </button>
            
            <button
              onClick={() => showNotification('warning')}
              className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/50 dark:text-yellow-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Warning Notification
            </button>
            
            <button
              onClick={() => showNotification('error')}
              className="w-full bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-red-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Error Notification
            </button>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Special Notifications</h2>
            
            <button
              onClick={showPersistentNotification}
              className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900/30 dark:hover:bg-purple-800/50 dark:text-purple-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
              Persistent Notification
            </button>
            
            <button
              onClick={showQuickNotification}
              className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 dark:text-indigo-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Quick Notification (2s)
            </button>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">How it works</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Notifications appear in the top-right corner</li>
                <li>• They automatically disappear after their duration</li>
                <li>• Users can manually close any notification</li>
                <li>• Multiple notifications stack vertically</li>
                <li>• Works with all theme modes (light/dark/high contrast)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          To use the notification system in your components:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { useNotifications } from '../components/NotificationProvider';

const MyComponent = () => {
  const { addNotification } = useNotifications();
  
  const handleClick = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Your action was completed successfully.',
      duration: 5000
    });
  };
  
  return (
    <button onClick={handleClick}>
      Show Notification
    </button>
  );
};`}
        </pre>
      </div>
    </div>
  );
};

export default NotificationDemo;