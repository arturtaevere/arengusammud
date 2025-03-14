
/**
 * Utility functions for CSV parsing and processing
 */

/**
 * Parse a CSV line considering quoted values and handling delimiter within quotes
 */
export const parseCSVLine = (line: string, delimiter: string = ','): string[] => {
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
    } else if (char === delimiter && !inQuotes) {
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
};

/**
 * Generate a simple ID from a title
 */
export const generateId = (title: string): string => {
  return 'step-' + title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')  // Remove non-alphanumeric characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .substring(0, 20);        // Limit length
};

/**
 * Auto-detect the delimiter in a CSV file
 */
export const detectDelimiter = (firstLine: string): string => {
  return firstLine.includes(';') ? ';' : ',';
};
