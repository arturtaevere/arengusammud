
// Define the types used across action steps data files
export interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  timeEstimate: string;
  resources: { title: string; url: string }[];
}

export interface Competence {
  id: string;
  title: string;
}
