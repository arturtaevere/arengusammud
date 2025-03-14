
import { competencies } from '../data/competenciesData';
import { getCompetencyDescription, getDifficultyForActionStep } from './competencyMetadata';
import { getIconComponent } from './competencyIcons';
import { actionSteps } from '@/data/actionStepsData';
import { ActionStep } from '@/data/action-steps/types';

// Convert a competency from the standard format to the format used in the Competences page
export const convertToCompetencesPageFormat = () => {
  console.log("Converting competencies to page format...");
  return competencies.map(comp => {
    // Get the proper category ID by removing 'comp' prefix
    const categoryId = comp.id.replace('comp', '');
    
    return {
      id: categoryId,
      title: comp.name,
      description: getCompetencyDescription(comp.id),
      count: 0, // Will be updated later
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
  console.log("Converting action steps, checking data source...");
  
  // First check if we have action steps from the data module
  if (!actionSteps) {
    console.error("No action steps data available");
    return [];
  }
  
  console.log("Using action steps from data module:", actionSteps.length);
  
  try {
    // Map through each action step and ensure it has all required properties
    return actionSteps.map(step => {
      if (!step) {
        console.error("Found null/undefined step in action steps");
        return null;
      }
      
      return {
        id: step.id || "",
        title: step.title || "",
        description: step.description || "",
        category: step.category || "",
        difficulty: step.difficulty || getDifficultyForActionStep(step.id || ""),
        resources: step.resources || [],
        practiceTasks: step.practiceTasks || []
      };
    }).filter(Boolean) as ActionStep[];
  } catch (error) {
    console.error("Error converting action steps:", error);
    return [];
  }
};
