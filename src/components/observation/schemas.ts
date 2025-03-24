
import { z } from 'zod';

// Form validation schema
export const observationFormSchema = z.object({
  teacherName: z.string().min(2, { message: "Õpetaja nimi on kohustuslik" }),
  date: z.string().min(1, { message: "Kuupäev on kohustuslik" }),
  coachName: z.string().min(2, { message: "Õpipartneri nimi on kohustuslik" }),
  developmentGoal: z.string().optional(),
  actionStep: z.string().optional(),
  combinedNotes: z.string().optional(),
  specificPraise: z.string().optional(),
  nextActionStep: z.string().optional(),
  selectedActionStepText: z.string().optional(),
  selectedActionStepId: z.string().nullable().optional(),
  actionPlan: z.string().optional(),
});

export type ObservationFormValues = z.infer<typeof observationFormSchema>;
