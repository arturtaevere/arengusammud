
// This file now re-exports from the modular action-steps directory
import { ActionStep, competences, actionSteps as allActionSteps } from './action-steps';

// Export action steps and competences
export { allActionSteps as actionSteps, competences };
export type { ActionStep };
