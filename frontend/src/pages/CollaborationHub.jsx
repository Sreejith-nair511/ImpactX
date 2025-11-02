import React from 'react';
import CollaborationDashboard from '../components/ui/CollaborationDashboard';

/**
 * Collaboration Hub Page
 * Main page for the collaboration dashboard
 */
const CollaborationHub = () => {
  // In a real application, this would come from auth context
  const userId = 'user-123'; // Mock user ID
  
  return (
    <div className="collaboration-hub">
      <div className="page-header">
        <h1>Collaboration Hub</h1>
        <p>Manage your tasks, teams, and notifications in one place</p>
      </div>
      
      <CollaborationDashboard userId={userId} />
    </div>
  );
};

export default CollaborationHub;