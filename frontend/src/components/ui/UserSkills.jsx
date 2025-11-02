import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UserSkills = ({ 
  user, 
  skills = [], 
  showEdit = false, 
  onSkillAdd,
  onSkillRemove,
  className = '' 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50,
    category: 'other'
  });
  const [editingSkill, setEditingSkill] = useState(null);

  // Skill categories
  const categories = [
    { key: 'technical', label: 'Technical', icon: '💻' },
    { key: 'design', label: 'Design', icon: '🎨' },
    { key: 'management', label: 'Management', icon: '📋' },
    { key: 'marketing', label: 'Marketing', icon: '📈' },
    { key: 'finance', label: 'Finance', icon: '💰' },
    { key: 'other', label: 'Other', icon: '🔧' }
  ];

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    
    const skill = {
      id: Date.now(),
      ...newSkill,
      name: newSkill.name.trim()
    };
    
    if (onSkillAdd) {
      onSkillAdd(skill);
    }
    
    setNewSkill({
      name: '',
      level: 50,
      category: 'other'
    });
    setShowAddForm(false);
  };

  // Handle updating a skill
  const handleUpdateSkill = () => {
    if (onSkillAdd && editingSkill) {
      onSkillAdd(editingSkill);
    }
    setEditingSkill(null);
  };

  // Handle removing a skill
  const handleRemoveSkill = (skillId) => {
    if (onSkillRemove) {
      onSkillRemove(skillId);
    }
  };

  // Group skills by category
  const groupedSkills = categories.map(category => ({
    ...category,
    skills: skills.filter(skill => skill.category === category.key)
  })).filter(category => category.skills.length > 0);

  // Get skill level description
  const getLevelDescription = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 30) return 'Beginner';
    return 'Basic';
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Skills & Expertise
        </h2>
        {showEdit && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Skill
          </button>
        )}
      </div>

      {/* Empty state */}
      {skills.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No skills added yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {showEdit 
              ? 'Add your skills to showcase your expertise.' 
              : 'This user hasn\'t added any skills yet.'}
          </p>
        </div>
      )}

      {/* Skills by category */}
      {groupedSkills.length > 0 && (
        <div className="space-y-8">
          {groupedSkills.map((category) => (
            <div key={category.key}>
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{category.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.label}
                </h3>
                <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                  {category.skills.length}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    whileHover={{ y: -2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {skill.name}
                      </h4>
                      {showEdit && (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Edit skill"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleRemoveSkill(skill.id)}
                            className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Remove skill"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span>{getLevelDescription(skill.level)}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          className="bg-indigo-600 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {skill.description || 'No description provided'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingSkill(null);
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
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={editingSkill ? editingSkill.name : newSkill.name}
                    onChange={(e) => 
                      editingSkill 
                        ? setEditingSkill({...editingSkill, name: e.target.value})
                        : setNewSkill({...newSkill, name: e.target.value})
                    }
                    placeholder="e.g., React, Project Management, UX Design"
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={editingSkill ? editingSkill.category : newSkill.category}
                    onChange={(e) => 
                      editingSkill 
                        ? setEditingSkill({...editingSkill, category: e.target.value})
                        : setNewSkill({...newSkill, category: e.target.value})
                    }
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.key} value={category.key}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Proficiency Level: {editingSkill ? editingSkill.level : newSkill.level}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingSkill ? editingSkill.level : newSkill.level}
                    onChange={(e) => 
                      editingSkill 
                        ? setEditingSkill({...editingSkill, level: parseInt(e.target.value)})
                        : setNewSkill({...newSkill, level: parseInt(e.target.value)})
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={editingSkill ? (editingSkill.description || '') : (newSkill.description || '')}
                    onChange={(e) => 
                      editingSkill 
                        ? setEditingSkill({...editingSkill, description: e.target.value})
                        : setNewSkill({...newSkill, description: e.target.value})
                    }
                    placeholder="Describe your experience with this skill..."
                    rows={3}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingSkill(null);
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingSkill ? handleUpdateSkill : handleAddSkill}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingSkill ? 'Update' : 'Add Skill'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserSkills;