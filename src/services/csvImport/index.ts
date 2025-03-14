
/**
 * Service for importing action step details from CSV format
 */
import { ActionStepDetailsCollection } from '../actionStepDetails/types';
import { parseCSVContent } from './parser';
import { saveImportedData, getImportedData, clearImportedData } from './storage';
import { getSampleCSV } from './samples';

export class CSVImportService {
  /**
   * Parse CSV content into structured action step details
   */
  static parseCSVContent = parseCSVContent;
  
  /**
   * Save imported action step details
   */
  static saveImportedData = saveImportedData;
  
  /**
   * Get previously imported data from localStorage
   */
  static getImportedData = getImportedData;
  
  /**
   * Clear imported data from localStorage
   */
  static clearImportedData = clearImportedData;
  
  /**
   * Get a sample CSV template for users to download
   */
  static getSampleCSV = getSampleCSV;
}

