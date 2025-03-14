
import { ActionStep } from '@/data/action-steps/types';

interface CsvRow {
  type: string;
  value: string;
}

/**
 * Parses CSV content for action steps
 * Expected format:
 * Õpieesmärk;Kategooria
 * Sammu nimi;Nimi
 * Sammu kirjeldus;Kirjeldus
 * Edukriteerium;Kriteerium 1
 * Edukriteerium;Kriteerium 2
 * Harjutusülesanne;Ülesanne 1
 * ...
 */
export const parseActionStepsCsv = (csvContent: string): Partial<ActionStep>[] => {
  // Split content into lines and parse each line
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  const parsedRows: CsvRow[] = lines.map(line => {
    const [type, value] = line.split(';');
    return { type: type.trim(), value: value?.trim() || '' };
  });

  const result: Partial<ActionStep>[] = [];
  let currentStep: Partial<ActionStep> = {};
  let currentCompetency = '';
  let currentSuccessCriteria: string[] = [];
  let currentExercises: string[] = [];

  // Process each row
  parsedRows.forEach(row => {
    switch (row.type) {
      case 'Õpieesmärk':
        // Start a new competency
        currentCompetency = row.value;
        break;
        
      case 'Sammu nimi':
        // If we have a current step in progress, save it
        if (currentStep.title) {
          result.push({
            ...currentStep,
            category: currentCompetency,
            resources: currentSuccessCriteria.map(criteria => ({ 
              title: 'Edukriteerium',
              url: criteria
            })),
            practiceTasks: currentExercises
          });
        }
        
        // Start a new step
        currentStep = { 
          id: `generated-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: row.value 
        };
        currentSuccessCriteria = [];
        currentExercises = [];
        break;
        
      case 'Sammu kirjeldus':
        if (currentStep) {
          currentStep.description = row.value;
        }
        break;
        
      case 'Edukriteerium':
        currentSuccessCriteria.push(row.value);
        break;
        
      case 'Harjutusülesanne':
        currentExercises.push(row.value);
        break;
    }
  });

  // Don't forget to add the last step
  if (currentStep.title) {
    result.push({
      ...currentStep,
      category: currentCompetency,
      resources: currentSuccessCriteria.map(criteria => ({ 
        title: 'Edukriteerium',
        url: criteria
      })),
      practiceTasks: currentExercises
    });
  }

  return result;
};
