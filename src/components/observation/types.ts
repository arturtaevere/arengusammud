
import { observationFormSchema, ObservationFormValues } from './schemas';
import { mockTeachers, getTeacherDevelopmentGoal, getTeacherActionStep } from './mockTeachers';
import { competencies, getAllActionSteps, getActionStepById } from './competencies';
import { getLastObservedTeacher, saveLastObservedTeacher } from './localStorage';

// Re-export everything for backward compatibility
export {
  observationFormSchema,
  mockTeachers,
  competencies,
  getTeacherDevelopmentGoal,
  getTeacherActionStep,
  getLastObservedTeacher,
  saveLastObservedTeacher,
  getAllActionSteps,
  getActionStepById
};

export type { ObservationFormValues };
