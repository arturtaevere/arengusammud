
import { ActionStep, Competence } from './types';
import { competences } from './competences';
import { classroomEnvironmentSteps } from './classroom-environment';
import { teachingPlanningSteps } from './teaching-planning';
import { selfDirectedLearningSteps } from './self-directed-learning';

// Debug the imported arrays
console.log("Imported classroom steps:", classroomEnvironmentSteps ? classroomEnvironmentSteps.length : 'undefined');
console.log("Imported teaching steps:", teachingPlanningSteps ? teachingPlanningSteps.length : 'undefined');
console.log("Imported learning steps:", selfDirectedLearningSteps ? selfDirectedLearningSteps.length : 'undefined');

// Combine all action steps with null/undefined handling
const allSteps = [
  ...(classroomEnvironmentSteps || []),
  ...(teachingPlanningSteps || []),
  ...(selfDirectedLearningSteps || []),
].filter(Boolean);

// Export the combined action steps
export const actionSteps: ActionStep[] = allSteps;

// Log the resulting array
console.log("Combined action steps:", actionSteps.length);

// Export everything from the module
export { competences };
export type { ActionStep, Competence };
