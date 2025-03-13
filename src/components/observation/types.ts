
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
    { 
      id: 't1', 
      name: 'Mari Maasikas',
      developmentGoal: 'Õpilaste individuaalse arengu toetamine läbi diferentseeritud õppetöö ja personaalse tagasiside.'
    },
    { 
      id: 't2', 
      name: 'Jaan Kask',
      developmentGoal: 'Digipädevuste integreerimine igapäevasesse õppetöösse ja õpilaste digitaalse kirjaoskuse arendamine.'
    },
    { 
      id: 't3', 
      name: 'Anna Lepp',
      developmentGoal: 'Koostöise õppimise meetodite rakendamine ja õpilaste omavahelise koostöö soodustamine.'
    },
    { 
      id: 't4', 
      name: 'Peeter Kuusk',
      developmentGoal: 'Reflekteeriva praktika arendamine ja õpetamismeetodite pidev täiustamine tagasiside põhjal.'
    },
  ],
  'Järveküla Kool': [
    { 
      id: 't5', 
      name: 'Tiina Tamm',
      developmentGoal: 'Kaasava hariduse põhimõtete rakendamine ja erivajadustega õpilaste toetamine tavaklassis.'
    },
    { 
      id: 't6', 
      name: 'Mart Metsa',
      developmentGoal: 'Õpilaste kriitilise mõtlemise ja probleemilahendusoskuste arendamine läbi projektiõppe.'
    },
    { 
      id: 't7', 
      name: 'Kati Karu',
      developmentGoal: 'Õppimist toetava hindamise põhimõtete rakendamine ja õpilaste eneseregulatsiooni toetamine.'
    },
  ],
  'Kilingi-Nõmme Gümnaasium': [
    { 
      id: 't8', 
      name: 'Siim Siil',
      developmentGoal: 'Õpilaste ettevõtlikkuse ja loovuse arendamine läbi innovaatiliste õppemeetodite.'
    },
    { 
      id: 't9', 
      name: 'Liisa Lill',
      developmentGoal: 'Kultuuriteadlikkuse ja globaalsete pädevuste arendamine õppetöös.'
    },
    { 
      id: 't10', 
      name: 'Tõnu Tõru',
      developmentGoal: 'Teaduspõhiste õppemeetodite rakendamine ja õpilaste uurimusliku õppe toetamine.'
    },
  ]
};

// Function to find a teacher's development goal by name
export const getTeacherDevelopmentGoal = (teacherName: string): string => {
  for (const school in mockTeachers) {
    const teacher = mockTeachers[school as keyof typeof mockTeachers].find(t => t.name === teacherName);
    if (teacher) {
      return teacher.developmentGoal;
    }
  }
  return '';
};

// Functions for localStorage
export const getLastObservedTeacher = (): string | null => {
  return localStorage.getItem('lastObservedTeacher');
};

export const saveLastObservedTeacher = (teacherName: string): void => {
  localStorage.setItem('lastObservedTeacher', teacherName);
};
