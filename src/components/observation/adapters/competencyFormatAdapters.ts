
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
  // Get imported action steps only
  const importedActionSteps = CSVImportService.getImportedData();
  console.log('Raw imported data from storage:', importedActionSteps);
  
  // Convert imported action steps
  const importedSteps = Object.entries(importedActionSteps).map(([id, details]) => {
    // Make sure we're using the category without the 'comp' prefix to match the expected format
    let categoryId = details.category;
    
    if (typeof categoryId === 'string') {
      // First try to extract a numeric part if the category is something like "comp1" or "1"
      const numericMatch = categoryId.match(/(\d+)/);
      if (numericMatch) {
        categoryId = numericMatch[1];
        console.log(`Found numeric category: ${categoryId} from original: ${details.category}`);
      } else if (categoryId.startsWith('comp')) {
        categoryId = categoryId.replace('comp', '');
        console.log(`Removed 'comp' prefix: ${categoryId} from original: ${details.category}`);
      }
    } else {
      console.log(`Category is not a string: ${typeof categoryId}`);
      categoryId = '1'; // Default to category 1 if we can't determine the category
    }
      
    return {
      id: id,
      title: details.title,
      description: details.description,
      category: categoryId,
      difficulty: details.difficulty || 'beginner',
      timeEstimate: details.timeEstimate || '15 min',
      resources: []
    };
  });
  
  console.log('Imported steps with correct categories:', importedSteps);
  
  // Return only imported action steps
  return importedSteps;
};
