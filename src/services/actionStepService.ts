
// Re-export the action steps data and type
import { actionStepsDetails } from './actionStepDetails';
export { actionStepsDetails };
export type { ActionStepDetails } from './actionStepDetails';

// Local storage utils (kept for backward compatibility)
export const getVideoStorageKey = (stepId: string) => `action_step_video_${stepId}`;
