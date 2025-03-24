
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const OBSERVATIONS_STORAGE_KEY = 'observations_data'; // Keep for fallback

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
  selectedActionStepId?: string | null;
  selectedActionStepText?: string;
  createdAt: string;
  coachName?: string;
  user_id?: string; // Add user_id for Supabase
  teacherReflection?: {
    reflection: string;
    submittedAt: string;
  };
}

// Get all stored observations
export const getStoredObservations = async (): Promise<StoredObservation[]> => {
  try {
    // Get observations from Supabase
    const { data: observations, error } = await supabase
      .from('observations')
      .select(`
        id,
        teacher,
        subject,
        date,
        status,
        has_feedback,
        competences,
        teacher_notes,
        student_notes,
        specific_praise,
        development_goal,
        action_step,
        next_action_step,
        selected_action_step_id,
        selected_action_step_text,
        coach_name,
        created_at,
        user_id
      `);

    if (error) {
      console.error('Error fetching observations from Supabase:', error);
      return getFallbackObservations();
    }

    // Get reflections for these observations
    const { data: reflections, error: reflectionsError } = await supabase
      .from('reflections')
      .select('*');

    if (reflectionsError) {
      console.error('Error fetching reflections from Supabase:', reflectionsError);
    }

    // Map to our StoredObservation interface
    const mappedObservations: StoredObservation[] = observations.map(obs => {
      // Find the reflection for this observation, if any
      const reflection = reflections?.find(r => r.observation_id === obs.id);
      
      return {
        id: obs.id,
        teacher: obs.teacher,
        subject: obs.subject || undefined,
        date: new Date(obs.date).toISOString(),
        status: obs.status,
        hasFeedback: obs.has_feedback,
        competences: obs.competences || [],
        teacherNotes: obs.teacher_notes || '',
        studentNotes: obs.student_notes || '',
        specificPraise: obs.specific_praise || '',
        developmentGoal: obs.development_goal || '',
        actionStep: obs.action_step || '',
        nextActionStep: obs.next_action_step || '',
        selectedActionStepId: obs.selected_action_step_id || null,
        selectedActionStepText: obs.selected_action_step_text || '',
        coachName: obs.coach_name || undefined,
        createdAt: new Date(obs.created_at).toISOString(),
        user_id: obs.user_id,
        teacherReflection: reflection ? {
          reflection: reflection.reflection,
          submittedAt: new Date(reflection.submitted_at).toISOString()
        } : undefined
      };
    });

    return mappedObservations;
  } catch (error) {
    console.error('Error processing observations from Supabase:', error);
    return getFallbackObservations();
  }
};

// Fallback to localStorage if Supabase fails
const getFallbackObservations = (): StoredObservation[] => {
  console.log('Falling back to localStorage for observations');
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
export const saveObservation = async (observation: StoredObservation): Promise<void> => {
  try {
    if (!observation.user_id) {
      console.error('Cannot save observation without user_id');
      throw new Error('Missing user_id in observation');
    }
    
    // Format the data for Supabase
    const { data, error } = await supabase
      .from('observations')
      .insert({
        id: observation.id,
        teacher: observation.teacher,
        subject: observation.subject,
        date: new Date(observation.date).toISOString(),
        status: observation.status,
        has_feedback: observation.hasFeedback,
        competences: observation.competences,
        teacher_notes: observation.teacherNotes,
        student_notes: observation.studentNotes,
        specific_praise: observation.specificPraise,
        development_goal: observation.developmentGoal,
        action_step: observation.actionStep,
        next_action_step: observation.nextActionStep,
        selected_action_step_id: observation.selectedActionStepId,
        selected_action_step_text: observation.selectedActionStepText,
        coach_name: observation.coachName,
        created_at: new Date(observation.createdAt).toISOString(),
        user_id: observation.user_id
      })
      .select();

    if (error) {
      console.error('Error saving observation to Supabase:', error);
      saveToLocalStorageFallback(observation);
      return;
    }

    console.log('Observation saved to Supabase:', data);
  } catch (error) {
    console.error('Error processing observation save to Supabase:', error);
    saveToLocalStorageFallback(observation);
  }
};

// Fallback to localStorage if Supabase fails
const saveToLocalStorageFallback = (observation: StoredObservation): void => {
  console.log('Falling back to localStorage for saving observation');
  const currentObservations = getFallbackObservations();
  const updatedObservations = [observation, ...currentObservations];
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Update an existing observation
export const updateObservation = async (updatedObservation: StoredObservation): Promise<void> => {
  try {
    if (!updatedObservation.user_id) {
      console.error('Cannot update observation without user_id');
      throw new Error('Missing user_id in observation');
    }
    
    // Format the data for Supabase
    const { error } = await supabase
      .from('observations')
      .update({
        teacher: updatedObservation.teacher,
        subject: updatedObservation.subject,
        date: new Date(updatedObservation.date).toISOString(),
        status: updatedObservation.status,
        has_feedback: updatedObservation.hasFeedback,
        competences: updatedObservation.competences,
        teacher_notes: updatedObservation.teacherNotes,
        student_notes: updatedObservation.studentNotes,
        specific_praise: updatedObservation.specificPraise,
        development_goal: updatedObservation.developmentGoal,
        action_step: updatedObservation.actionStep,
        next_action_step: updatedObservation.nextActionStep,
        selected_action_step_id: updatedObservation.selectedActionStepId,
        selected_action_step_text: updatedObservation.selectedActionStepText,
        coach_name: updatedObservation.coachName,
        user_id: updatedObservation.user_id
      })
      .eq('id', updatedObservation.id);

    if (error) {
      console.error('Error updating observation in Supabase:', error);
      updateInLocalStorageFallback(updatedObservation);
      return;
    }

    // If there's a teacher reflection, update or insert it
    if (updatedObservation.teacherReflection) {
      const user_id = updatedObservation.user_id;
      
      // Check if reflection already exists
      const { data: existingReflection, error: fetchError } = await supabase
        .from('reflections')
        .select('id')
        .eq('observation_id', updatedObservation.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error checking for existing reflection:', fetchError);
      }

      if (existingReflection) {
        // Update existing reflection
        const { error: updateError } = await supabase
          .from('reflections')
          .update({
            reflection: updatedObservation.teacherReflection.reflection,
            submitted_at: new Date(updatedObservation.teacherReflection.submittedAt).toISOString(),
            user_id: user_id
          })
          .eq('id', existingReflection.id);

        if (updateError) {
          console.error('Error updating reflection in Supabase:', updateError);
        }
      } else {
        // Insert new reflection
        const { error: insertError } = await supabase
          .from('reflections')
          .insert({
            observation_id: updatedObservation.id,
            reflection: updatedObservation.teacherReflection.reflection,
            submitted_at: new Date(updatedObservation.teacherReflection.submittedAt).toISOString(),
            user_id: user_id
          });

        if (insertError) {
          console.error('Error inserting reflection to Supabase:', insertError);
        }
      }
    }

    console.log('Observation updated in Supabase');
  } catch (error) {
    console.error('Error processing observation update in Supabase:', error);
    updateInLocalStorageFallback(updatedObservation);
  }
};

// Fallback to localStorage if Supabase fails
const updateInLocalStorageFallback = (updatedObservation: StoredObservation): void => {
  console.log('Falling back to localStorage for updating observation');
  const currentObservations = getFallbackObservations();
  const updatedObservations = currentObservations.map(obs => 
    obs.id === updatedObservation.id ? updatedObservation : obs
  );
  
  localStorage.setItem(
    OBSERVATIONS_STORAGE_KEY,
    JSON.stringify(updatedObservations)
  );
};

// Delete an observation
export const deleteObservation = async (id: string): Promise<void> => {
  try {
    // Delete from Supabase
    const { error } = await supabase
      .from('observations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting observation from Supabase:', error);
      deleteFromLocalStorageFallback(id);
      return;
    }

    console.log('Observation deleted from Supabase');
  } catch (error) {
    console.error('Error processing observation deletion in Supabase:', error);
    deleteFromLocalStorageFallback(id);
  }
};

// Fallback to localStorage if Supabase fails
const deleteFromLocalStorageFallback = (id: string): void => {
  console.log('Falling back to localStorage for deleting observation');
  const currentObservations = getFallbackObservations();
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
    // Fall back to localStorage check
    const storedObservations = getFallbackObservations();
    const hasTeacherObservations = storedObservations.some(
      obs => obs.teacher.toLowerCase() === teacherName.toLowerCase() && obs.hasFeedback
    );
    
    if (hasTeacherObservations) {
      return; // Don't create duplicates if samples already exist
    }
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
