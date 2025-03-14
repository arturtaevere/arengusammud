
import { ActionStepDetailsCollection } from '../actionStepDetails/types';
import { parseCSVContent as parseCSVContentImpl } from './parsers';

/**
 * Functionality for parsing CSV content into structured action step details
 * This is the main entry point for CSV parsing, delegating to specialized parsers
 */
export const parseCSVContent = (csvContent: string): ActionStepDetailsCollection => {
  return parseCSVContentImpl(csvContent);
};
