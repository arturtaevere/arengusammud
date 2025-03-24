
import { supabase } from '@/integrations/supabase/client';
import { generateObservationId } from './utils';
import { saveObservation } from './observations';
import { StoredObservation } from './types';

// Generate sample observations for teacher feedback form demo
export const generateSampleObservations = async (teacherName: string): Promise<void> => {
  // Get the current authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('Cannot generate sample observations without authenticated user');
    return;
  }
  
  // Check if we already have observations for this teacher in Supabase
  const { data: existingObservations, error: fetchError } = await supabase
    .from('observations')
    .select('id')
    .eq('teacher', teacherName)
    .eq('has_feedback', true);

  if (fetchError) {
    console.error('Error checking for existing observations:', fetchError);
    return;
  } else if (existingObservations && existingObservations.length > 0) {
    return; // Don't create duplicates if samples already exist in Supabase
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
      selectedActionStepId: "step10",
      selectedActionStepText: "Klassis liikumine: Liigu tunni jooksul teadlikult klassiruumis ringi, et jõuda kõigi õpilasteni.",
      coachName: "Mari Mets",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      user_id: user.id
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
      selectedActionStepId: "step1",
      selectedActionStepText: "Tunni alguses reeglite meeldetuletus: Tuleta tunni alguses meelde klassi reeglid, et luua toetav õpikeskkond.",
      coachName: "Jaan Tamm",
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
      user_id: user.id,
      teacherReflection: {
        reflection: "Märkasin, et õpilased hakkasid oma töid põhjalikumalt üle vaatama enne esitamist. Eriti oli näha arengut nõrgemate õpilaste puhul, kes varem ei osanud oma vigu märgata.",
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
      }
    }
  ];
  
  // Save sample observations to Supabase
  for (const observation of sampleObservations) {
    await saveObservation(observation);
    
    // If there's a teacher reflection, save it separately
    if (observation.teacherReflection) {
      await supabase
        .from('reflections')
        .insert({
          observation_id: observation.id,
          reflection: observation.teacherReflection.reflection,
          submitted_at: new Date(observation.teacherReflection.submittedAt).toISOString(),
          user_id: user.id
        });
    }
  }
};
