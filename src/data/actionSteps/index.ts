
import { ActionStep } from './types';
import { category1Steps } from './category1Steps';
import { category2Steps } from './category2Steps';
import { category3Steps } from './category3Steps';
import { category4Steps } from './category4Steps';
import { category5Steps } from './category5Steps';
import { category10Steps } from './category10Steps';

// Export the type
export type { ActionStep };

// Combine all action steps into a single array
export const actionSteps: ActionStep[] = [
  ...category1Steps,
  ...category2Steps,
  ...category3Steps,
  ...category4Steps,
  ...category5Steps,
  ...category10Steps,
];

// Export individual category steps for more granular access
export {
  category1Steps,
  category2Steps,
  category3Steps,
  category4Steps,
  category5Steps,
  category10Steps,
};
