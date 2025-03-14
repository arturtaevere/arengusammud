
// Common types for action steps data
export interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  resources: {
    title: string;
    url: string;
  }[];
}
