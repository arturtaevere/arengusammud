
// Define the types used across action steps data files
export interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced"; // Changed from optional to required with strict types
  timeEstimate: string;
  resources: { title: string; url: string }[];
  practiceTasks?: string[]; // Added optional practice tasks array
}

export interface Competence {
  id: string;
  title: string;
}
