
// Re-export all functionality from the adapter files
export { 
  competencyIconMap,
  getIconComponent 
} from './adapters/competencyIcons';

export {
  getCompetencyDescription,
  getDifficultyForActionStep,
  getTimeEstimateForActionStep
} from './adapters/competencyMetadata';

export {
  convertToCompetencesPageFormat,
  convertToDashboardFormat,
  convertActionStepsToCompetencesPageFormat
} from './adapters/competencyFormatAdapters';
