import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircleIcon, 
  ChevronDownIcon, 
  CogIcon, 
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import { useThemePreferences } from '../../hooks/usePreferences';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, updateTheme } = useThemePreferences();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
          <UserCircleIcon className="h-6 w-6 text-white" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">John Doe</p>
          <p className="text-xs text-blue-200">Donor</p>
        </div>
        <ChevronDownIcon className="h-4 w-4 text-blue-200 hidden md:block" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <UserCircleIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-blue-200">john.doe@example.com</p>
                </div>
              </div>
            </div>
            
            <div className="py-2">
              <a 
                href="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <UserCircleIcon className="h-5 w-5 mr-3 text-gray-500" />
                Profile
              </a>
              
              <a 
                href="/settings" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <CogIcon className="h-5 w-5 mr-3 text-gray-500" />
                Settings
              </a>
              
              <button
                onClick={toggleTheme}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                {theme === 'dark' ? (
                  <>
                    <SunIcon className="h-5 w-5 mr-3 text-gray-500" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-5 w-5 mr-3 text-gray-500" />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
            
            <div className="border-t border-gray-200 py-2">
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-500" />
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default UserProfile;