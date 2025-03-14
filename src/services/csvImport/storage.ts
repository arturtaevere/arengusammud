
import { ActionStepDetailsCollection } from '../actionStepDetails/types';

/**
 * Functions for storing and retrieving CSV import data
 */
export const saveImportedData = (data: ActionStepDetailsCollection): void => {
  // Store in localStorage
  try {
    console.log('Saving imported data to localStorage:', Object.keys(data).length, 'items');
    localStorage.setItem('importedActionStepDetails', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save imported action step details', e);
  }
};

export const getImportedData = (): ActionStepDetailsCollection => {
  const storedData = localStorage.getItem('importedActionStepDetails');
  console.log('Raw imported data from storage:', storedData);
  
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      console.log('Successfully retrieved imported data:', Object.keys(parsedData).length, 'items');
      return parsedData;
    } catch (e) {
      console.error('Failed to parse stored action step details', e);
    }
  } else {
    console.log('No imported action steps found in storage');
  }
  return {};
};

// Clear imported data from localStorage
export const clearImportedData = (): void => {
  localStorage.removeItem('importedActionStepDetails');
  console.log('Cleared imported action step details from storage');
};
