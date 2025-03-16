
import { ActionStep } from '@/data/action-steps/types';
import { competencies } from './data/competenciesData';

// Define the types used in the observation components
export interface Competency {
  id: string;
  name: string;
  description: string;
  actionSteps: {
    id: string;
    title: string;
    description: string;
    resources?: { title: string; url: string }[];
    practiceTasks?: string[];
  }[];
}

export interface EnrichedActionStep extends Competency['actionSteps'][0] {
  competencyId: string;
  competencyName: string;
  category?: string;
  resources: { title: string; url: string }[];
  practiceTasks?: string[];
}

// Helper function to get action step by id
export const getActionStepById = (id: string): EnrichedActionStep | null => {
  // First, try to find in the classroom positioning steps (contains step10)
  const { classroomPositioningSteps } = require('@/data/action-steps/classroom-environment/classroom-positioning');
  const positioningStep = classroomPositioningSteps.find((step: ActionStep) => step.id === id);
  
  if (positioningStep) {
    return {
      ...positioningStep,
      competencyId: `comp${positioningStep.category}`,
      competencyName: 'Hooliva ja arengut toetava õpikeskkonna loomine',
      resources: positioningStep.resources || []
    };
  }
  
  // Then try other action steps collections
  const { classroomRulesSteps } = require('@/data/action-steps/classroom-environment/classroom-rules');
  const rulesStep = classroomRulesSteps.find((step: ActionStep) => step.id === id);
  
  if (rulesStep) {
    return {
      ...rulesStep,
      competencyId: `comp${rulesStep.category}`,
      competencyName: 'Kindlate ja harjumuspäraste tegevuste korraldamine klassis',
      resources: rulesStep.resources || []
    };
  }
  
  // Then try the classroomEnvironmentSteps
  const { classroomEnvironmentSteps } = require('@/data/action-steps/classroom-environment');
  const envStep = classroomEnvironmentSteps.find((step: ActionStep) => step.id === id);
  
  if (envStep) {
    return {
      ...envStep,
      competencyId: `comp${envStep.category}`,
      competencyName: 'Õpikeskkonna kujundamine',
      resources: envStep.resources || []
    };
  }
  
  // If still not found, try looking through all competencies
  for (const comp of competencies) {
    const step = comp.actionSteps.find(step => step.id === id);
    if (step) {
      return {
        ...step,
        competencyId: comp.id,
        competencyName: comp.name,
        resources: step.resources || []
      };
    }
  }
  
  console.error(`Action step with ID ${id} not found in any collection`);
  return null;
};
