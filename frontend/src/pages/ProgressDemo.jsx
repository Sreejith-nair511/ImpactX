import React, { useState, useEffect } from 'react';
import ProgressBar from '../components/ui/ProgressBar';

const ProgressDemo = () => {
  const [progress, setProgress] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Simulate progress animation
  useEffect(() => {
    if (animatedProgress < 100) {
      const timer = setTimeout(() => {
        setAnimatedProgress(prev => Math.min(prev + 1, 100));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [animatedProgress]);

  // Simulate file upload
  const simulateUpload = () => {
    if (isUploading) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const resetProgress = () => {
    setProgress(0);
    setAnimatedProgress(0);
    setUploadProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Progress Bar Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This page demonstrates the progress bar component with various colors, sizes, and use cases.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Colors</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Primary</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">45%</span>
                </div>
                <ProgressBar value={45} max={100} color="primary" showPercentage={false} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Success</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">75%</span>
                </div>
                <ProgressBar value={75} max={100} color="success" showPercentage={false} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Warning</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">30%</span>
                </div>
                <ProgressBar value={30} max={100} color="warning" showPercentage={false} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Error</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">90%</span>
                </div>
                <ProgressBar value={90} max={100} color="error" showPercentage={false} />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sizes</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Small</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">60%</span>
                </div>
                <ProgressBar value={60} max={100} size="sm" showPercentage={false} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Medium</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">60%</span>
                </div>
                <ProgressBar value={60} max={100} size="md" showPercentage={false} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Large</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">60%</span>
                </div>
                <ProgressBar value={60} max={100} size="lg" showPercentage={false} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Demo</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Controlled Progress</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
              </div>
              <ProgressBar value={progress} max={100} color="indigo" showPercentage={true} />
              
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white rounded-md text-sm"
                >
                  -10%
                </button>
                <button
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white rounded-md text-sm"
                >
                  +10%
                </button>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Animated Progress</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{animatedProgress}%</span>
              </div>
              <ProgressBar value={animatedProgress} max={100} color="purple" showPercentage={true} />
              
              <button
                onClick={() => setAnimatedProgress(0)}
                className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
              >
                Restart Animation
              </button>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">File Upload Simulation</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{uploadProgress}%</span>
              </div>
              <ProgressBar value={uploadProgress} max={100} color="success" showPercentage={true} />
              
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={simulateUpload}
                  disabled={isUploading}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    isUploading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {isUploading ? 'Uploading...' : 'Start Upload'}
                </button>
                <button
                  onClick={resetProgress}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white rounded-lg text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Task Completion</h3>
              <ProgressBar value={3} max={5} color="primary" showPercentage={true} />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">3 of 5 tasks completed</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Download Progress</h3>
              <ProgressBar value={750} max={1000} color="success" showPercentage={true} />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">750MB of 1000MB</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Form Completion</h3>
              <ProgressBar value={4} max={7} color="warning" showPercentage={true} />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">4 of 7 fields filled</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          To use the progress bar component in your components:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {`import ProgressBar from '../components/ui/ProgressBar';

// Basic usage
<ProgressBar value={50} max={100} />

// With color and size
<ProgressBar value={75} max={100} color="success" size="lg" />

// With percentage display
<ProgressBar value={30} max={100} showPercentage={true} />

// Custom range
<ProgressBar value={3} max={5} showPercentage={true} />`}
        </pre>
      </div>
    </div>
  );
};

export default ProgressDemo;