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
    
    // Split content by lines and get headers
    const lines = csvContent.split('\n');
    if (lines.length < 2) {
      throw new Error('CSV file must contain headers and at least one data row');
    }
    
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Process each data row
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      const values = this.parseCSVLine(lines[i]);
      if (values.length !== headers.length) {
        console.warn(`Line ${i} has ${values.length} values but there are ${headers.length} headers. Skipping.`);
        continue;
      }
      
      // Create an object from headers and values
      const row = headers.reduce((obj, header, index) => {
        obj[header.toLowerCase()] = values[index];
        return obj;
      }, {} as Record<string, string>);
      
      // Extract and validate required fields
      if (!row.id || !row.title || !row.category) {
        console.warn(`Line ${i} is missing required fields (id, title, or category). Skipping.`);
        continue;
      }
      
      // Convert row to ActionStepDetailBase
      const detail: ActionStepDetailBase = {
        title: row.title,
        description: row.description || '',
        category: row.category,
        difficulty: (row.difficulty || 'beginner') as 'beginner' | 'intermediate' | 'advanced',
        timeEstimate: row.timeestimate || '',
        reason: row.reason || '',
        // Split success criteria and practice task by semicolons if they exist
        successCriteria: row.successcriteria ? row.successcriteria.split(';').map(s => s.trim()) : [],
        practiceTask: row.practicetask ? row.practicetask.split(';').map(s => s.trim()) : [],
        examples: row.examples || '',
        videoUrl: row.videourl || '',
      };
      
      // Add to result collection
      result[row.id] = detail;
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
   * This is a placeholder that currently just returns the parsed data
   * In a real app, this would store the data in a database or file
   */
  static saveImportedData(data: ActionStepDetailsCollection): void {
    // For now, just log the data
    console.log('Imported action step details:', data);
    // In a real implementation, this would save to localStorage or a database
    
    // Store in localStorage for demonstration purposes
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
