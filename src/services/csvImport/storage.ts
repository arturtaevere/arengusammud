
import { ActionStepDetailsCollection } from '../actionStepDetails/types';

/**
 * Functions for storing and retrieving CSV import data
 */
export const saveImportedData = (data: ActionStepDetailsCollection): void => {
  // Store in localStorage
  localStorage.setItem('importedActionStepDetails', JSON.stringify(data));
};

export const getImportedData = (): ActionStepDetailsCollection => {
  const storedData = localStorage.getItem('importedActionStepDetails');
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error('Failed to parse stored action step details', e);
    }
  }
  return {};
};
