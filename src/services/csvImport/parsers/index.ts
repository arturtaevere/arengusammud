
import { ActionStepDetailsCollection } from '../../actionStepDetails/types';
import { parseCSVLine, detectDelimiter } from '../utils';
import { parseStandardCSVFormat } from './standardCsvParser';
import { parseStructuredCSVFormat } from './structuredCsvParser';
import { parseInlineCriteriaAndTasks } from './inlineCriteriaParser';

/**
 * Main function to parse CSV content into action step details
 */
export function parseCSVContent(csvContent: string): ActionStepDetailsCollection {
  console.log('Starting CSV parsing process');
  
  // Try to detect the delimiter (comma or semicolon)
  const firstLine = csvContent.split('\n')[0];
  const delimiter = detectDelimiter(firstLine);
  console.log(`Detected delimiter: "${delimiter}"`);
  
  // Split by rows (lines)
  const lines = csvContent.split('\n');
  if (lines.length < 2) {
    throw new Error('CSV file must contain headers and at least one data row');
  }
  
  // Get headers from first line and normalize them
  const headers = parseCSVLine(lines[0], delimiter)
    .map(header => header.toLowerCase().trim());
  console.log('CSV Headers found:', headers);
  
  // Try different parsing strategies
  let result: ActionStepDetailsCollection = {};
  
  // First try the structured format (with kategooria/tekst columns)
  if (headers.includes('kategooria') && headers.includes('tekst')) {
    console.log('Trying structured CSV format parser');
    result = parseStructuredCSVFormat(lines, headers, delimiter);
  }
  
  // If no results from structured format, try standard format
  if (Object.keys(result).length === 0) {
    console.log('Trying standard CSV format parser');
    result = parseStandardCSVFormat(lines, headers, delimiter);
  }
  
  // Check for inline criteria and tasks to enhance the results
  if (Object.keys(result).length > 0) {
    result = parseInlineCriteriaAndTasks(lines, result);
  }
  
  // Validate results
  const totalCount = Object.keys(result).length;
  console.log(`Total action steps parsed: ${totalCount}`);
  
  if (totalCount === 0) {
    throw new Error('No valid action steps found in the CSV file. Check file format and required fields.');
  }
  
  return result;
}
