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
      developmentGoal: 'Õpilaste individuaalse arengu toetamine läbi diferentseeritud õppetöö ja personaalse tagasiside.',
      actionStep: 'Kasutada igal tööpäeval vähemalt ühel korral diferentseeritud ülesandeid erineva tasemega õpilastele.'
    },
    { 
      id: 't2', 
      name: 'Jaan Kask',
      developmentGoal: 'Digipädevuste integreerimine igapäevasesse õppetöösse ja õpilaste digitaalse kirjaoskuse arendamine.',
      actionStep: 'Rakendada igas tunnis vähemalt üht digivahendit õpilaste aktiivse osaluse suurendamiseks.'
    },
    { 
      id: 't3', 
      name: 'Anna Lepp',
      developmentGoal: 'Koostöise õppimise meetodite rakendamine ja õpilaste omavahelise koostöö soodustamine.',
      actionStep: 'Planeerida ja viia läbi vähemalt kaks rühmatöö ülesannet nädalas, kus õpilased peavad tegema otsuseid ühiselt.'
    },
    { 
      id: 't4', 
      name: 'Peeter Kuusk',
      developmentGoal: 'Reflekteeriva praktika arendamine ja õpetamismeetodite pidev täiustamine tagasiside põhjal.',
      actionStep: 'Küsida igal nädalal struktureeritud tagasisidet õpilastelt ja teha nende põhjal üks konkreetne muudatus õpetamises.'
    },
  ],
  'Järveküla Kool': [
    { 
      id: 't5', 
      name: 'Tiina Tamm',
      developmentGoal: 'Kaasava hariduse põhimõtete rakendamine ja erivajadustega õpilaste toetamine tavaklassis.',
      actionStep: 'Kohandada igas tunnis vähemalt üks õppematerjal vastavalt õpilaste individuaalsetele vajadustele.'
    },
    { 
      id: 't6', 
      name: 'Mart Metsa',
      developmentGoal: 'Õpilaste kriitilise mõtlemise ja probleemilahendusoskuste arendamine läbi projektiõppe.',
      actionStep: 'Rakendada igal nädalal vähemalt üks probleem-põhine õppeülesanne, mis nõuab õpilastelt analüüsi ja lahenduste leidmist.'
    },
    { 
      id: 't7', 
      name: 'Kati Karu',
      developmentGoal: 'Õppimist toetava hindamise põhimõtete rakendamine ja õpilaste eneseregulatsiooni toetamine.',
      actionStep: 'Kasutada igapäevaselt kujundavat tagasisidet ja õpetada õpilasi ise oma õppimist analüüsima ja eesmärke seadma.'
    },
  ],
  'Kilingi-Nõmme Gümnaasium': [
    { 
      id: 't8', 
      name: 'Siim Siil',
      developmentGoal: 'Õpilaste ettevõtlikkuse ja loovuse arendamine läbi innovaatiliste õppemeetodite.',
      actionStep: 'Luua igas kuus vähemalt üks autentne õpiprojekt, mis seob aineõppe päriselu väljakutsete ja võimalustega.'
    },
    { 
      id: 't9', 
      name: 'Liisa Lill',
      developmentGoal: 'Kultuuriteadlikkuse ja globaalsete pädevuste arendamine õppetöös.',
      actionStep: 'Integreerida igasse teemaplokki vähemalt üks globaalne perspektiiv ja mitmekultuuriline element.'
    },
    { 
      id: 't10', 
      name: 'Tõnu Tõru',
      developmentGoal: 'Teaduspõhiste õppemeetodite rakendamine ja õpilaste uurimusliku õppe toetamine.',
      actionStep: 'Rakendada igakuiselt vähemalt üks uurimuslik õppeülesanne, kus õpilased järgivad teadusliku meetodi etappe.'
    },
  ]
};

// Competencies and action steps data
export const competencies = [
  {
    id: 'comp1',
    name: 'Õpikeskkonna kujundamine',
    actionSteps: [
      {
        id: 'as1',
        title: 'Positiivse õpikeskkonna loomine',
        description: 'Klassiruumi füüsilise ja emotsionaalse keskkonna kujundamine õppimist toetavaks.'
      },
      {
        id: 'as2',
        title: 'Reeglite ja rutiinide kehtestamine',
        description: 'Selgete reeglite ja rutiinide loomine ning järjepidev rakendamine.'
      }
    ]
  },
  {
    id: 'comp2',
    name: 'Õppimist toetav hindamine',
    actionSteps: [
      {
        id: 'as3',
        title: 'Kujundava hindamise rakendamine',
        description: 'Kasutada kujundavat hindamist pidevalt ja süsteemselt õppeprotsessi toetamiseks.'
      },
      {
        id: 'as4',
        title: 'Enesehindamise oskuste arendamine',
        description: 'Õpetada õpilastele oma töö analüüsimist ja hindamist.'
      }
    ]
  },
  {
    id: 'comp3',
    name: 'Digipädevuste arendamine',
    actionSteps: [
      {
        id: 'as5',
        title: 'Digitaalsete õppematerjalide kasutamine',
        description: 'Integreerida digitaalseid õppematerjale ja -vahendeid igapäevasesse õppetöösse.'
      },
      {
        id: 'as6',
        title: 'Õpilaste digipädevuste arendamine',
        description: 'Toetada õpilasi digitaalsete oskuste omandamisel läbi praktiliste ülesannete.'
      }
    ]
  },
  {
    id: 'comp4',
    name: 'Koostöö ja kaasamine',
    actionSteps: [
      {
        id: 'as7',
        title: 'Rühmatöö meetodite rakendamine',
        description: 'Kasutada erinevaid rühmatöö meetodeid, et arendada õpilaste koostööoskusi.'
      },
      {
        id: 'as8',
        title: 'Vanemate kaasamine õppeprotsessi',
        description: 'Luua süsteem vanemate regulaarseks kaasamiseks õpilase arengu toetamisse.'
      }
    ]
  },
  {
    id: 'comp5',
    name: 'Õpilaste motivatsiooni toetamine',
    actionSteps: [
      {
        id: 'as9',
        title: 'Sisemise motivatsiooni toetamine',
        description: 'Luua tingimused ja tegevused, mis toetavad õpilaste sisemist motivatsiooni.'
      },
      {
        id: 'as10',
        title: 'Eduelamuse pakkumine kõigile õpilastele',
        description: 'Kujundada õppeülesanded nii, et kõik õpilased saaksid kogeda edu ja arengut.'
      }
    ]
  },
  {
    id: 'comp6',
    name: 'Õppemeetodite mitmekesisus',
    actionSteps: [
      {
        id: 'as11',
        title: 'Aktiivõppe meetodite rakendamine',
        description: 'Kasutada regulaarselt erinevaid aktiivõppe meetodeid õpilaste kaasamiseks.'
      },
      {
        id: 'as12',
        title: 'Projektõppe läbiviimine',
        description: 'Korraldada vähemalt kord õppeperioodis projektõppe vormis õppetegevusi.'
      }
    ]
  },
  {
    id: 'comp7',
    name: 'Eneseanalüüs ja -areng',
    actionSteps: [
      {
        id: 'as13',
        title: 'Regulaarne refleksioon',
        description: 'Pidada õpetamispraktikat analüüsivat päevikut ning teha sellest järeldusi.'
      },
      {
        id: 'as14',
        title: 'Kolleegidelt tagasiside küsimine',
        description: 'Kutsuda regulaarselt kolleege tunde vaatlema ja tagasisidet andma.'
      }
    ]
  },
  {
    id: 'comp8',
    name: 'Kaasav haridus',
    actionSteps: [
      {
        id: 'as15',
        title: 'Individuaalsete õpivajaduste toetamine',
        description: 'Kohandada õppematerjale ja -meetodeid vastavalt õpilaste individuaalsetele vajadustele.'
      },
      {
        id: 'as16',
        title: 'HEV õpilaste kaasamine',
        description: 'Rakendada meetodeid, mis toetavad hariduslike erivajadustega õpilaste kaasamist tavaklassi.'
      }
    ]
  },
  {
    id: 'comp9',
    name: 'Ainetevaheline lõiming',
    actionSteps: [
      {
        id: 'as17',
        title: 'Ainetevaheliste seoste loomine',
        description: 'Tuua õppetöös esile erinevate ainete vahelisi seoseid ja praktilisi rakendusi.'
      },
      {
        id: 'as18',
        title: 'Koostöö teiste aineõpetajatega',
        description: 'Planeerida ja viia läbi lõimitud õppeprojekte koostöös teiste aineõpetajatega.'
      }
    ]
  },
  {
    id: 'comp10',
    name: 'Õppimiskultuuri arendamine',
    actionSteps: [
      {
        id: 'as19',
        title: 'Uurimusliku õppe rakendamine',
        description: 'Julgustada õpilasi iseseisvalt uurima, avastama ja järeldusi tegema.'
      },
      {
        id: 'as20',
        title: 'Vigadest õppimise kultuuri loomine',
        description: 'Kujundada klassiruumis keskkond, kus vigu nähakse õppimisvõimalustena, mitte läbikukkumistena.'
      }
    ]
  }
];

// Functions to get teacher data
export const getTeacherDevelopmentGoal = (teacherName: string): string => {
  for (const school in mockTeachers) {
    const teacher = mockTeachers[school as keyof typeof mockTeachers].find(t => t.name === teacherName);
    if (teacher) {
      return teacher.developmentGoal;
    }
  }
  return '';
};

export const getTeacherActionStep = (teacherName: string): string => {
  for (const school in mockTeachers) {
    const teacher = mockTeachers[school as keyof typeof mockTeachers].find(t => t.name === teacherName);
    if (teacher) {
      return teacher.actionStep;
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

// Helper function to get all action steps as a flat array
export const getAllActionSteps = () => {
  return competencies.flatMap(comp => 
    comp.actionSteps.map(step => ({
      ...step,
      competencyId: comp.id,
      competencyName: comp.name
    }))
  );
};

// Helper function to get action step by id
export const getActionStepById = (id: string) => {
  for (const comp of competencies) {
    const step = comp.actionSteps.find(step => step.id === id);
    if (step) {
      return {
        ...step,
        competencyId: comp.id,
        competencyName: comp.name
      };
    }
  }
  return null;
};
