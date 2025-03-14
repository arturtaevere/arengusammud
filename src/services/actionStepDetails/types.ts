
// Define the ActionStepDetails type based on the structure
export type ActionStepDetailBase = {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  reason: string;
  successCriteria: string[];
  practiceTask: string[];
  examples: string;
  videoUrl?: string;
};

// Index signature for dynamic access
export type ActionStepDetailsCollection = {
  [key: string]: ActionStepDetailBase;
};
