
import { supabase } from '@/integrations/supabase/client';
import { StoredObservation } from './types';
import { 
  getFallbackObservations, 
  saveToLocalStorageFallback, 
  updateInLocalStorageFallback, 
  deleteFromLocalStorageFallback 
} from './utils';

// Get all stored observations
export const getStoredObservations = async (): Promise<StoredObservation[]> => {
  try {
    // Check if we have a user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.log('No active session, returning fallback data');
      return getFallbackObservations();
    }
    
    console.log('Fetching observations with user ID:', session.user.id);
    
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
      `)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error fetching observations from Supabase:', error);
      return getFallbackObservations();
    }

    console.log('Fetched observations from Supabase:', observations);

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

// Save a new observation
export const saveObservation = async (observation: StoredObservation): Promise<void> => {
  try {
    // Check if we have a user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error('Cannot save observation without an active session');
      saveToLocalStorageFallback(observation);
      return;
    }
    
    // Make sure the user_id is set to the current user
    observation.user_id = session.user.id;
    
    console.log('Saving observation to Supabase:', observation);
    
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
        user_id: session.user.id
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

// Update an existing observation
export const updateObservation = async (updatedObservation: StoredObservation): Promise<void> => {
  try {
    // Check if we have a user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error('Cannot update observation without an active session');
      updateInLocalStorageFallback(updatedObservation);
      return;
    }
    
    // Make sure the user_id is set to the current user
    updatedObservation.user_id = session.user.id;
    
    console.log('Updating observation in Supabase:', updatedObservation);
    
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
        user_id: session.user.id
      })
      .eq('id', updatedObservation.id);

    if (error) {
      console.error('Error updating observation in Supabase:', error);
      updateInLocalStorageFallback(updatedObservation);
      return;
    }

    console.log('Observation updated in Supabase');
  } catch (error) {
    console.error('Error processing observation update in Supabase:', error);
    updateInLocalStorageFallback(updatedObservation);
  }
};

// Delete an observation
export const deleteObservation = async (id: string): Promise<void> => {
  try {
    // Check if we have a user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error('Cannot delete observation without an active session');
      deleteFromLocalStorageFallback(id);
      return;
    }
    
    console.log('Deleting observation from Supabase with ID:', id);
    
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
