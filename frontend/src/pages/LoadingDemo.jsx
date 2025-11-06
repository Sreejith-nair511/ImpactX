import React, { useState } from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const LoadingDemo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = (duration) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, duration);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Loading Spinner Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This page demonstrates the loading spinner component with various sizes, colors, and configurations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Spinner Sizes</h2>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <LoadingSpinner size="sm" className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Small Spinner</span>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <LoadingSpinner size="md" className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Medium Spinner</span>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <LoadingSpinner size="lg" className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Large Spinner</span>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <LoadingSpinner size="xl" className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Extra Large Spinner</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Spinner Colors</h2>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <LoadingSpinner color="primary" className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Primary Color</span>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <LoadingSpinner color="secondary" className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Secondary Color</span>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <LoadingSpinner color="success" className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Success Color</span>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <LoadingSpinner color="warning" className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Warning Color</span>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <LoadingSpinner color="error" className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Error Color</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Interactive Demo</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Click the buttons below to see the loading spinner in action.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => simulateLoading(2000)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Load for 2 seconds
          </button>
          
          <button
            onClick={() => simulateLoading(5000)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Load for 5 seconds
          </button>
          
          <button
            onClick={() => simulateLoading(10000)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Load for 10 seconds
          </button>
        </div>
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <LoadingSpinner size="lg" fullScreen={false} message="Loading..." />
            <p className="mt-4 text-gray-700 dark:text-gray-300">Loading content, please wait...</p>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          To use the loading spinner in your components:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {`import LoadingSpinner from '../components/ui/LoadingSpinner';

// Simple spinner
<LoadingSpinner />

// With custom size and color
<LoadingSpinner size="lg" color="success" />

// Full screen spinner with message
<LoadingSpinner fullScreen={true} message="Loading..." />

// Inline spinner with custom class
<LoadingSpinner className="mr-2" />`}
        </pre>
      </div>
    </div>
  );
};

export default LoadingDemo;