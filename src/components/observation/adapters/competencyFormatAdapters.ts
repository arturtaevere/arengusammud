
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
  
  // Convert imported action steps
  const importedSteps = Object.entries(importedActionSteps).map(([id, details]) => {
    // Make sure we're using the category without the 'comp' prefix to match the expected format
    const categoryId = details.category.startsWith('comp') 
      ? details.category.replace('comp', '') 
      : details.category;
      
    return {
      id: id,
      title: details.title,
      description: details.description,
      category: categoryId,
      difficulty: details.difficulty,
      timeEstimate: details.timeEstimate,
      resources: []
    };
  });
  
  console.log('Imported steps with correct categories:', importedSteps);
  
  // Return only imported action steps
  return importedSteps;
};
