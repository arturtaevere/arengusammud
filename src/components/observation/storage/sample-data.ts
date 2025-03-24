
import { StoredObservation } from './types';
import { saveObservation } from './observations';
import { generateObservationId } from './utils';

// Generate sample observations for demo/testing
export const generateSampleObservations = async (teacherName: string): Promise<void> => {
  const currentDate = new Date();
  
  // Sample observation 1 - Complete with feedback
  const observation1: StoredObservation = {
    id: generateObservationId(),
    teacher: teacherName,
    date: new Date(currentDate.setDate(currentDate.getDate() - 5)).toISOString(),
    status: 'Lõpetatud',
    hasFeedback: true,
    competences: ['Klassi juhtimine', 'Õpilaste kaasamine'],
    teacherNotes: 'Õpetaja kasutab hästi gruppide moodustamist. Õpilased on aktiivsed ja kaasatud.',
    studentNotes: 'Õpilased töötavad hästi koos, osalevad aktiivselt aruteludes.',
    specificPraise: 'Tugevad küsimuste esitamise tehnikad, mis kaasavad kogu klassi.',
    developmentGoal: 'Diferentseeritud ülesanded erinevate võimetega õpilastele.',
    actionStep: 'Planeerida vähemalt 3 erinevat ülesande taset igaks tunniks.',
    nextActionStep: 'Kasutada õpilaste vastuseid järgmiste küsimuste loomiseks.',
    coachName: 'Kristi Koolitaja',
    createdAt: new Date().toISOString(),
    user_id: '', // This will be set in the saveObservation function
  };
  
  // Sample observation 2 - Without feedback
  const observation2: StoredObservation = {
    id: generateObservationId(),
    teacher: 'Mari Maasikas',
    date: new Date(currentDate.setDate(currentDate.getDate() - 2)).toISOString(),
    status: 'Vaadeldud',
    hasFeedback: false,
    competences: ['Õppimise hindamine', 'Eesmärkide seadmine'],
    teacherNotes: 'Õpetaja kasutab mitmesuguseid hindamismeetodeid. Tunni eesmärgid on selgelt sõnastatud.',
    studentNotes: 'Õpilased mõistavad, mida nad peavad õppima. Nad hindavad ise oma progressi.',
    specificPraise: '',
    developmentGoal: '',
    actionStep: '',
    nextActionStep: '',
    coachName: teacherName,
    createdAt: new Date().toISOString(),
    user_id: '', // This will be set in the saveObservation function
  };
  
  // Sample observation 3 - Complete with feedback
  const observation3: StoredObservation = {
    id: generateObservationId(),
    teacher: 'Jaan Jõesaar',
    date: new Date(currentDate.setDate(currentDate.getDate() - 10)).toISOString(),
    status: 'Lõpetatud',
    hasFeedback: true,
    competences: ['Õppekavateadlikkus', 'Õppemeetodite mitmekesisus'],
    teacherNotes: 'Õpetaja seob tunni sisu õppekavaga. Kasutab erinevaid õppemeetodeid.',
    studentNotes: 'Õpilased näitavad üles huvi materjali vastu. Aktiivselt osalevad erinevates tegevustes.',
    specificPraise: 'Suurepärane erinevate õpistiilidega arvestamine.',
    developmentGoal: 'Rohkem võimalusi õpilaste koostööks ja diskussiooniks.',
    actionStep: 'Lisada igasse tundi vähemalt üks paaristöö või rühmatöö element.',
    nextActionStep: 'Katsetada debativormis arutelusid.',
    coachName: teacherName,
    createdAt: new Date().toISOString(),
    user_id: '', // This will be set in the saveObservation function
  };
  
  // Save the sample observations
  try {
    await saveObservation(observation1);
    await saveObservation(observation2);
    await saveObservation(observation3);
    console.log('Sample observations added successfully');
  } catch (error) {
    console.error('Error adding sample observations:', error);
    throw error;
  }
};
