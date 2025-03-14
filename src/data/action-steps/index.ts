
import { ActionStep, Competence } from './types';
import { competences } from './competences';
import { classroomEnvironmentSteps } from './classroom-environment';
import { teachingPlanningSteps } from './teaching-planning';
import { selfDirectedLearningSteps } from './self-directed-learning';

// Combine all action steps
export const actionSteps: ActionStep[] = [
  ...classroomEnvironmentSteps,
  ...teachingPlanningSteps,
  ...selfDirectedLearningSteps,
];

// Export everything from the module
export { competences };
export type { ActionStep, Competence };
