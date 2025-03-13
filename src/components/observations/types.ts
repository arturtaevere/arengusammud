
export interface Observation {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  status: string;
  hasFeedback: boolean;
  competences: string[];
}

export interface Feedback {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  type: string;
  preview: string;
}
