import React, { useState } from 'react';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import { Trash2, Save, Send, AlertTriangle } from 'lucide-react';

const ConfirmationDemo = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [actionResult, setActionResult] = useState('');

  const handleDelete = () => {
    setActionResult('Item deleted successfully!');
    setTimeout(() => setActionResult(''), 3000);
  };

  const handleSave = () => {
    setActionResult('Changes saved successfully!');
    setTimeout(() => setActionResult(''), 3000);
  };

  const handleSend = () => {
    setActionResult('Document sent successfully!');
    setTimeout(() => setActionResult(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Confirmation Dialog Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This page demonstrates the confirmation dialog component with various configurations and use cases.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
              <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Delete Action</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Confirm before deleting important data
            </p>
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Delete Item
            </button>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Save className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Save Action</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Confirm before saving important changes
            </p>
            <button
              onClick={() => setIsSaveDialogOpen(true)}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Send Action</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Confirm before sending important documents
            </p>
            <button
              onClick={() => setIsSendDialogOpen(true)}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Send Document
            </button>
          </div>
        </div>
        
        {actionResult && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  {actionResult}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How it works</h2>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Click any button above to open a confirmation dialog</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Press Escape key or click outside to cancel</span>
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
          To use the confirmation dialog in your components:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {`import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import { useState } from 'react';

const MyComponent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleConfirm = () => {
    // Perform the action
    console.log('Action confirmed');
  };
  
  return (
    <div>
      <button onClick={() => setIsDialogOpen(true)}>
        Delete Item
      </button>
      
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
};`}
        </pre>
      </div>
      
      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
      
      <ConfirmationDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onConfirm={handleSave}
        title="Save Changes"
        message="Are you sure you want to save these changes? Some data may be overwritten."
        confirmText="Save"
        cancelText="Cancel"
        confirmButtonClass="bg-blue-600 hover:bg-blue-700"
      />
      
      <ConfirmationDialog
        isOpen={isSendDialogOpen}
        onClose={() => setIsSendDialogOpen(false)}
        onConfirm={handleSend}
        title="Send Document"
        message="Are you sure you want to send this document? The recipient will receive it immediately."
        confirmText="Send"
        cancelText="Cancel"
        confirmButtonClass="bg-green-600 hover:bg-green-700"
      />
    </div>
  );
};

export default ConfirmationDemo;