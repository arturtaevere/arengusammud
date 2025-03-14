
import { ActionStep } from '../types';
import { classroomRulesSteps } from './classroom-rules';
import { emotionalEnvironmentSteps } from './emotional-environment';
import { behaviorManagementSteps } from './behavior-management';
import { classroomPositioningSteps } from './classroom-positioning';

// Combine all classroom environment steps
export const classroomEnvironmentSteps: ActionStep[] = [
  ...classroomRulesSteps,
  ...emotionalEnvironmentSteps, 
  ...behaviorManagementSteps,
  ...classroomPositioningSteps
];
