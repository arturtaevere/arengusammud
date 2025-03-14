
// This file now re-exports from the modular action-steps directory
import { ActionStep, Competence, actionSteps as allActionSteps, competences } from './action-steps';

// Debug to see what we're importing
console.log("Importing action steps:", allActionSteps ? allActionSteps.length : 'none');
console.log("Importing competences:", competences ? competences.length : 'none');
console.log("First action step:", allActionSteps && allActionSteps.length > 0 ? allActionSteps[0] : 'none');

// Export action steps and competences
export { allActionSteps as actionSteps, competences };
export type { ActionStep, Competence };

// Add debugging to show what data is being exported
console.log("Exporting action steps count:", allActionSteps ? allActionSteps.length : 0);
console.log("Exporting competences count:", competences ? competences.length : 0);
