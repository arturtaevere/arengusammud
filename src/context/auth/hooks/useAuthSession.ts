
import { useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const useAuthSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from Supabase
  useEffect(() => {
    let subscription: any;

    const initAuth = async () => {
      setIsLoading(true);
      
      try {
        // First set up auth listener to catch any auth state changes during initialization
        const { data } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.id);
            
            if (!session) {
              setUser(null);
              setIsLoading(false);
              return;
            }
            
            if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
              try {
                // Get user profile on sign in or update
                const { data: profile, error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .maybeSingle(); // Changed from single() to maybeSingle() to handle missing profiles
                  
                if (error) {
                  console.error('Error fetching user profile on auth change:', error);
                  setUser(null);
                } else if (profile) {
                  const userProfile: User = {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    role: profile.role as 'juht' | 'õpetaja',
                    school: profile.school || undefined,
                    createdAt: profile.created_at,
                    emailVerified: profile.email_verified || false,
                    profileImage: profile.profile_image || undefined
                  };
                  console.log('Setting user from auth listener:', userProfile);
                  setUser(userProfile);
                }
              } finally {
                setIsLoading(false);
              }
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
              setIsLoading(false);
            }
          }
        );
        
        subscription = data.subscription;
        
        // Then get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        // If we have a session, get the user profile
        if (session?.user) {
          console.log('Found existing session for user:', session.user.id);
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle(); // Changed from single() to maybeSingle()
            
          if (error) {
            console.error('Error fetching user profile during init:', error);
            setUser(null);
          } else if (profile) {
            const userProfile: User = {
              id: profile.id,
              name: profile.name,
              email: profile.email,
              role: profile.role as 'juht' | 'õpetaja', 
              school: profile.school || undefined,
              createdAt: profile.created_at,
              emailVerified: profile.email_verified || false,
              profileImage: profile.profile_image || undefined
            };
            console.log('Setting user from session check:', userProfile);
            setUser(userProfile);
          } else {
            console.log('No profile found for user, not logging out');
            // Don't force logout if profile not found
            setUser(null);
          }
        } else {
          console.log('No existing session found');
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
    
    // Return function to clean up subscription
    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return { user, setUser, isLoading, setIsLoading };
};
