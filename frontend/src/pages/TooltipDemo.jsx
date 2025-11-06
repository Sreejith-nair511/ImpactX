import React from 'react';
import Tooltip from '../components/ui/Tooltip';
import { Info, HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';

const TooltipDemo = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tooltip Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This page demonstrates the tooltip component with various positions and use cases.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Position Examples</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Top Tooltip</span>
                <Tooltip content="This tooltip appears above the icon" position="top">
                  <Info className="h-5 w-5 text-gray-500 cursor-help" />
                </Tooltip>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Bottom Tooltip</span>
                <Tooltip content="This tooltip appears below the icon" position="bottom">
                  <HelpCircle className="h-5 w-5 text-gray-500 cursor-help" />
                </Tooltip>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Left Tooltip</span>
                <Tooltip content="This tooltip appears to the left of the icon" position="left">
                  <AlertCircle className="h-5 w-5 text-gray-500 cursor-help" />
                </Tooltip>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Right Tooltip</span>
                <Tooltip content="This tooltip appears to the right of the icon" position="right">
                  <CheckCircle className="h-5 w-5 text-gray-500 cursor-help" />
                </Tooltip>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Use Cases</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Form Field Help</h3>
                  <Tooltip content="Enter your full legal name as it appears on your ID">
                    <Info className="h-4 w-4 text-gray-500 ml-2 cursor-help" />
                  </Tooltip>
                </div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Status Information</h3>
                  <Tooltip content="Your account has been verified and is in good standing">
                    <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                  </Tooltip>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Feature Explanation</h3>
                  <Tooltip content="This feature uses AI to analyze your data and provide insights">
                    <HelpCircle className="h-4 w-4 text-blue-500 ml-2 cursor-help" />
                  </Tooltip>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Analyze Data
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Accessibility Features</h2>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Supports keyboard focus for accessibility</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Works with screen readers using ARIA attributes</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Customizable delay for tooltip appearance</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Works with all theme modes (light/dark/high contrast)</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          To use the tooltip component in your components:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {`import Tooltip from '../components/ui/Tooltip';

// Basic usage
<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>

// With position
<Tooltip content="Tooltip on top" position="top">
  <Info className="h-5 w-5 text-gray-500" />
</Tooltip>

// With custom delay
<Tooltip content="Appears after 500ms" delay={500}>
  <span>Delayed tooltip</span>
</Tooltip>`}
        </pre>
      </div>
    </div>
  );
};

export default TooltipDemo;