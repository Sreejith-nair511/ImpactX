/**
 * Skills service for managing user skills and expertise
 */

import api from './apiClient';

/**
 * Get user skills
 * @param {string} userId - User ID
 * @returns {Promise<Array>} User skills
 */
export const getUserSkills = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/skills`);
    return response.skills || [];
  } catch (error) {
    console.error('Error fetching user skills:', error);
    throw error;
  }
};

/**
 * Add a new skill
 * @param {object} skillData - Skill data
 * @returns {Promise<object>} Added skill
 */
export const addSkill = async (skillData) => {
  try {
    const response = await api.post('/users/skills', skillData);
    return response;
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
};

/**
 * Update a skill
 * @param {string} skillId - Skill ID
 * @param {object} skillData - Updated skill data
 * @returns {Promise<object>} Updated skill
 */
export const updateSkill = async (skillId, skillData) => {
  try {
    const response = await api.put(`/users/skills/${skillId}`, skillData);
    return response;
  } catch (error) {
    console.error('Error updating skill:', error);
    throw error;
  }
};

/**
 * Remove a skill
 * @param {string} skillId - Skill ID
 * @returns {Promise<object>} Remove response
 */
export const removeSkill = async (skillId) => {
  try {
    const response = await api.delete(`/users/skills/${skillId}`);
    return response;
  } catch (error) {
    console.error('Error removing skill:', error);
    throw error;
  }
};

/**
 * Get skill categories
 * @returns {Promise<Array>} Skill categories
 */
export const getSkillCategories = async () => {
  try {
    const response = await api.get('/skills/categories');
    return response.categories || [];
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    throw error;
  }
};

/**
 * Search skills
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Search results
 */
export const searchSkills = async (query, options = {}) => {
  try {
    const response = await api.get('/skills/search', {
      params: {
        q: query,
        ...options
      }
    });
    return response.skills || [];
  } catch (error) {
    console.error('Error searching skills:', error);
    throw error;
  }
};

/**
 * Get popular skills
 * @param {object} options - Query options
 * @returns {Promise<Array>} Popular skills
 */
export const getPopularSkills = async (options = {}) => {
  try {
    const response = await api.get('/skills/popular', {
      params: options
    });
    return response.skills || [];
  } catch (error) {
    console.error('Error fetching popular skills:', error);
    throw error;
  }
};

/**
 * Get skill suggestions
 * @param {string} query - Search query
 * @returns {Promise<Array>} Skill suggestions
 */
export const getSkillSuggestions = async (query) => {
  try {
    const response = await api.get('/skills/suggestions', {
      params: { q: query }
    });
    return response.suggestions || [];
  } catch (error) {
    console.error('Error fetching skill suggestions:', error);
    throw error;
  }
};

/**
 * Get user skill endorsements
 * @param {string} userId - User ID
 * @param {string} skillId - Skill ID
 * @returns {Promise<Array>} Skill endorsements
 */
export const getSkillEndorsements = async (userId, skillId) => {
  try {
    const response = await api.get(`/users/${userId}/skills/${skillId}/endorsements`);
    return response.endorsements || [];
  } catch (error) {
    console.error('Error fetching skill endorsements:', error);
    throw error;
  }
};

/**
 * Add skill endorsement
 * @param {string} userId - User ID
 * @param {string} skillId - Skill ID
 * @returns {Promise<object>} Endorsement response
 */
export const addSkillEndorsement = async (userId, skillId) => {
  try {
    const response = await api.post(`/users/${userId}/skills/${skillId}/endorsements`);
    return response;
  } catch (error) {
    console.error('Error adding skill endorsement:', error);
    throw error;
  }
};

/**
 * Remove skill endorsement
 * @param {string} userId - User ID
 * @param {string} skillId - Skill ID
 * @param {string} endorsementId - Endorsement ID
 * @returns {Promise<object>} Remove response
 */
export const removeSkillEndorsement = async (userId, skillId, endorsementId) => {
  try {
    const response = await api.delete(`/users/${userId}/skills/${skillId}/endorsements/${endorsementId}`);
    return response;
  } catch (error) {
    console.error('Error removing skill endorsement:', error);
    throw error;
  }
};

/**
 * Get skill proficiency levels
 * @returns {Promise<Array>} Proficiency levels
 */
export const getProficiencyLevels = async () => {
  try {
    const response = await api.get('/skills/proficiency-levels');
    return response.levels || [];
  } catch (error) {
    console.error('Error fetching proficiency levels:', error);
    throw error;
  }
};

/**
 * Get skill verification status
 * @param {string} userId - User ID
 * @param {string} skillId - Skill ID
 * @returns {Promise<object>} Verification status
 */
export const getSkillVerification = async (userId, skillId) => {
  try {
    const response = await api.get(`/users/${userId}/skills/${skillId}/verification`);
    return response;
  } catch (error) {
    console.error('Error fetching skill verification:', error);
    throw error;
  }
};

/**
 * Request skill verification
 * @param {string} userId - User ID
 * @param {string} skillId - Skill ID
 * @param {object} verificationData - Verification data
 * @returns {Promise<object>} Verification request response
 */
export const requestSkillVerification = async (userId, skillId, verificationData) => {
  try {
    const response = await api.post(`/users/${userId}/skills/${skillId}/verification`, verificationData);
    return response;
  } catch (error) {
    console.error('Error requesting skill verification:', error);
    throw error;
  }
};

// Default export
export default {
  getUserSkills,
  addSkill,
  updateSkill,
  removeSkill,
  getSkillCategories,
  searchSkills,
  getPopularSkills,
  getSkillSuggestions,
  getSkillEndorsements,
  addSkillEndorsement,
  removeSkillEndorsement,
  getProficiencyLevels,
  getSkillVerification,
  requestSkillVerification
};