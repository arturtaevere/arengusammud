
// Utility functions for storing and retrieving observation data from localStorage

const OBSERVATIONS_STORAGE_KEY = 'observations_data';

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
  createdAt: string;
  coachName?: string; // Add coach name field
  teacherReflection?: {
    positiveImpact: string;
    challengesFaced: string;
    habitFormation: string;
    submittedAt: string;
  };
}

// Get all stored observations
export const getStoredObservations = (): StoredObservation[] => {
  const data = localStorage.getItem(OBSERVATIONS_STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing observations from localStorage:', error);
    return [];
  }
};

// Save a new observation
export const saveObservation = (observation: StoredObservation): void => {
  const currentObservations = getStoredObservations();
  const updatedObservations = [observation, ...currentObservations];
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Update an existing observation
export const updateObservation = (updatedObservation: StoredObservation): void => {
  const currentObservations = getStoredObservations();
  const updatedObservations = currentObservations.map(obs => 
    obs.id === updatedObservation.id ? updatedObservation : obs
  );
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Delete an observation
export const deleteObservation = (id: string): void => {
  const currentObservations = getStoredObservations();
  const updatedObservations = currentObservations.filter(obs => obs.id !== id);
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Generate a unique ID for new observations
export const generateObservationId = (): string => {
  return `obs_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Generate sample observations for teacher feedback form demo
export const generateSampleObservations = (teacherName: string): void => {
  const currentObservations = getStoredObservations();
  
  // Check if we already have observations for this teacher
  const hasTeacherObservations = currentObservations.some(
    obs => obs.teacher.toLowerCase() === teacherName.toLowerCase() && obs.hasFeedback
  );
  
  if (hasTeacherObservations) {
    return; // Don't create duplicates if samples already exist
  }
  
  const competencesList = [
    ["Õpikeskkonna kujundamine", "Õppimist toetav suhtlemine"],
    ["Õppimise juhtimine", "Tagasiside ja hindamine"],
    ["Professionaalne enesearendamine", "Digipädevused"]
  ];
  
  const sampleObservations: StoredObservation[] = [
    {
      id: generateObservationId(),
      teacher: teacherName,
      subject: "Matemaatika",
      date: new Date().toISOString(),
      status: "Lõpetatud",
      hasFeedback: true,
      competences: competencesList[0],
      teacherNotes: "Õpetaja selgitas ülesande lahenduskäiku detailselt. Jagas õpilased gruppidesse ja toetas neid, liikudes klassis ringi.",
      studentNotes: "Õpilased töötasid aktiivselt. Mõned õpilased vajasid lisaselgitusi, kuid enamik töötas iseseisvalt.",
      specificPraise: "Hästi läbi mõeldud grupijaotus, mis toetas erinevate võimetega õpilasi. Eriti positiivne oli see, kuidas õpetaja julgustas õpilasi oma mõttekäiku selgitama.",
      developmentGoal: "Suurendada õpilaste iseseisvust ülesannete lahendamisel.",
      actionStep: "Kasutada rohkem avatud küsimusi, mis suunavad õpilasi ise lahendusi leidma.",
      nextActionStep: "Katsetada uut küsimuste esitamise tehnikat, mis suunab õpilasi iseseisvalt mõtlema. Valmistada ette 2-3 probleemülesannet, mida saab lahendada erinevate lähenemistega.",
      coachName: "Mari Mets", // Add sample coach name
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week ago
    },
    {
      id: generateObservationId(),
      teacher: teacherName,
      subject: "Eesti keel",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
      status: "Lõpetatud",
      hasFeedback: true,
      competences: competencesList[1],
      teacherNotes: "Õpetaja andis õpilastele tagasisidet nende kirjalikele töödele. Selgitas hindamiskriteeriume ja andis soovitusi paremaks soorituseks.",
      studentNotes: "Õpilased kuulasid tähelepanelikult ja esitasid küsimusi. Mõned õpilased tegid parandusi oma töödes kohapeal.",
      specificPraise: "Väga hästi läbi mõeldud tagasiside, mis oli konkreetne ja arendav. Õpilased said selged juhised, mida ja kuidas parandada.",
      developmentGoal: "Rakendada enesehindamist õppeprotsessis.",
      actionStep: "Kasutada hindamismudeleid, mis võimaldavad õpilastel oma tööd ise hinnata enne õpetaja tagasisidet.",
      nextActionStep: "Koostada enesehindamise küsimustik, mida õpilased saavad kasutada enne lõplikku töö esitamist. Tutvustada seda järgmises tunnis ja lasta õpilastel katsetada.",
      coachName: "Jaan Tamm", // Add sample coach name
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
      teacherReflection: {
        positiveImpact: "Märkasin, et õpilased hakkasid oma töid põhjalikumalt üle vaatama enne esitamist. Eriti oli näha arengut nõrgemate õpilaste puhul, kes varem ei osanud oma vigu märgata.",
        challengesFaced: "Alguses oli keeruline õpilasi motiveerida enesehindamisega tegelema, kuna see tundus neile lisatööna. Samuti oli väljakutse leida tasakaal liiga kriitilise ja liiga pealiskaudse enesehindamise vahel.",
        habitFormation: "Plaanin jätkata igas tunnis 5-minutilise eneserefleksiooni ajaga. Samuti olen loonud klassile veebikeskkonna, kus nad saavad oma arengut jälgida ja tagasisidet anda.",
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
      }
    }
  ];
  
  const updatedObservations = [...sampleObservations, ...currentObservations];
  localStorage.setItem(OBSERVATIONS_STORAGE_KEY, JSON.stringify(updatedObservations));
};
