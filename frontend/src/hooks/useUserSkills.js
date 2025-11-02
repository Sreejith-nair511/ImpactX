import { useState, useEffect, useCallback } from 'react';
import * as skillsService from '../services/skillsService';

/**
 * Custom hook for managing user skills
 * @param {string} userId - User ID
 * @returns {object} Skills management functions and state
 */
export const useUserSkills = (userId) => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user skills
   */
  const fetchSkills = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await skillsService.getUserSkills(userId);
      setSkills(data);
    } catch (err) {
      setError(err.message || 'Failed to load skills');
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch skill categories
   */
  const fetchCategories = useCallback(async () => {
    try {
      const data = await skillsService.getSkillCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching skill categories:', err);
    }
  }, []);

  /**
   * Add a new skill
   * @param {object} skillData - Skill data
   */
  const addSkill = useCallback(async (skillData) => {
    try {
      const newSkill = await skillsService.addSkill(skillData);
      setSkills(prev => [...prev, newSkill]);
      return newSkill;
    } catch (err) {
      setError(err.message || 'Failed to add skill');
      console.error('Error adding skill:', err);
      throw err;
    }
  }, []);

  /**
   * Update a skill
   * @param {string} skillId - Skill ID
   * @param {object} skillData - Updated skill data
   */
  const updateSkill = useCallback(async (skillId, skillData) => {
    try {
      const updatedSkill = await skillsService.updateSkill(skillId, skillData);
      setSkills(prev => 
        prev.map(skill => 
          skill.id === skillId ? updatedSkill : skill
        )
      );
      return updatedSkill;
    } catch (err) {
      setError(err.message || 'Failed to update skill');
      console.error('Error updating skill:', err);
      throw err;
    }
  }, []);

  /**
   * Remove a skill
   * @param {string} skillId - Skill ID
   */
  const removeSkill = useCallback(async (skillId) => {
    try {
      await skillsService.removeSkill(skillId);
      setSkills(prev => prev.filter(skill => skill.id !== skillId));
    } catch (err) {
      setError(err.message || 'Failed to remove skill');
      console.error('Error removing skill:', err);
      throw err;
    }
  }, []);

  /**
   * Search skills
   * @param {string} query - Search query
   * @param {object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  const searchSkills = useCallback(async (query, options = {}) => {
    try {
      const results = await skillsService.searchSkills(query, options);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search skills');
      console.error('Error searching skills:', err);
      return [];
    }
  }, []);

  /**
   * Get popular skills
   * @param {object} options - Query options
   * @returns {Promise<Array>} Popular skills
   */
  const getPopularSkills = useCallback(async (options = {}) => {
    try {
      const results = await skillsService.getPopularSkills(options);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to fetch popular skills');
      console.error('Error fetching popular skills:', err);
      return [];
    }
  }, []);

  /**
   * Get skill suggestions
   * @param {string} query - Search query
   * @returns {Promise<Array>} Skill suggestions
   */
  const getSkillSuggestions = useCallback(async (query) => {
    try {
      const suggestions = await skillsService.getSkillSuggestions(query);
      return suggestions;
    } catch (err) {
      console.error('Error fetching skill suggestions:', err);
      return [];
    }
  }, []);

  /**
   * Add skill endorsement
   * @param {string} skillId - Skill ID
   */
  const addEndorsement = useCallback(async (skillId) => {
    if (!userId) return;
    
    try {
      const response = await skillsService.addSkillEndorsement(userId, skillId);
      
      // Update local state
      setSkills(prev => 
        prev.map(skill => {
          if (skill.id === skillId) {
            return {
              ...skill,
              endorsements: skill.endorsements ? [...skill.endorsements, response.endorsement] : [response.endorsement],
              endorsementCount: (skill.endorsementCount || 0) + 1
            };
          }
          return skill;
        })
      );
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to add endorsement');
      console.error('Error adding endorsement:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Remove skill endorsement
   * @param {string} skillId - Skill ID
   * @param {string} endorsementId - Endorsement ID
   */
  const removeEndorsement = useCallback(async (skillId, endorsementId) => {
    if (!userId) return;
    
    try {
      await skillsService.removeSkillEndorsement(userId, skillId, endorsementId);
      
      // Update local state
      setSkills(prev => 
        prev.map(skill => {
          if (skill.id === skillId) {
            return {
              ...skill,
              endorsements: skill.endorsements ? skill.endorsements.filter(e => e.id !== endorsementId) : [],
              endorsementCount: Math.max(0, (skill.endorsementCount || 0) - 1)
            };
          }
          return skill;
        })
      );
    } catch (err) {
      setError(err.message || 'Failed to remove endorsement');
      console.error('Error removing endorsement:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Request skill verification
   * @param {string} skillId - Skill ID
   * @param {object} verificationData - Verification data
   */
  const requestVerification = useCallback(async (skillId, verificationData) => {
    if (!userId) return;
    
    try {
      const response = await skillsService.requestSkillVerification(userId, skillId, verificationData);
      
      // Update local state
      setSkills(prev => 
        prev.map(skill => 
          skill.id === skillId 
            ? { ...skill, verificationStatus: response.status } 
            : skill
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to request verification');
      console.error('Error requesting verification:', err);
      throw err;
    }
  }, [userId]);

  // Fetch skills and categories on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchSkills();
      fetchCategories();
    }
  }, [userId, fetchSkills, fetchCategories]);

  return {
    skills,
    categories,
    loading,
    error,
    fetchSkills,
    addSkill,
    updateSkill,
    removeSkill,
    searchSkills,
    getPopularSkills,
    getSkillSuggestions,
    addEndorsement,
    removeEndorsement,
    requestVerification
  };
};

export default useUserSkills;