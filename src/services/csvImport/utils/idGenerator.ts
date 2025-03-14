
/**
 * Utility functions for generating IDs from strings
 */

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
