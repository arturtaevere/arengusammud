
// This file now re-exports from the modular action-steps directory
import { ActionStep, Competence, actionSteps as allActionSteps, competences } from './action-steps';

// Export action steps and competences
export { allActionSteps as actionSteps, competences };
export type { ActionStep, Competence };

// Add debugging to show what data is being exported
console.log("Exporting action steps count:", allActionSteps.length);
console.log("Exporting competences count:", competences.length);
