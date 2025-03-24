
import { useEffect } from 'react';
import { User } from './types';
import { supabase } from '@/integrations/supabase/client';

export const useAuthInit = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // Check for logged in user using Supabase session
  useEffect(() => {
    // Function to set user from Supabase session
    const setUserFromSession = async (session: any) => {
      if (!session) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        // Get profile data from our profiles table
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
        } else if (profile) {
          // Map Supabase profile to our User type
          const userData: User = {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: profile.role as 'juht' | 'õpetaja',
            school: profile.school || undefined,
            createdAt: profile.created_at,
            emailVerified: profile.email_verified,
            profileImage: profile.profile_image || undefined,
          };
          
          setUser(userData);
          console.log('User logged in:', userData.name);
        }
      } catch (error) {
        console.error('Error processing user profile:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserFromSession(session);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserFromSession(session);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setIsLoading]);
};
