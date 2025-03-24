
import { supabase } from '@/integrations/supabase/client';
import { StoredObservation } from './types';

// Add teacher reflection to an observation
export const saveReflection = async (
  observationId: string, 
  reflection: string, 
  user_id: string
): Promise<void> => {
  try {
    // Check if reflection already exists
    const { data: existingReflection, error: fetchError } = await supabase
      .from('reflections')
      .select('id')
      .eq('observation_id', observationId)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking for existing reflection:', fetchError);
      throw fetchError;
    }

    if (existingReflection) {
      // Update existing reflection
      const { error: updateError } = await supabase
        .from('reflections')
        .update({
          reflection: reflection,
          submitted_at: new Date().toISOString(),
          user_id: user_id
        })
        .eq('id', existingReflection.id);

      if (updateError) {
        console.error('Error updating reflection in Supabase:', updateError);
        throw updateError;
      }
    } else {
      // Insert new reflection
      const { error: insertError } = await supabase
        .from('reflections')
        .insert({
          observation_id: observationId,
          reflection: reflection,
          submitted_at: new Date().toISOString(),
          user_id: user_id
        });

      if (insertError) {
        console.error('Error inserting reflection to Supabase:', insertError);
        throw insertError;
      }
    }

    console.log('Reflection saved to Supabase');
  } catch (error) {
    console.error('Error processing reflection save to Supabase:', error);
    throw error;
  }
};

// Delete a reflection
export const deleteReflection = async (observationId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('reflections')
      .delete()
      .eq('observation_id', observationId);

    if (error) {
      console.error('Error deleting reflection from Supabase:', error);
      throw error;
    }

    console.log('Reflection deleted from Supabase');
  } catch (error) {
    console.error('Error processing reflection deletion in Supabase:', error);
    throw error;
  }
};
