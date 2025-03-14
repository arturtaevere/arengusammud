
import { actionStepsDetails } from './actionStepData';

// Local storage utils
export const getVideoStorageKey = (stepId: string) => `action_step_video_${stepId}`;

// Re-export the action steps data and type
export { actionStepsDetails };
export type { ActionStepDetails } from './actionStepData';
