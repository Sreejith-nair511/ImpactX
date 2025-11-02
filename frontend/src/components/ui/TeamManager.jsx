import React, { useState } from 'react';
import { Users, Plus, MoreHorizontal, Check, X } from 'lucide-react';
import useCollaboration from '../../hooks/useCollaboration';
import './TeamManager.css';

/**
 * Team Manager Component
 * Comprehensive team management interface
 */
const TeamManager = ({ userId, className = '' }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  
  const {
    teams,
    invitations,
    loading,
    error,
    createTeam,
    acceptInvitation,
    declineInvitation
  } = useCollaboration(userId);
  
  // Handle creating a new team
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    
    try {
      await createTeam({
        name: newTeamName,
        description: newTeamDescription,
        ownerId: userId
      });
      
      setNewTeamName('');
      setNewTeamDescription('');
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating team:', err);
    }
  };
  
  // Format member count
  const formatMemberCount = (count) => {
    if (count === 1) return '1 member';
    return `${count} members`;
  };
  
  if (!userId) {
    return <div className="team-manager__error">User ID is required</div>;
  }
  
  return (
    <div className={`team-manager ${className}`}>
      <div className="team-manager__header">
        <h2>Teams</h2>
        
        <button
          className="team-manager__add-btn"
          onClick={() => setShowCreateForm(true)}
          aria-label="Create new team"
        >
          <Plus size={16} />
          Create Team
        </button>
      </div>
      
      {showCreateForm && (
        <div className="team-manager__create-form">
          <form onSubmit={handleCreateTeam}>
            <h3>Create New Team</h3>
            
            <div className="form-group">
              <label htmlFor="team-name">Team Name</label>
              <input
                id="team-name"
                type="text"
                placeholder="Enter team name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                required
                autoFocus
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="team-description">Description</label>
              <textarea
                id="team-description"
                placeholder="Enter team description"
                value={newTeamDescription}
                onChange={(e) => setNewTeamDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="team-manager__form-actions">
              <button type="submit">Create Team</button>
              <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      
      {invitations.length > 0 && (
        <div className="team-manager__section">
          <h3>Team Invitations</h3>
          
          <div className="invitations-list">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="invitation-item">
                <div className="invitation-item__content">
                  <h4>{invitation.team.name}</h4>
                  <p>{invitation.team.description}</p>
                  <div className="invitation-item__meta">
                    <span className="invitation-item__members">
                      <Users size={14} />
                      {formatMemberCount(invitation.team.memberCount || 0)}
                    </span>
                  </div>
                </div>
                
                <div className="invitation-item__actions">
                  <button
                    className="btn-accept"
                    onClick={() => acceptInvitation(invitation.id)}
                    aria-label={`Accept invitation to ${invitation.team.name}`}
                  >
                    <Check size={16} />
                    Accept
                  </button>
                  <button
                    className="btn-decline"
                    onClick={() => declineInvitation(invitation.id)}
                    aria-label={`Decline invitation to ${invitation.team.name}`}
                  >
                    <X size={16} />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="team-manager__section">
        <h3>Your Teams</h3>
        
        {loading && (
          <div className="team-manager__loading">
            Loading teams...
          </div>
        )}
        
        {error && (
          <div className="team-manager__error">
            Error loading teams: {error}
          </div>
        )}
        
        {!loading && !error && teams.length === 0 && (
          <div className="team-manager__empty">
            You're not part of any teams yet. Create a new team or wait for an invitation.
          </div>
        )}
        
        {!loading && !error && teams.length > 0 && (
          <div className="teams-grid">
            {teams.map((team) => (
              <div key={team.id} className="team-card">
                <div className="team-card__header">
                  <h4>{team.name}</h4>
                  <button className="team-card__menu" aria-label={`Team options for ${team.name}`}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                
                <p className="team-card__description">
                  {team.description}
                </p>
                
                <div className="team-card__meta">
                  <span className="team-card__members">
                    <Users size={14} />
                    {formatMemberCount(team.memberCount || team.members?.length || 0)}
                  </span>
                  
                  {team.role && (
                    <span className="team-card__role">
                      {team.role}
                    </span>
                  )}
                </div>
                
                <div className="team-card__actions">
                  <button className="btn-view">View Team</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManager;