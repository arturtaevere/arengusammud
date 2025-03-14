/**
 * Service for importing action step details from CSV format
 */

import { ActionStepDetailBase, ActionStepDetailsCollection } from './actionStepDetails/types';

// Define the expected CSV columns
type CSVActionStepRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  successCriteria: string;
  practiceTask: string;
  // Other fields can be added later
  reason?: string;
  examples?: string;
  videoUrl?: string;
};

export class CSVImportService {
  /**
   * Parse CSV content into structured action step details
   */
  static parseCSVContent(csvContent: string): ActionStepDetailsCollection {
    const result: ActionStepDetailsCollection = {};
    
    // Split by rows (lines)
    const lines = csvContent.split('\n');
    if (lines.length < 2) {
      throw new Error('CSV file must contain headers and at least one data row');
    }
    
    // Get headers from first line
    const headers = this.parseCSVLine(lines[0]);
    
    // Process action steps row by row
    let currentId = '';
    let currentStep: Partial<ActionStepDetailBase> | null = null;
    let successCriteria: string[] = [];
    let practiceTasks: string[] = [];
    
    // Start from line 1 (skip headers)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines
      
      // Check if this is a line with success criteria
      if (line.startsWith('Edukriteerium:')) {
        if (currentStep) {
          const criterion = line.replace('Edukriteerium:', '').trim();
          successCriteria.push(criterion);
        }
        continue;
      }
      
      // Check if this is a line with practice task
      if (line.startsWith('Harjutusülesanne:')) {
        if (currentStep) {
          const task = line.replace('Harjutusülesanne:', '').trim();
          practiceTasks.push(task);
        }
        continue;
      }
      
      // This is a new action step row, store the previous step if exists
      if (currentStep && currentId) {
        // Save success criteria and practice tasks
        currentStep.successCriteria = successCriteria;
        currentStep.practiceTask = practiceTasks;
        
        // Store the complete step
        result[currentId] = currentStep as ActionStepDetailBase;
        
        // Reset for next step
        successCriteria = [];
        practiceTasks = [];
      }
      
      // Parse the current line as a new action step
      const values = this.parseCSVLine(line);
      
      // Skip if there aren't enough values
      if (values.length < headers.length) {
        console.warn(`Line ${i} has only ${values.length} values but needs ${headers.length}. Skipping.`);
        currentStep = null;
        continue;
      }
      
      // Create an object from headers and values
      const rowData = headers.reduce((obj, header, index) => {
        obj[header.toLowerCase()] = values[index];
        return obj;
      }, {} as Record<string, string>);
      
      // Validate required fields
      if (!rowData.id || !rowData.title) {
        console.warn(`Line ${i} is missing id or title. Skipping.`);
        currentStep = null;
        continue;
      }
      
      // Store current ID
      currentId = rowData.id;
      
      // Initialize the new step
      currentStep = {
        title: rowData.title || '',
        description: rowData.description || '',
        category: rowData.category || '',
        difficulty: (rowData.difficulty || 'beginner') as 'beginner' | 'intermediate' | 'advanced',
        timeEstimate: rowData.timeestimate || '',
        reason: rowData.reason || '',
        examples: rowData.examples || '',
        videoUrl: rowData.videourl || '',
        successCriteria: [],
        practiceTask: []
      };
    }
    
    // Don't forget to store the last step
    if (currentStep && currentId) {
      currentStep.successCriteria = successCriteria;
      currentStep.practiceTask = practiceTasks;
      result[currentId] = currentStep as ActionStepDetailBase;
    }
    
    return result;
  }
  
  /**
   * Parse a CSV line considering quoted values
   */
  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    // Add the last value
    result.push(currentValue.trim());
    
    return result;
  }
  
  /**
   * Save imported action step details
   */
  static saveImportedData(data: ActionStepDetailsCollection): void {
    // Store in localStorage
    localStorage.setItem('importedActionStepDetails', JSON.stringify(data));
  }
  
  /**
   * Get previously imported data from localStorage
   */
  static getImportedData(): ActionStepDetailsCollection {
    const storedData = localStorage.getItem('importedActionStepDetails');
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (e) {
        console.error('Failed to parse stored action step details', e);
      }
    }
    return {};
  }
}
