
// Types for observation storage
export interface StoredObservation {
  id: string;
  teacher: string;
  subject?: string;
  date: string;
  status: string;
  hasFeedback: boolean;
  competences: string[];
  teacherNotes: string;
  studentNotes: string;
  specificPraise: string;
  developmentGoal: string;
  actionStep: string;
  nextActionStep: string;
  selectedActionStepId?: string | null;
  selectedActionStepText?: string;
  createdAt: string;
  coachName?: string;
  user_id?: string;
  teacherReflection?: {
    reflection: string;
    submittedAt: string;
  };
}
