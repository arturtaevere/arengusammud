
import { competencies } from './competenciesData';

// Helper function to get all action steps as a flat array
export const getAllActionSteps = () => {
  return competencies.flatMap(comp => 
    comp.actionSteps.map(step => ({
      ...step,
      competencyId: comp.id,
      competencyName: comp.name
    }))
  );
};

// Helper function to get action step by id
export const getActionStepById = (id: string) => {
  for (const comp of competencies) {
    const step = comp.actionSteps.find(step => step.id === id);
    if (step) {
      return {
        ...step,
        competencyId: comp.id,
        competencyName: comp.name
      };
    }
  }
  return null;
};

// Helper to get competency by id
export const getCompetencyById = (id: string) => {
  return competencies.find(comp => comp.id === id) || null;
};

// Map the action step IDs from the URL parameter to the actual action step IDs in the data
export const getActionStepDetailById = (urlId: string) => {
  // Check if this is one of the hardcoded IDs in ActionStepDetail component
  if (urlId === 'step1' || urlId === 'step2' || urlId === 'step10-1') {
    return urlId;
  }
  
  // For the competencies data format, map the URL ID (like "as19") to
  // the correct action step in the competencies data
  const allSteps = getAllActionSteps();
  const matchingStep = allSteps.find(step => step.id === urlId);
  
  if (matchingStep) {
    return urlId;
  }
  
  // Handle mapping between URL IDs and data IDs
  if (urlId === 'as19') {
    return 'step10-1'; // Map as19 to step10-1 which is "Tõhusa õppimisviisi avamine"
  }
  
  return null;
};
