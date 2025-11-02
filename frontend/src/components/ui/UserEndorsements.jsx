import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UserCard from './UserCard';

const UserEndorsements = ({ 
  userId, 
  endorsements = [], 
  showAddButton = false, 
  onAddEndorsement,
  className = '' 
}) => {
  const [showEndorsementForm, setShowEndorsementForm] = useState(false);
  const [endorsementText, setEndorsementText] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Group endorsements by skill
  const groupedEndorsements = endorsements.reduce((acc, endorsement) => {
    const skillId = endorsement.skillId;
    if (!acc[skillId]) {
      acc[skillId] = {
        skill: endorsement.skill,
        endorsements: []
      };
    }
    acc[skillId].endorsements.push(endorsement);
    return acc;
  }, {});

  // Handle adding endorsement
  const handleAddEndorsement = () => {
    if (!endorsementText.trim() || selectedSkills.length === 0) return;
    
    if (onAddEndorsement) {
      onAddEndorsement({
        text: endorsementText.trim(),
        skills: selectedSkills
      });
    }
    
    setEndorsementText('');
    setSelectedSkills([]);
    setShowEndorsementForm(false);
  };

  // Toggle skill selection
  const toggleSkillSelection = (skillId) => {
    setSelectedSkills(prev => 
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Endorsements
        </h2>
        {showAddButton && (
          <button
            onClick={() => setShowEndorsementForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Endorsement
          </button>
        )}
      </div>

      {/* Empty state */}
      {Object.keys(groupedEndorsements).length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No endorsements yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {showAddButton 
              ? 'Be the first to endorse this user\'s skills.' 
              : 'This user hasn\'t received any endorsements yet.'}
          </p>
        </div>
      )}

      {/* Endorsements by skill */}
      {Object.keys(groupedEndorsements).length > 0 && (
        <div className="space-y-8">
          {Object.entries(groupedEndorsements).map(([skillId, group]) => (
            <div key={skillId}>
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {group.skill.name}
                </h3>
                <span className="ml-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full">
                  {group.endorsements.length} {group.endorsements.length === 1 ? 'endorsement' : 'endorsements'}
                </span>
              </div>
              
              <div className="space-y-4">
                {group.endorsements.map((endorsement, index) => (
                  <motion.div
                    key={endorsement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <UserCard 
                          user={endorsement.endorser} 
                          variant="compact" 
                          showActions={false}
                          className="w-48"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          {endorsement.text}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{new Date(endorsement.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Endorsement Modal */}
      {showEndorsementForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Add Endorsement
                </h3>
                <button
                  onClick={() => {
                    setShowEndorsementForm(false);
                    setEndorsementText('');
                    setSelectedSkills([]);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Endorsement Message
                  </label>
                  <textarea
                    value={endorsementText}
                    onChange={(e) => setEndorsementText(e.target.value)}
                    placeholder="Share why you're endorsing this person's skills..."
                    rows={4}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Select Skills to Endorse
                  </label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-40 overflow-y-auto">
                    {endorsements.length > 0 ? (
                      [...new Set(endorsements.map(e => e.skillId))].map(skillId => {
                        const skill = endorsements.find(e => e.skillId === skillId)?.skill;
                        return (
                          <div key={skillId} className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`skill-${skillId}`}
                              checked={selectedSkills.includes(skillId)}
                              onChange={() => toggleSkillSelection(skillId)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`skill-${skillId}`} className="ml-2 text-gray-900 dark:text-white">
                              {skill?.name}
                            </label>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-2">
                        No skills available to endorse
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowEndorsementForm(false);
                    setEndorsementText('');
                    setSelectedSkills([]);
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEndorsement}
                  disabled={!endorsementText.trim() || selectedSkills.length === 0}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  Add Endorsement
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserEndorsements;