
// Utility functions for storing and retrieving observation data from localStorage

const OBSERVATIONS_STORAGE_KEY = 'observations_data';

export interface StoredObservation {
  id: string;
  teacher: string;
  subject?: string;
  date: string;
  status: string;
  hasFeedback: boolean;
  competences: string[];
  teacherNotes: string;
  studentNotes: string;
  specificPraise: string;
  improvementAreas: string;
  developmentGoal: string;
  actionStep: string;
  nextActionStep: string;
  createdAt: string;
}

// Get all stored observations
export const getStoredObservations = (): StoredObservation[] => {
  const data = localStorage.getItem(OBSERVATIONS_STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing observations from localStorage:', error);
    return [];
  }
};

// Save a new observation
export const saveObservation = (observation: StoredObservation): void => {
  const currentObservations = getStoredObservations();
  const updatedObservations = [observation, ...currentObservations];
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Update an existing observation
export const updateObservation = (updatedObservation: StoredObservation): void => {
  const currentObservations = getStoredObservations();
  const updatedObservations = currentObservations.map(obs => 
    obs.id === updatedObservation.id ? updatedObservation : obs
  );
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Delete an observation
export const deleteObservation = (id: string): void => {
  const currentObservations = getStoredObservations();
  const updatedObservations = currentObservations.filter(obs => obs.id !== id);
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Generate a unique ID for new observations
export const generateObservationId = (): string => {
  return `obs_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};
