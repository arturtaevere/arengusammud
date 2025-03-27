
import { supabase } from '@/integrations/supabase/client';
import { StandaloneReflection } from './types';
import { useToast } from '@/hooks/use-toast';

// Get all reflections for the current user
export const getReflections = async (): Promise<StandaloneReflection[]> => {
  try {
    const { data, error } = await supabase
      .from('standalone_reflections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reflections:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getReflections:', error);
    return [];
  }
};

// Create a new reflection
export const createReflection = async (
  reflectionData: Pick<StandaloneReflection, 'title' | 'reflection'>
): Promise<StandaloneReflection | null> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('No user found');
      return null;
    }
    
    // Add the user_id to the reflection data
    const completeData = {
      ...reflectionData,
      user_id: user.id
    };
    
    const { data, error } = await supabase
      .from('standalone_reflections')
      .insert(completeData)
      .select()
      .single();

    if (error) {
      console.error('Error creating reflection:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createReflection:', error);
    return null;
  }
};

// Get a single reflection by ID
export const getReflectionById = async (id: string): Promise<StandaloneReflection | null> => {
  try {
    const { data, error } = await supabase
      .from('standalone_reflections')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching reflection:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getReflectionById:', error);
    return null;
  }
};

// Update an existing reflection
export const updateReflection = async (
  id: string,
  reflectionData: Partial<StandaloneReflection>
): Promise<StandaloneReflection | null> => {
  try {
    const { data, error } = await supabase
      .from('standalone_reflections')
      .update({ ...reflectionData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating reflection:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateReflection:', error);
    return null;
  }
};

// Delete a reflection
export const deleteReflection = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('standalone_reflections')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting reflection:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteReflection:', error);
    return false;
  }
};
