
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
