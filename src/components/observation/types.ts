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

// Updated competencies to match the "Õpieesmärgid" page
export const competencies = [
  {
    id: 'comp1',
    name: 'Hooliva ja arengut toetava õpikeskkonna loomine',
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
    name: 'Kindlate ja harjumuspäraste tegevuste korraldamine klassis',
    actionSteps: [
      {
        id: 'as3',
        title: 'Tunni struktuuri loomine',
        description: 'Luua selge ja korduv tunni struktuur, mis toetab õppimist ja vähendab segavaid tegureid.'
      },
      {
        id: 'as4',
        title: 'Üleminekute haldamine',
        description: 'Efektiivsed strateegiad ühelt tegevuselt teisele üleminekuks.'
      }
    ]
  },
  {
    id: 'comp3',
    name: 'Tundide ja õppimise kavandamine õpieesmärkidest lähtuvalt',
    actionSteps: [
      {
        id: 'as5',
        title: 'Selgete õpieesmärkide seadmine',
        description: 'Mõõdetavate ja saavutatavate õpieesmärkide sõnastamine.'
      },
      {
        id: 'as6',
        title: 'Hindamise joondamine eesmärkidega',
        description: 'Tagada, et hindamisviisid mõõdaksid seatud õpieesmärkide saavutamist.'
      }
    ]
  },
  {
    id: 'comp4',
    name: 'Kaasamõtlemise ja pingutamise soodustamine',
    actionSteps: [
      {
        id: 'as7',
        title: 'Õpilaste aktiivne kaasamine',
        description: 'Strateegiad, mis tagavad kõigi õpilaste vaimse hõivatuse ja kaasatuse.'
      },
      {
        id: 'as8',
        title: 'Väljakutseid pakkuvate ülesannete loomine',
        description: 'Ülesannete diferentseerimine ja pingutust nõudvate elementide lisamine.'
      }
    ]
  },
  {
    id: 'comp5',
    name: 'Iseseisva töö kavandamine',
    actionSteps: [
      {
        id: 'as9',
        title: 'Iseseisva töö juhendite loomine',
        description: 'Selgete ja detailsete juhendite koostamine iseseisvaks tööks.'
      },
      {
        id: 'as10',
        title: 'Iseseisva õppimise oskuste arendamine',
        description: 'Õpilaste toetamine enesejuhtimise ja iseseisva õppimise oskuste omandamisel.'
      }
    ]
  },
  {
    id: 'comp6',
    name: 'Õppesisu meeldejääv edasiandmine õpilastele',
    actionSteps: [
      {
        id: 'as11',
        title: 'Mitmekesiste esitlusviiside kasutamine',
        description: 'Erinevate esitlusviiside ja -vahendite kasutamine õppesisu edastamiseks.'
      },
      {
        id: 'as12',
        title: 'Keeruliste kontseptsioonide lihtsustamine',
        description: 'Abstraktsete või keeruliste mõistete selgitamine arusaadavalt ja seostamine õpilastele tuttavaga.'
      }
    ]
  },
  {
    id: 'comp7',
    name: 'Andmete kogumine õppematerjali omandamise kohta',
    actionSteps: [
      {
        id: 'as13',
        title: 'Diagnostiliste hindamismeetodite kasutamine',
        description: 'Õpilaste eelteadmiste ja oskuste kaardistamine.'
      },
      {
        id: 'as14',
        title: 'Õppeprotsessi jälgimine',
        description: 'Jooksvate andmete kogumine õpilaste edu ja väljakutsete kohta õppimise käigus.'
      }
    ]
  },
  {
    id: 'comp8',
    name: 'Tagasiside andmine õpilastele',
    actionSteps: [
      {
        id: 'as15',
        title: 'Konkreetse ja konstruktiivse tagasiside andmine',
        description: 'Spetsiifilise ja edasiviiva tagasiside pakkumine õpilastele.'
      },
      {
        id: 'as16',
        title: 'Õigeaegse tagasiside andmine',
        description: 'Tagasiside andmine õigel ajal, et toetada õppimist ja arengut.'
      }
    ]
  },
  {
    id: 'comp9',
    name: 'Õpilaste kaasamine hindamisprotsessi',
    actionSteps: [
      {
        id: 'as17',
        title: 'Enesehindamise juhendamine',
        description: 'Õpilaste oma töö analüüsimise ja hindamise oskuste arendamine.'
      },
      {
        id: 'as18',
        title: 'Vastastikuse hindamise rakendamine',
        description: 'Õpilaste üksteise töö konstruktiivse hindamise korraldamine.'
      }
    ]
  },
  {
    id: 'comp10',
    name: 'Ennastjuhtiva õppija toetamine',
    actionSteps: [
      {
        id: 'as19',
        title: 'Tõhusa õppimisviisi avamine',
        description: 'Selgitan õpilastele, et tõhusad õopijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.'
      },
      {
        id: 'as20',
        title: 'Emotsionaalsete pingete äratundmine',
        description: 'Õpetan õpilasi ära tundma oma emotsionaalseid pingeid õppimisel ja nendega toime tulema.'
      },
      {
        id: 'as21',
        title: 'Emotsionaalsete pingete maandamine',
        description: 'Õpetan õpilastele tehnikaid, mis aitavad emotsionaalsete pingetega toime tulla.'
      },
      {
        id: 'as22',
        title: 'Abi küsimise õpetamine',
        description: 'Õpetan õpilasi abi küsima ja juhendama neid, kuidas ja kellelt abi küsida.'
      },
      {
        id: 'as23',
        title: 'Õpilastele valikute pakkumine',
        description: 'Pakun õpilastele valikuvõimalusi, et nad saaksid oma õppimist ise juhtida.'
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
