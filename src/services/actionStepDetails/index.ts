
import { ActionStepDetailBase, ActionStepDetailsCollection } from './types';
import { category1Details } from './category1Details';
import { category2Details } from './category2Details';
import { category10Details } from './category10Details';

// Combine all details into a single object
export const actionStepsDetails: ActionStepDetailsCollection = {
  ...category1Details,
  ...category2Details,
  ...category10Details,
};

// Export types
export type ActionStepDetails = ActionStepDetailBase;
export type { ActionStepDetailsCollection };
