
import { competencies } from '../data/competenciesData';
import { getCompetencyDescription, getDifficultyForActionStep } from './competencyMetadata';
import { getIconComponent } from './competencyIcons';
import { actionSteps } from '@/data/actionStepsData';
import { ActionStep } from '@/data/action-steps/types';

// Convert a competency from the standard format to the format used in the Competences page
export const convertToCompetencesPageFormat = () => {
  return competencies.map(comp => {
    // Get the proper category ID by removing 'comp' prefix
    const categoryId = comp.id.replace('comp', '');
    
    // Find action steps for this competency
    const stepsForCompetency = actionSteps.filter(
      step => step.category === categoryId
    );
    
    return {
      id: categoryId,
      title: comp.name,
      description: getCompetencyDescription(comp.id),
      count: stepsForCompetency.length,
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
export const convertActionStepsToCompetencesPageFormat = (): ActionStep[] => {
  console.log("Converting action steps, source length:", actionSteps.length);
  
  // First check if we have action steps from the data module
  if (actionSteps && actionSteps.length > 0) {
    console.log("Using action steps from data module:", actionSteps.length);
    
    // Map through each action step and ensure it has all required properties
    return actionSteps.map(step => {
      return {
        id: step.id,
        title: step.title,
        description: step.description,
        category: step.category,
        difficulty: step.difficulty || getDifficultyForActionStep(step.id),
        resources: step.resources || [],
        practiceTasks: step.practiceTasks || []
      };
    });
  }
  
  // Fallback to using competencies data
  console.log("No action steps in data module, using competencies data");
  return competencies.flatMap(comp => 
    comp.actionSteps.map(step => {
      return {
        id: step.id,
        title: step.title,
        description: step.description,
        category: comp.id.replace('comp', ''),
        difficulty: getDifficultyForActionStep(step.id),
        resources: [],
        practiceTasks: []
      };
    })
  );
};
