
import { ActionStepDetailBase, ActionStepDetailsCollection } from '../../actionStepDetails/types';
import { parseCSVLine, generateId } from '../utils';

/**
 * Parses a structured CSV format with category/text style rows
 */
export function parseStructuredCSVFormat(
  lines: string[], 
  headers: string[], 
  delimiter: string
): ActionStepDetailsCollection {
  const result: ActionStepDetailsCollection = {};
  
  // Check if this is a structured format by looking for required headers
  const hasStructuredFormat = headers.includes('kategooria') && headers.includes('tekst');
  if (!hasStructuredFormat) {
    console.log('Not a structured CSV format (missing kategooria/tekst headers)');
    return {};
  }
  
  console.log('Detected structured CSV format with kategooria/tekst columns');
  
  // Process the structured CSV format
  let currentId = '';
  let currentStep: Partial<ActionStepDetailBase> | null = null;
  let successCriteria: string[] = [];
  let practiceTasks: string[] = [];
  let currentCategory = '';
  
  // Process each line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    // Parse the line
    const values = parseCSVLine(line, delimiter);
    if (values.length < 2) continue; // Skip lines without enough values
    
    // Create an object from headers and values
    const rowData: Record<string, string> = {};
    headers.forEach((header, index) => {
      if (index < values.length) {
        rowData[header] = values[index];
      }
    });
    
    // Handle different row types based on the "kategooria" value
    const rowType = rowData['kategooria']?.toLowerCase();
    const rowContent = rowData['tekst'] || '';
    
    if (!rowType || !rowContent) continue;
    
    // Process row based on its type
    switch (rowType) {
      case 'õpieesmärk':
        // This is a category definition row
        currentCategory = rowContent;
        console.log(`Detected category: ${currentCategory}`);
        break;
        
      case 'sammu nimi':
        // This is an action step title row - save previous step if exists
        if (currentStep && currentId) {
          currentStep.successCriteria = successCriteria;
          currentStep.practiceTask = practiceTasks;
          result[currentId] = currentStep as ActionStepDetailBase;
          console.log(`Saved action step ${currentId} with ${successCriteria.length} criteria and ${practiceTasks.length} tasks`);
        }
        
        // Generate a unique ID for this step based on title
        if (!rowContent) break;
        
        currentId = generateId(rowContent);
        
        // Create a new step
        currentStep = {
          title: rowContent,
          description: '',
          category: currentCategory,
          difficulty: 'beginner', // Default
          timeEstimate: '',
          reason: '',
          examples: '',
          videoUrl: '',
          successCriteria: [],
          practiceTask: []
        };
        
        // Reset collections for the new step
        successCriteria = [];
        practiceTasks = [];
        
        console.log(`Created new step: ${currentId} - ${rowContent}`);
        break;
        
      case 'sammu kirjeldus':
        // This is a description row
        if (currentStep) {
          currentStep.description = rowContent;
          console.log(`Added description: ${currentStep.description}`);
        }
        break;
        
      default:
        // Check for success criteria
        if (rowType.includes('edukriteerium')) {
          if (currentStep && rowContent) {
            successCriteria.push(rowContent);
            console.log(`Added success criterion: ${rowContent}`);
          }
        }
        // Check for practice tasks
        else if (rowType.includes('harjutusülesanne')) {
          if (currentStep && rowContent) {
            practiceTasks.push(rowContent);
            console.log(`Added practice task: ${rowContent}`);
          }
        }
        break;
    }
  }
  
  // Don't forget to store the last step
  if (currentStep && currentId) {
    currentStep.successCriteria = successCriteria;
    currentStep.practiceTask = practiceTasks;
    result[currentId] = currentStep as ActionStepDetailBase;
    console.log(`Saving final action step ${currentId}`);
  }
  
  // Check if we found any action steps
  if (Object.keys(result).length > 0) {
    console.log(`Parsed ${Object.keys(result).length} action steps using structured CSV format`);
  }
  
  return result;
}
