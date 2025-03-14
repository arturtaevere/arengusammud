
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
    
    // Get headers from first line and normalize them
    const headers = this.parseCSVLine(lines[0])
      .map(header => header.toLowerCase().trim());
    
    console.log('CSV Headers found:', headers);
    
    // Process action steps row by row
    let currentId = '';
    let currentStep: Partial<ActionStepDetailBase> | null = null;
    let successCriteria: string[] = [];
    let practiceTasks: string[] = [];
    
    // Start from line 1 (skip headers)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines
      
      // Check if this is a line with success criteria (support both colon and semicolon)
      if (line.match(/^Edukriteerium[;:]/i)) {
        if (currentStep) {
          const criterion = line.replace(/^Edukriteerium[;:]/i, '').trim();
          if (criterion) successCriteria.push(criterion);
        }
        continue;
      }
      
      // Check if this is a line with practice task (support both colon and semicolon)
      if (line.match(/^Harjutusülesanne[;:]/i)) {
        if (currentStep) {
          const task = line.replace(/^Harjutusülesanne[;:]/i, '').trim();
          if (task) practiceTasks.push(task);
        }
        continue;
      }
      
      // This is a new action step row, store the previous step if exists
      if (currentStep && currentId) {
        // Save success criteria and practice tasks
        currentStep.successCriteria = successCriteria;
        currentStep.practiceTask = practiceTasks;
        
        console.log(`Saving action step ${currentId} with ${successCriteria.length} criteria and ${practiceTasks.length} tasks`);
        
        // Store the complete step
        result[currentId] = currentStep as ActionStepDetailBase;
        
        // Reset for next step
        successCriteria = [];
        practiceTasks = [];
      }
      
      // Parse the current line as a new action step
      const values = this.parseCSVLine(line);
      
      // Create an object from headers and values
      const rowData: Record<string, string> = {};
      headers.forEach((header, index) => {
        if (index < values.length) {
          rowData[header] = values[index];
        }
      });
      
      // Validate required fields
      if (!rowData.id || !rowData.title) {
        console.warn(`Line ${i+1} is missing id or title. Skipping.`, rowData);
        currentStep = null;
        currentId = '';
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
        timeEstimate: rowData.timeestimate || rowData.time || rowData['time estimate'] || '',
        reason: rowData.reason || '',
        examples: rowData.examples || '',
        videoUrl: rowData.videourl || rowData.video || rowData['video url'] || '',
        successCriteria: [],
        practiceTask: []
      };
      
      console.log(`Detected new action step: ${currentId} - ${currentStep.title}`);
    }
    
    // Don't forget to store the last step
    if (currentStep && currentId) {
      currentStep.successCriteria = successCriteria;
      currentStep.practiceTask = practiceTasks;
      result[currentId] = currentStep as ActionStepDetailBase;
      
      console.log(`Saving final action step ${currentId}`);
    }
    
    console.log(`Total action steps parsed: ${Object.keys(result).length}`);
    
    if (Object.keys(result).length === 0) {
      throw new Error('No valid action steps found in the CSV file. Check file format and required fields (id, title).');
    }
    
    return result;
  }
  
  /**
   * Parse a CSV line considering quoted values and handling commas within quotes
   */
  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          // Handle escaped quotes (two double quotes in sequence)
          currentValue += '"';
          i++; // Skip the next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
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
  
  /**
   * Get a sample CSV template for users to download
   */
  static getSampleCSV(): string {
    return `id,title,description,category,difficulty,timeEstimate,reason,examples,videoUrl
step-1,Sample Step 1,This is a sample description,Category 1,beginner,10-15 min,Reason for this step,Example implementation,https://example.com/video
Edukriteerium: First success criterion for step 1
Edukriteerium: Second success criterion for step 1
Harjutusülesanne: Practice task 1 for step 1
Harjutusülesanne: Practice task 2 for step 1
step-2,Sample Step 2,Another sample description,Category 2,intermediate,20-30 min,Another reason,More examples,https://example.com/video2
Edukriteerium: First success criterion for step 2
Harjutusülesanne: Practice task for step 2`;
  }
}
