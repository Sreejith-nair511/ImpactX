import React from 'react';
import { User, MapPin, Calendar, Users, Folder, CheckCircle, Heart, MessageCircle } from 'lucide-react';
import ActivityFeed from '../components/ui/ActivityFeed';
import UserPortfolio from '../components/ui/UserPortfolio';
import UserSkills from '../components/ui/UserSkills';
import UserAchievements from '../components/ui/UserAchievements';
import UserConnections from '../components/ui/UserConnections';
import './UserActivityProfile.css';

/**
 * User Activity Profile Page
 * Comprehensive user profile with activity feed and portfolio
 */
const UserActivityProfile = () => {
  // In a real application, this would come from auth context or API
  const userId = 'user-123'; // Mock user ID
  const user = {
    id: userId,
    name: 'Alex Johnson',
    username: '@alexj',
    email: 'alex.johnson@example.com',
    location: 'Bangalore, India',
    bio: 'Passionate about creating positive social impact through technology. Working on disaster relief projects with ImpactX.',
    joinDate: '2023-01-15',
    followers: 1242,
    following: 356,
    projects: 24,
    tasksCompleted: 89
  };
  
  const skills = [
    { id: 1, name: 'React', level: 90 },
    { id: 2, name: 'Node.js', level: 85 },
    { id: 3, name: 'UI/UX Design', level: 75 },
    { id: 4, name: 'Project Management', level: 80 },
    { id: 5, name: 'Data Analysis', level: 70 }
  ];
  
  const achievements = [
    { id: 1, title: 'Top Contributor', description: 'Completed 50+ tasks', date: '2024-03-15' },
    { id: 2, title: 'Team Player', description: 'Collaborated on 10+ projects', date: '2024-01-22' },
    { id: 3, title: 'Innovator', description: 'Submitted 5 innovative solutions', date: '2023-11-30' }
  ];
  
  const projects = [
    { id: 1, name: 'Flood Relief Dashboard', description: 'Real-time dashboard for flood relief efforts', status: 'active' },
    { id: 2, name: 'Earthquake Response App', description: 'Mobile app for earthquake response coordination', status: 'completed' },
    { id: 3, name: 'Disaster Prediction Model', description: 'ML model for disaster prediction', status: 'in-progress' }
  ];
  
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-banner">
          <div className="profile-avatar">
            <User size={48} />
          </div>
        </div>
        
        <div className="profile-info">
          <div className="profile-info-content">
            <h1>{user.name}</h1>
            <p className="username">{user.username}</p>
            <p className="bio">{user.bio}</p>
            
            <div className="profile-details">
              <div className="detail-item">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
              <div className="detail-item">
                <Calendar size={16} />
                <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <Users size={20} />
                <div>
                  <span className="stat-value">{user.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
              </div>
              <div className="stat-item">
                <Folder size={20} />
                <div>
                  <span className="stat-value">{user.projects}</span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
              <div className="stat-item">
                <CheckCircle size={20} />
                <div>
                  <span className="stat-value">{user.tasksCompleted}</span>
                  <span className="stat-label">Tasks Done</span>
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="btn-primary">Follow</button>
              <button className="btn-secondary">Message</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-section">
            <h3>Skills</h3>
            <UserSkills userId={userId} skills={skills} />
          </div>
          
          <div className="profile-section">
            <h3>Achievements</h3>
            <UserAchievements userId={userId} achievements={achievements} />
          </div>
          
          <div className="profile-section">
            <h3>Connections</h3>
            <UserConnections userId={userId} type="followers" limit={5} />
          </div>
        </div>
        
        <div className="profile-main">
          <div className="profile-section">
            <h3>Activity Feed</h3>
            <ActivityFeed userId={userId} limit={10} />
          </div>
          
          <div className="profile-section">
            <h3>Portfolio</h3>
            <UserPortfolio userId={userId} projects={projects} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivityProfile;