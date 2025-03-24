
export interface Observation {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  status: string;
  hasFeedback: boolean;
  competences: string[];
  coach?: string; // Added coach field
}

export interface Feedback {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  type: string;
  preview: string;
}

// Combined type for unified display of feedback and reflections
export interface CombinedFeedbackItem {
  id: string;
  teacher: string;
  subject?: string;
  date: string;
  type: 'feedback' | 'reflection';
  status?: string;
  hasFeedback?: boolean;
  competences?: string[];
  teacherReflection?: {
    reflection: string;
    submittedAt: string;
  };
  createdAt: string;
  coach?: string;
  actionStep?: string; // Added action step property
}
