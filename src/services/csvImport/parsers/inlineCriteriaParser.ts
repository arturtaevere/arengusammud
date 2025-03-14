
import { ActionStepDetailsCollection } from '../../actionStepDetails/types';

/**
 * Extracts criteria and tasks from lines that start with specific prefixes
 */
export function parseInlineCriteriaAndTasks(
  lines: string[],
  existingData: ActionStepDetailsCollection
): ActionStepDetailsCollection {
  if (!existingData || Object.keys(existingData).length === 0) {
    return {};
  }
  
  console.log('Checking for inline criteria and tasks');
  
  // Get the last added step ID to associate criteria and tasks
  const stepIds = Object.keys(existingData);
  if (stepIds.length === 0) return existingData;
  
  let currentStepId = stepIds[stepIds.length - 1];
  
  // Process each line looking for inline criteria and tasks
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Check for criteria lines
    if (line.match(/^Edukriteerium[;:]/i)) {
      const criterion = line.replace(/^Edukriteerium[;:]/i, '').trim();
      if (criterion && currentStepId && existingData[currentStepId]) {
        if (!existingData[currentStepId].successCriteria) {
          existingData[currentStepId].successCriteria = [];
        }
        existingData[currentStepId].successCriteria.push(criterion);
        console.log(`Added inline success criterion to ${currentStepId}: ${criterion}`);
      }
    }
    
    // Check for task lines
    else if (line.match(/^Harjutusülesanne[;:]/i)) {
      const task = line.replace(/^Harjutusülesanne[;:]/i, '').trim();
      if (task && currentStepId && existingData[currentStepId]) {
        if (!existingData[currentStepId].practiceTask) {
          existingData[currentStepId].practiceTask = [];
        }
        existingData[currentStepId].practiceTask.push(task);
        console.log(`Added inline practice task to ${currentStepId}: ${task}`);
      }
    }
  }
  
  return existingData;
}
