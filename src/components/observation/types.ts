
import { ActionStep } from '@/data/action-steps/types';
import { competencies } from './data/competenciesData';
import { classroomPositioningSteps } from '@/data/action-steps/classroom-environment/classroom-positioning';
import { classroomRulesSteps } from '@/data/action-steps/classroom-environment/classroom-rules';
import { classroomEnvironmentSteps } from '@/data/action-steps/classroom-environment';

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

// Fix the syntax by using type instead of extending an indexed type
export type EnrichedActionStep = {
  id: string;
  title: string;
  description: string;
  competencyId: string;
  competencyName: string;
  category?: string;
  resources: { title: string; url: string }[];
  practiceTasks?: string[];
};

// Updated ObservationFormValues to match actual form fields
export interface ObservationFormValues {
  teacherName: string;
  date: string;
  coachName: string;
  actionStep: string;
  developmentGoal: string;
  combinedNotes: string;  // Only using combined notes now
  specificPraise: string;
  nextActionStep: string; // Coach's notes about the next action step
  selectedActionStepText: string; // The actual text of the selected action step
  selectedActionStepId: string | null; // ID of the selected action step
}

// Also export the mock teachers used in ObservationForm
export const mockTeachers = {
  "Kool A": [
    { id: "1", name: "Mari Mets", developmentGoal: "Õpilaste kaasamine ja aktiivsuse tõstmine" },
    { id: "2", name: "Jaan Tamm", developmentGoal: "Diferentseeritud õpetamine" }
  ],
  "Kool B": [
    { id: "3", name: "Anne Kask", developmentGoal: "Klassiruumi juhtimine" },
    { id: "4", name: "Peeter Pärn", developmentGoal: "Digivahendite kasutamine" }
  ]
};

// Helper function to get action step by id
export const getActionStepById = (id: string): EnrichedActionStep | null => {
  // First, try to find in the classroom positioning steps (contains step10)
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
