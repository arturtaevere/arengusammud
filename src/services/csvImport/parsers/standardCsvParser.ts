
import { ActionStepDetailBase, ActionStepDetailsCollection } from '../../actionStepDetails/types';
import { parseCSVLine } from '../utils';

/**
 * Parses a standard CSV format with direct field mappings
 */
export function parseStandardCSVFormat(
  lines: string[], 
  headers: string[], 
  delimiter: string
): ActionStepDetailsCollection {
  const result: ActionStepDetailsCollection = {};
  
  // Process each data row (skip header row)
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
    
    console.log(`Row ${i} data:`, rowData);
    
    // Check if this is a standard CSV row with direct field mappings
    if (rowData['id']) {
      const currentId = rowData['id'];
      
      // Initialize the action step with required fields
      const actionStep: ActionStepDetailBase = {
        title: rowData['title'] || '',
        description: rowData['description'] || '',
        category: rowData['category'] || '',
        difficulty: (rowData['difficulty'] || 'beginner') as 'beginner' | 'intermediate' | 'advanced',
        timeEstimate: rowData['timeestimate'] || rowData['time'] || rowData['time estimate'] || '',
        reason: rowData['reason'] || '',
        examples: rowData['examples'] || '',
        videoUrl: rowData['videourl'] || rowData['video'] || rowData['video url'] || '',
        successCriteria: [],
        practiceTask: []
      };
      
      console.log(`Detected standard format row: ${currentId} - ${actionStep.title}`);
      
      // Store the action step
      result[currentId] = actionStep;
    }
  }
  
  // Check if we found any action steps
  if (Object.keys(result).length > 0) {
    console.log(`Parsed ${Object.keys(result).length} action steps using standard CSV format`);
  }
  
  return result;
}
