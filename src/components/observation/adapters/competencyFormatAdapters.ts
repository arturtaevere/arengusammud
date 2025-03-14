
import { competencies } from '../data/competenciesData';
import { getCompetencyDescription, getDifficultyForActionStep, getTimeEstimateForActionStep } from './competencyMetadata';
import { getIconComponent } from './competencyIcons';
import { CSVImportService } from '@/services/csvImport';

// Convert a competency from the standard format to the format used in the Competences page
export const convertToCompetencesPageFormat = () => {
  return competencies.map(comp => {
    return {
      id: comp.id.replace('comp', ''),
      title: comp.name,
      description: getCompetencyDescription(comp.id),
      count: comp.actionSteps.length,
      icon: getIconComponent(comp.id)
    };
  });
};

// Convert a competency to the format used in dashboard
export const convertToDashboardFormat = () => {
  return competencies.map(comp => {
    return {
      id: comp.id.replace('comp', ''),
      title: comp.name,
      icon: getIconComponent(comp.id)
    };
  });
};

// Convert action steps to the format used in the Competences page
export const convertActionStepsToCompetencesPageFormat = () => {
  // Get imported action steps
  const importedActionSteps = CSVImportService.getImportedData();
  
  // Convert standard action steps from competencies
  const standardSteps = competencies.flatMap(comp => 
    comp.actionSteps.map(step => ({
      id: step.id,
      title: step.title,
      description: step.description,
      category: comp.id.replace('comp', ''),
      difficulty: getDifficultyForActionStep(step.id),
      timeEstimate: getTimeEstimateForActionStep(step.id),
      resources: []
    }))
  );
  
  // Convert imported action steps
  const importedSteps = Object.entries(importedActionSteps).map(([id, details]) => ({
    id: id,
    title: details.title,
    description: details.description,
    category: details.category,
    difficulty: details.difficulty,
    timeEstimate: details.timeEstimate,
    resources: []
  }));
  
  // Combine both sets of action steps
  return [...standardSteps, ...importedSteps];
};
