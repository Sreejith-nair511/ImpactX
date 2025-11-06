import React from 'react';
import Badge from '../components/ui/Badge';
import { CheckCircle, Clock, AlertCircle, XCircle, Info, User, Calendar, Tag } from 'lucide-react';

const BadgeDemo = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Badge Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This page demonstrates the badge component with various variants, sizes, and use cases.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Variants</h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">
                  <span>Primary</span>
                </Badge>
                <Badge variant="secondary">
                  <span>Secondary</span>
                </Badge>
                <Badge variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span>Success</span>
                </Badge>
                <Badge variant="warning">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Warning</span>
                </Badge>
                <Badge variant="error">
                  <XCircle className="h-3 w-3 mr-1" />
                  <span>Error</span>
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">
                  <Info className="h-3 w-3 mr-1" />
                  <span>Info</span>
                </Badge>
                <Badge variant="purple">
                  <Tag className="h-3 w-3 mr-1" />
                  <span>Purple</span>
                </Badge>
                <Badge variant="pink">
                  <User className="h-3 w-3 mr-1" />
                  <span>Pink</span>
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sizes</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge size="sm" variant="primary">
                  <span>Small</span>
                </Badge>
                <Badge size="sm" variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span>Completed</span>
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge size="md" variant="primary">
                  <span>Medium</span>
                </Badge>
                <Badge size="md" variant="warning">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>In Progress</span>
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge size="lg" variant="primary">
                  <span>Large</span>
                </Badge>
                <Badge size="lg" variant="error">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>Error</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Use Cases</h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Status Indicators</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span>Active</span>
                </Badge>
                <Badge variant="warning">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Pending</span>
                </Badge>
                <Badge variant="error">
                  <XCircle className="h-3 w-3 mr-1" />
                  <span>Inactive</span>
                </Badge>
                <Badge variant="info">
                  <Info className="h-3 w-3 mr-1" />
                  <span>Draft</span>
                </Badge>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Count Indicators</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-300 mr-2">Messages</span>
                  <Badge variant="primary">12</Badge>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-300 mr-2">Notifications</span>
                  <Badge variant="error">5</Badge>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-300 mr-2">Tasks</span>
                  <Badge variant="warning">3</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Category Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="purple">
                  <Tag className="h-3 w-3 mr-1" />
                  <span>Technology</span>
                </Badge>
                <Badge variant="pink">
                  <User className="h-3 w-3 mr-1" />
                  <span>Design</span>
                </Badge>
                <Badge variant="info">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Marketing</span>
                </Badge>
                <Badge variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span>Finance</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Multiple color variants for different contexts</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Three sizes (sm, md, lg) for different use cases</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Works with icons for enhanced visual communication</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Works with all theme modes (light/dark/high contrast)</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fully customizable with additional CSS classes</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          To use the badge component in your components:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {`import Badge from '../components/ui/Badge';

// Basic usage
<Badge>Default</Badge>

// With variant
<Badge variant="success">Success</Badge>

// With size
<Badge size="lg" variant="warning">Large Warning</Badge>

// With icon
<Badge variant="error">
  <XCircle className="h-3 w-3 mr-1" />
  <span>Error</span>
</Badge>

// Available variants: primary, secondary, success, warning, error, info, purple, pink
// Available sizes: sm, md, lg`}
        </pre>
      </div>
    </div>
  );
};

export default BadgeDemo;