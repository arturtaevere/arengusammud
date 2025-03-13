
import { z } from 'zod';

// Form validation schema
export const observationFormSchema = z.object({
  teacherName: z.string().min(2, { message: "Õpetaja nimi on kohustuslik" }),
  date: z.string().min(1, { message: "Kuupäev on kohustuslik" }),
  developmentGoal: z.string().min(10, { message: "Arengueesmärk peab olema vähemalt 10 tähemärki" }),
  actionStep: z.string().min(10, { message: "Arengusamm peab olema vähemalt 10 tähemärki" }),
  teacherNotes: z.string().min(10, { message: "Õpetaja tegevuse märkmed peavad olema vähemalt 10 tähemärki" }),
  studentNotes: z.string().min(10, { message: "Õpilaste tegevuse märkmed peavad olema vähemalt 10 tähemärki" }),
  specificPraise: z.string().min(10, { message: "Kiitus peab olema vähemalt 10 tähemärki" }),
  improvementAreas: z.string().min(10, { message: "Parendusettepanekud peavad olema vähemalt 10 tähemärki" }),
  nextActionStep: z.string().min(10, { message: "Järgmine arengusamm peab olema vähemalt 10 tähemärki" }),
});

export type ObservationFormValues = z.infer<typeof observationFormSchema>;

// Mock data for teachers
export const mockTeachers = {
  'Arengusammud': [
    { id: 't1', name: 'Mari Maasikas' },
    { id: 't2', name: 'Jaan Kask' },
    { id: 't3', name: 'Anna Lepp' },
    { id: 't4', name: 'Peeter Kuusk' },
  ],
  'Järveküla Kool': [
    { id: 't5', name: 'Tiina Tamm' },
    { id: 't6', name: 'Mart Metsa' },
    { id: 't7', name: 'Kati Karu' },
  ],
  'Kilingi-Nõmme Gümnaasium': [
    { id: 't8', name: 'Siim Siil' },
    { id: 't9', name: 'Liisa Lill' },
    { id: 't10', name: 'Tõnu Tõru' },
  ]
};

// Functions for localStorage
export const getLastObservedTeacher = (): string | null => {
  return localStorage.getItem('lastObservedTeacher');
};

export const saveLastObservedTeacher = (teacherName: string): void => {
  localStorage.setItem('lastObservedTeacher', teacherName);
};
