
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
