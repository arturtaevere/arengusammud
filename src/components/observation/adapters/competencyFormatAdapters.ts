
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
    description: '', // Using empty string as fallback since description doesn't exist in the type
    icon: '', // Using empty string as fallback since icon doesn't exist in the type
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
      // Other fields as needed
    };
  });
  
  console.log('Converted imported action steps:', result.length);
  return result;
};

/**
 * Convert competence data to format needed for Dashboard
 */
export const convertToDashboardFormat = () => {
  // Import necessary icons for the dashboard display
  import { BookOpen, ClipboardCheck, Clock, Compass, FileText, 
    Layers, MessageCircle, Users, BarChart, Brain } from 'lucide-react';
  
  // Map of competence IDs to icons
  const iconMap = {
    '1': <BookOpen className="h-5 w-5 text-primary" />,
    '2': <ClipboardCheck className="h-5 w-5 text-primary" />,
    '3': <Clock className="h-5 w-5 text-primary" />,
    '4': <Compass className="h-5 w-5 text-primary" />,
    '5': <FileText className="h-5 w-5 text-primary" />,
    '6': <Layers className="h-5 w-5 text-primary" />,
    '7': <MessageCircle className="h-5 w-5 text-primary" />,
    '8': <Users className="h-5 w-5 text-primary" />,
    '9': <BarChart className="h-5 w-5 text-primary" />,
    '10': <Brain className="h-5 w-5 text-primary" />
  };
  
  // Convert competences to the format needed for the dashboard
  return competences.map((competence) => ({
    id: competence.id,
    title: competence.title,
    icon: iconMap[competence.id as keyof typeof iconMap] || <BookOpen className="h-5 w-5 text-primary" />
  }));
};
