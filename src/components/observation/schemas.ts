
import { z } from 'zod';

// Form validation schema
export const observationFormSchema = z.object({
  teacherName: z.string().min(2, { message: "Õpetaja nimi on kohustuslik" }),
  date: z.string().min(1, { message: "Kuupäev on kohustuslik" }),
  coachName: z.string().min(2, { message: "Õpipartneri nimi on kohustuslik" }),
  developmentGoal: z.string().min(10, { message: "Arengueesmärk peab olema vähemalt 10 tähemärki" }),
  actionStep: z.string().min(10, { message: "Arengusamm peab olema vähemalt 10 tähemärki" }),
  teacherNotes: z.string().min(10, { message: "Õpetaja tegevuse märkmed peavad olema vähemalt 10 tähemärki" }),
  studentNotes: z.string().min(10, { message: "Õpilaste tegevuse märkmed peavad olema vähemalt 10 tähemärki" }),
  specificPraise: z.string().min(10, { message: "Kiitus peab olema vähemalt 10 tähemärki" }),
  nextActionStep: z.string().min(10, { message: "Järgmine arengusamm peab olema vähemalt 10 tähemärki" }),
});

export type ObservationFormValues = z.infer<typeof observationFormSchema>;
