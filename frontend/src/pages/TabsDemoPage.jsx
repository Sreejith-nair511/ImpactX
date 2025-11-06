import React, { useState } from 'react';
import { useTabs } from '../hooks/useTabs';
import TabbedContentSection from '../components/ui/TabbedContentSection';
import MobileTabs from '../components/ui/MobileTabs';
import { User, Settings, Bell, HelpCircle, Database, BarChart2, Shield, Globe } from 'lucide-react';

const TabsDemoPage = () => {
  // Example tab data
  const profileTabs = [
    {
      title: 'Profile',
      icon: User,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">User Profile</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your personal information, profile picture, and contact details.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Personal Information</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Name, email, phone number, and address
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Profile Picture</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload and manage your profile image
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Settings',
      icon: Settings,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your account preferences and default settings.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email updates about your account
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium">Dark Mode</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enable dark theme for better viewing
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" name="toggle2" id="toggle2" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-500 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Notifications',
      icon: Bell,
      count: 3,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Choose how and when you want to be notified.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { title: 'Project Updates', description: 'Get notified about project progress', enabled: true },
              { title: 'Team Messages', description: 'Receive messages from team members', enabled: true },
              { title: 'System Alerts', description: 'Important system notifications', enabled: false }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name={`notification-${index}`} 
                    id={`notification-${index}`} 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    defaultChecked={item.enabled}
                  />
                  <label 
                    htmlFor={`notification-${index}`} 
                    className={`toggle-label block overflow-hidden h-6 rounded-full ${item.enabled ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer`}
                  ></label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  const systemTabs = [
    {
      title: 'Analytics',
      icon: BarChart2,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">System Analytics</h3>
          <p className="text-gray-600 dark:text-gray-300">
            View system performance metrics and usage statistics.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Uptime</h4>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">99.9%</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Response Time</h4>
              <p className="text-2xl font-bold text-green-600 dark:text-green-300">120ms</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Active Users</h4>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">1,248</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Security',
      icon: Shield,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Manage security preferences and authentication methods.
          </p>
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Add an extra layer of security to your account
              </p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
                Enable 2FA
              </button>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium mb-2">Login History</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                View recent login attempts and locations
              </p>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                View History
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Integrations',
      icon: Globe,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Third-Party Integrations</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Connect your account with external services and platforms.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Google Drive', connected: true },
              { name: 'Slack', connected: false },
              { name: 'GitHub', connected: true },
              { name: 'Zoom', connected: false }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium">{service.name}</span>
                {service.connected ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
                ) : (
                  <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors">
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tabs Component Demo</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Showcase of enhanced tab functionality with animations, lazy loading, and persistence
        </p>
      </div>

      <div className="space-y-8">
        <TabbedContentSection
          title="User Profile Management"
          tabs={profileTabs}
          defaultActiveTab={0}
          variant="default"
        />

        <TabbedContentSection
          title="System Configuration"
          tabs={systemTabs}
          defaultActiveTab={0}
          variant="boxed"
        />
        
        <div className="tabbed-content-section">
          <div className="tabbed-content-header">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mobile Optimized Tabs</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <MobileTabs 
              tabs={profileTabs}
              defaultActiveTab={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsDemoPage;