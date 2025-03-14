
// Define the types used across action steps data files
export interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty?: string; // Added difficulty property as optional
  timeEstimate: string;
  resources: { title: string; url: string }[];
  practiceTasks?: string[]; // Added optional practice tasks array
}

export interface Competence {
  id: string;
  title: string;
}
