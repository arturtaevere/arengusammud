import { ActionStepDetailBase, ActionStepDetailsCollection } from '../actionStepDetails/types';

// Define the expected CSV columns
export type CSVActionStepRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  successCriteria: string;
  practiceTask: string;
  // Other fields can be added later
  reason?: string;
  examples?: string;
  videoUrl?: string;
};
