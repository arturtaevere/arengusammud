
// Add the necessary code here without modifying the existing functionality
import { competences, getCompetenceTitle } from "@/data/competencesData";
import { ActionStepsService } from "@/services/ActionStepsService";
import { CSVImportService } from "@/services/csvImport";
import { ActionStepDetailsCollection } from "@/services/actionStepDetails/types";
import { generateId } from "@/services/csvImport/utils";

/**
 * Convert competence data to format needed for CompetencesPage
 */
export const convertToCompetencesPageFormat = () => {
  return competences.map((competence) => ({
    id: competence.id,
    title: competence.title,
    description: competence.description || '', // Add fallback for missing description
    icon: competence.icon || '', // Add fallback for missing icon
    count: 0 // Will be populated with actual counts later
  }));
};

/**
 * Convert action steps to format needed for CompetencesPage
 */
export const convertActionStepsToCompetencesPageFormat = () => {
  // Get imported data
  const importedData = CSVImportService.getImportedData();
  console.log('Raw imported data from storage:', importedData);
  
  if (!importedData || Object.keys(importedData).length === 0) {
    console.log('No imported action steps found in storage');
    return []; // Return empty array if no imported data
  }
  
  // Format imported data for the competences page
  const result = Object.entries(importedData).map(([id, data]) => {
    // Map category string to category ID when possible
    let categoryId = data.category;
    
    // If category is a title, try to find the ID
    competences.forEach(comp => {
      if (comp.title && comp.title.toLowerCase() === data.category.toLowerCase()) {
        categoryId = comp.id;
      }
    });
    
    return {
      id: id,
      title: data.title,
      description: data.description || '',
      category: categoryId,
      difficulty: data.difficulty || 'beginner',
      successCriteria: data.successCriteria || [],
      resources: data.resources || [],
      // Other fields as needed
    };
  });
  
  console.log('Converted imported action steps:', result.length);
  return result;
};

/**
 * Create a stub for convertToDashboardFormat to fix the export issue
 */
export const convertToDashboardFormat = () => {
  // This is a placeholder to satisfy the import in competencyAdapter.ts
  // Implement the actual functionality as needed
  return [];
};
