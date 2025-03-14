import { competencies } from '../data/competenciesData';
import { getCompetencyDescription, getDifficultyForActionStep, getTimeEstimateForActionStep } from './competencyMetadata';
import { getIconComponent } from './competencyIcons';
import { CSVImportService } from '@/services/csvImport';
import { ActionStepDetailsCollection } from '@/services/actionStepDetails/types';

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
  console.log('Raw imported data from storage:', importedActionSteps);
  
  if (!importedActionSteps || Object.keys(importedActionSteps).length === 0) {
    console.log('No imported action steps found in storage');
    return [];
  }
  
  // Debug the first item to understand the structure
  const firstItem = Object.entries(importedActionSteps)[0];
  if (firstItem) {
    console.log('Sample imported data structure:', {
      id: firstItem[0],
      details: firstItem[1]
    });
  }
  
  // Convert imported action steps
  const importedSteps = Object.entries(importedActionSteps).map(([id, details]) => {
    console.log(`Processing action step ${id}:`, details);
    
    // Debug the category value
    let categoryRaw = details.category;
    console.log(`Original category value: ${categoryRaw}, type: ${typeof categoryRaw}`);
    
    // Make sure we're using the category without the 'comp' prefix to match the expected format
    let categoryId = '1'; // Default to category 1 if we can't determine
    
    if (categoryRaw) {
      if (typeof categoryRaw === 'string') {
        // First try to extract a numeric part if the category is something like "comp1" or "1"
        const numericMatch = categoryRaw.match(/(\d+)/);
        if (numericMatch) {
          categoryId = numericMatch[1];
          console.log(`Extracted numeric category: ${categoryId} from original: ${categoryRaw}`);
        } else if (categoryRaw.startsWith('comp')) {
          categoryId = categoryRaw.replace('comp', '');
          console.log(`Removed 'comp' prefix: ${categoryId} from original: ${categoryRaw}`);
        } else {
          // If the category is a string but not in expected format, keep it as is
          categoryId = categoryRaw;
          console.log(`Using raw category: ${categoryId}`);
        }
      } else {
        console.log(`Category is not a string: ${typeof categoryRaw}`);
      }
    } else {
      console.log(`Category is undefined or null, using default`);
    }
      
    // Prepare the action step object with fallbacks for all fields
    const actionStep = {
      id: id,
      title: details.title || 'Untitled',
      description: details.description || '',
      category: categoryId,
      difficulty: details.difficulty || 'beginner',
      timeEstimate: details.timeEstimate || '15 min',
      resources: []
    };
    
    console.log(`Processed action step: ${id}, category: ${actionStep.category}`);
    return actionStep;
  });
  
  console.log('Processed steps with formatted categories:', importedSteps);
  
  return importedSteps;
};
