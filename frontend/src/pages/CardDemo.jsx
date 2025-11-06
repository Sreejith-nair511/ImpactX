import React from 'react';
import Card from '../components/ui/Card';
import { Heart, Share, Bookmark, User, Calendar, Tag } from 'lucide-react';

const CardDemo = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Card Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This page demonstrates the card component with various variants and compositions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Card Variants</h2>
            
            <div className="space-y-6">
              <Card variant="default">
                <Card.Body>
                  <Card.Title>Default Card</Card.Title>
                  <Card.Description>
                    This is a default card with a clean, minimal design.
                  </Card.Description>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    Default cards have a solid background and no additional styling.
                  </p>
                </Card.Body>
              </Card>
              
              <Card variant="elevated">
                <Card.Body>
                  <Card.Title>Elevated Card</Card.Title>
                  <Card.Description>
                    This card has a shadow for visual elevation.
                  </Card.Description>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    Elevated cards stand out from the background with a shadow effect.
                  </p>
                </Card.Body>
              </Card>
              
              <Card variant="outlined">
                <Card.Body>
                  <Card.Title>Outlined Card</Card.Title>
                  <Card.Description>
                    This card has a border outline.
                  </Card.Description>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    Outlined cards have a subtle border to define their boundaries.
                  </p>
                </Card.Body>
              </Card>
              
              <Card variant="filled">
                <Card.Body>
                  <Card.Title>Filled Card</Card.Title>
                  <Card.Description>
                    This card has a filled background.
                  </Card.Description>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    Filled cards use a slightly different background color for visual distinction.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Card Compositions</h2>
            
            <div className="space-y-6">
              <Card variant="elevated">
                <Card.Header>
                  <Card.Title>Card with Header</Card.Title>
                  <Card.Description>
                    This card has a header section with a border.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <p className="text-gray-700 dark:text-gray-300">
                    The header section is separated by a border for clear visual hierarchy.
                  </p>
                </Card.Body>
              </Card>
              
              <Card variant="elevated">
                <Card.Body>
                  <Card.Title>Card with Footer</Card.Title>
                  <Card.Description>
                    This card has a footer section with actions.
                  </Card.Description>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    The footer section is perfect for action buttons or additional information.
                  </p>
                </Card.Body>
                <Card.Footer>
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Confirm
                    </button>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Real-World Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="elevated">
              <Card.Body>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  </div>
                  <div className="ml-4">
                    <Card.Title>Project Update</Card.Title>
                    <Card.Description>
                      Posted 2 hours ago
                    </Card.Description>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      We've completed the first phase of the disaster relief project. 
                      Over 500 families have received aid so far.
                    </p>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                      <Heart className="h-5 w-5 mr-1" />
                      <span>24</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                      <Share className="h-5 w-5 mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </Card.Footer>
            </Card>
            
            <Card variant="elevated">
              <Card.Header>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10" />
                  </div>
                  <div className="ml-3">
                    <Card.Title className="text-base">Sarah Johnson</Card.Title>
                    <Card.Description>
                      NGO Coordinator
                    </Card.Description>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title>Quarterly Report</Card.Title>
                <Card.Description className="mt-0">
                  Published: June 15, 2025
                </Card.Description>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  Our quarterly impact report shows a 35% increase in successful 
                  project completions compared to last quarter.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    <Tag className="h-3 w-3 mr-1" />
                    Report
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    <Calendar className="h-3 w-3 mr-1" />
                    Q2 2025
                  </span>
                </div>
              </Card.Body>
              <Card.Footer>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  View Full Report
                </button>
              </Card.Footer>
            </Card>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Multiple variants for different use cases (default, elevated, outlined, filled)</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Composable sub-components (Header, Body, Footer, Title, Description)</span>
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
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Accessible with proper semantic HTML structure</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          To use the card component in your components:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {`import Card from '../components/ui/Card';

// Basic usage
<Card>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description text</Card.Description>
    <p className="mt-3">Card content...</p>
  </Card.Body>
</Card>

// With header and footer
<Card variant="elevated">
  <Card.Header>
    <Card.Title>Card with Header</Card.Title>
  </Card.Header>
  <Card.Body>
    <p>Card content...</p>
  </Card.Body>
  <Card.Footer>
    <button>Card Action</button>
  </Card.Footer>
</Card>

// Available variants: default, elevated, outlined, filled`}
        </pre>
      </div>
    </div>
  );
};

export default CardDemo;