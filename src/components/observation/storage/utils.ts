
import { OBSERVATIONS_STORAGE_KEY } from './constants';
import { StoredObservation } from './types';

// Generate a unique ID for new observations
export const generateObservationId = (): string => {
  return `obs_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Fallback to localStorage if Supabase fails
export const getFallbackObservations = (): StoredObservation[] => {
  console.log('Falling back to localStorage for observations');
  const data = localStorage.getItem(OBSERVATIONS_STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing observations from localStorage:', error);
    return [];
  }
};

// Fallback to localStorage for saving observation
export const saveToLocalStorageFallback = (observation: StoredObservation): void => {
  console.log('Falling back to localStorage for saving observation');
  const currentObservations = getFallbackObservations();
  const updatedObservations = [observation, ...currentObservations];
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Fallback to localStorage for updating observation
export const updateInLocalStorageFallback = (updatedObservation: StoredObservation): void => {
  console.log('Falling back to localStorage for updating observation');
  const currentObservations = getFallbackObservations();
  const updatedObservations = currentObservations.map(obs => 
    obs.id === updatedObservation.id ? updatedObservation : obs
  );
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Fallback to localStorage for deleting observation
export const deleteFromLocalStorageFallback = (id: string): void => {
  console.log('Falling back to localStorage for deleting observation');
  const currentObservations = getFallbackObservations();
  const updatedObservations = currentObservations.filter(obs => obs.id !== id);
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};
