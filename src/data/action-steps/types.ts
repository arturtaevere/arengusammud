
// Define the types used across action steps data files
export interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty?: string; // Changed back to optional and any string type
  timeEstimate: string;
  resources: { title: string; url: string }[];
  practiceTasks?: string[]; // Added optional practice tasks array
}

export interface Competence {
  id: string;
  title: string;
}
