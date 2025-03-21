
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
    console.log('Initializing auth state');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        
        if (newSession?.user) {
          // Create a basic user object from auth data if profile fetch fails
          const basicUser: User = {
            id: newSession.user.id,
            name: newSession.user.user_metadata?.name || 'User',
            email: newSession.user.email || '',
            role: newSession.user.user_metadata?.role || 'õpetaja',
            school: newSession.user.user_metadata?.school,
            createdAt: newSession.user.created_at,
            emailVerified: true,
          };
          
          // Try to get the full profile, but use basic user data as fallback
          try {
            await loadUserProfile(newSession.user);
          } catch (error) {
            console.error('Failed to load user profile, using basic user data:', error);
            setUser(basicUser);
            setIsLoading(false);
          }
        } else {
          console.log('No authenticated user in session');
          setUser(null);
          localStorage.removeItem(USER_STORAGE_KEY);
          setIsLoading(false);
        }
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession ? 'Session found' : 'No session');
      setSession(currentSession);
      
      if (currentSession?.user) {
        // Create a basic user object from auth data if profile fetch fails
        const basicUser: User = {
          id: currentSession.user.id,
          name: currentSession.user.user_metadata?.name || 'User',
          email: currentSession.user.email || '',
          role: currentSession.user.user_metadata?.role || 'õpetaja',
          school: currentSession.user.user_metadata?.school,
          createdAt: currentSession.user.created_at,
          emailVerified: true,
        };
        
        try {
          await loadUserProfile(currentSession.user);
        } catch (error) {
          console.error('Failed to load user profile, using basic user data:', error);
          setUser(basicUser);
          setIsLoading(false);
        }
      } else {
        console.log('No session found during initial check');
        setIsLoading(false);
      }
    }).catch(error => {
      console.error('Error checking session:', error);
      setIsLoading(false);
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
        
        // Create a minimal user object from auth data
        const userData: User = {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || 'User',
          email: supabaseUser.email || '',
          role: supabaseUser.user_metadata?.role || 'õpetaja',
          school: supabaseUser.user_metadata?.school,
          createdAt: supabaseUser.created_at,
          emailVerified: true,
        };
        
        setUser(userData);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
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
        
        // Create a fallback user from auth data
        const userData: User = {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || 'User',
          email: supabaseUser.email || '',
          role: supabaseUser.user_metadata?.role || 'õpetaja',
          school: supabaseUser.user_metadata?.school,
          createdAt: supabaseUser.created_at,
          emailVerified: true,
        };
        
        setUser(userData);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      setIsLoading(false);
      throw error;
    }
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
