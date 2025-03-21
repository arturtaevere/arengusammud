
import { useState, useEffect } from 'react';
import { User } from './types';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { USER_STORAGE_KEY } from './constants';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);

  // Initialize auth state and listen for changes
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        
        if (newSession?.user) {
          await loadUserProfile(newSession.user);
        } else {
          setUser(null);
          localStorage.removeItem(USER_STORAGE_KEY);
        }
        
        setIsLoading(false);
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        await loadUserProfile(currentSession.user);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load user profile from the profiles table
  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Loading profile for user:', supabaseUser.id);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
        
      if (error) {
        console.error('Error loading user profile:', error);
        setIsLoading(false);
        return;
      }
      
      if (profile) {
        console.log('Profile loaded:', profile);
        const userData: User = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role as 'juht' | 'õpetaja' | 'coach',
          school: profile.school || undefined,
          profileImage: profile.profile_image || undefined,
          createdAt: profile.created_at,
          emailVerified: profile.email_verified,
        };
        
        setUser(userData);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      } else {
        console.log('No profile found for user:', supabaseUser.id);
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    }
    
    setIsLoading(false);
  };

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    session,
    pendingVerificationEmail,
    setPendingVerificationEmail,
    loadUserProfile
  };
};
