
// Re-export the data and helper functions from their respective files
import { competencies } from './data/competenciesData';
import { getAllActionSteps, getActionStepById, getCompetencyById } from './data/competencyHelpers';
import { getCompetencyIconKey } from './data/competencyIcons';

// Export everything for backward compatibility
export {
  competencies,
  getAllActionSteps,
  getActionStepById,
  getCompetencyById,
  getCompetencyIconKey
};
