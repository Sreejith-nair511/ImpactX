import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowsRightLeftIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  CogIcon,
  UserIcon,
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { getUserActivities, ACTIVITY_TYPES } from '../../services/userActivity';
import { format } from 'date-fns';

const ActivityFeed = ({ limit = 10, showTime = true, className = '' }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const userActivities = getUserActivities().slice(0, limit);
    setActivities(userActivities);
  }, [limit]);

  const getActivityIcon = (type) => {
    switch (type) {
      case ACTIVITY_TYPES.PAGE_VIEW:
        return <EyeIcon className="h-5 w-5" />;
      case ACTIVITY_TYPES.BUTTON_CLICK:
        return <ArrowsRightLeftIcon className="h-5 w-5" />;
      case ACTIVITY_TYPES.SEARCH:
        return <MagnifyingGlassIcon className="h-5 w-5" />;
      case ACTIVITY_TYPES.DONATION:
        return <HeartIcon className="h-5 w-5" />;
      case ACTIVITY_TYPES.SETTINGS_CHANGE:
        return <CogIcon className="h-5 w-5" />;
      case ACTIVITY_TYPES.PROFILE_UPDATE:
        return <UserIcon className="h-5 w-5" />;
      case ACTIVITY_TYPES.FORM_SUBMIT:
        return <DocumentTextIcon className="h-5 w-5" />;
      case ACTIVITY_TYPES.NAVIGATION:
        return <ArrowRightIcon className="h-5 w-5" />;
      default:
        return <EyeIcon className="h-5 w-5" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case ACTIVITY_TYPES.DONATION:
        return 'text-green-500 bg-green-500/10';
      case ACTIVITY_TYPES.BUTTON_CLICK:
        return 'text-blue-500 bg-blue-500/10';
      case ACTIVITY_TYPES.SEARCH:
        return 'text-purple-500 bg-purple-500/10';
      case ACTIVITY_TYPES.SETTINGS_CHANGE:
        return 'text-yellow-500 bg-yellow-500/10';
      case ACTIVITY_TYPES.PROFILE_UPDATE:
        return 'text-indigo-500 bg-indigo-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getActivityText = (activity) => {
    const data = activity.data || {};
    
    switch (activity.type) {
      case ACTIVITY_TYPES.PAGE_VIEW:
        return `Viewed ${data.page || 'a page'}`;
      case ACTIVITY_TYPES.BUTTON_CLICK:
        return `Clicked ${data.buttonName || 'a button'}`;
      case ACTIVITY_TYPES.SEARCH:
        return `Searched for "${data.query || ''}"`;
      case ACTIVITY_TYPES.DONATION:
        return `Donated ${data.amount ? `$${data.amount}` : 'to a project'}`;
      case ACTIVITY_TYPES.SETTINGS_CHANGE:
        return `Changed ${data.settingName || 'a setting'}`;
      case ACTIVITY_TYPES.PROFILE_UPDATE:
        return 'Updated profile information';
      case ACTIVITY_TYPES.FORM_SUBMIT:
        return `Submitted ${data.formName || 'a form'}`;
      case ACTIVITY_TYPES.NAVIGATION:
        return `Navigated from ${data.from || 'previous page'} to ${data.to || 'current page'}`;
      case ACTIVITY_TYPES.PROJECT_VIEW:
        return `Viewed project ${data.projectId || ''}`;
      default:
        return 'Performed an action';
    }
  };

  if (activities.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <EyeIcon className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No recent activity</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your recent actions will appear here
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {activities.map((activity, index) => (
            <motion.li
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="py-4"
            >
              <div className="flex items-center space-x-3">
                <div className={`flex-shrink-0 p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200 truncate">
                    {getActivityText(activity)}
                  </p>
                  {showTime && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                    </p>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityFeed;