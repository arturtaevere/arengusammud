
import { useEffect } from 'react';
import { User } from './types';
import { USER_STORAGE_KEY } from './constants';
import { supabase } from '@/integrations/supabase/client';

export const useAuthInit = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // Check for logged in user and set up auth state listener
  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        
        // Get session from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          return;
        }
        
        if (session?.user) {
          // Get user profile from profiles table
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (profileError) {
            console.error("Error fetching profile:", profileError);
            return;
          }
          
          if (profile) {
            const userData: User = {
              id: profile.id,
              name: profile.name,
              email: profile.email,
              role: profile.role as 'juht' | 'õpetaja',
              school: profile.school,
              createdAt: profile.created_at,
              emailVerified: profile.email_verified,
              profileImage: profile.profile_image
            };
            
            setUser(userData);
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
            console.log('User logged in:', userData.name);
          }
        }
      } catch (error) {
        console.error("Error during auth initialization:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check initial user state
    checkUser();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event);
      
      if (event === 'SIGNED_IN' && session) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error("Error fetching profile on auth change:", profileError);
          return;
        }
        
        if (profile) {
          const userData: User = {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: profile.role as 'juht' | 'õpetaja',
            school: profile.school,
            createdAt: profile.created_at,
            emailVerified: profile.email_verified,
            profileImage: profile.profile_image
          };
          
          setUser(userData);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    });
    
    // Clean up the listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setIsLoading]);
};
