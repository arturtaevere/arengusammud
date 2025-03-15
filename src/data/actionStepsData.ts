
// This file re-exports from the modular action-steps directory
import { ActionStep, Competence } from './action-steps/types';
import { competences } from './action-steps/competences';
import { classroomEnvironmentSteps } from './action-steps/classroom-environment';
import { teachingPlanningSteps } from './action-steps/teaching-planning';
import { selfDirectedLearningSteps } from './action-steps/self-directed-learning';

// Combine all action steps with defensive coding to prevent errors
const allSteps = [
  ...(classroomEnvironmentSteps || []),
  ...(teachingPlanningSteps || []),
  ...(selfDirectedLearningSteps || []),
].filter(Boolean);

// Export action steps and competences
export const actionSteps: ActionStep[] = allSteps;
export { competences };
export type { ActionStep, Competence };

// Debug log the exported data
console.log("Action steps data export:", actionSteps.length);
console.log("Competences data export:", competences.length);
