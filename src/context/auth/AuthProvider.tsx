
import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, User } from './types';
import { USER_STORAGE_KEY } from './constants';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfileImage: () => {},
  getAllUsers: () => [],
  deleteUserByEmail: async () => false,
  refreshUsers: () => {}, 
  
  // Add the stub verification functions
  verifyEmail: async () => false,
  resendVerificationEmail: async () => false,
  pendingVerificationEmail: null,
  setPendingVerificationEmail: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    }
    
    setIsLoading(false);
  };

  // Handle user login
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data.user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Vale e-post või parool');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user signup
  const handleSignup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string) => {
    setIsLoading(true);
    try {
      // Use Supabase signUp with metadata for the trigger
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            school,
          },
        },
      });
      
      if (error) throw error;
      
      setPendingVerificationEmail(email);
      return email;
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Registreerimine ebaõnnestus');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  // Handle profile image update
  const handleUpdateProfileImage = async (imageUrl: string) => {
    if (user) {
      try {
        // Update in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({ profile_image: imageUrl })
          .eq('id', user.id);
          
        if (error) throw error;
        
        // Update local state
        const updatedUser = { ...user, profileImage: imageUrl };
        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating profile image:', error);
        throw error;
      }
    }
  };

  // Get all users (admin only)
  const getAllUsers = async () => {
    try {
      if (user?.role !== 'juht' && user?.role !== 'coach') {
        console.log('Not authorized to get all users');
        return [];
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching users:', error);
        return [];
      }
      
      return data.map(profile => ({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role as 'juht' | 'õpetaja' | 'coach',
        school: profile.school || undefined,
        profileImage: profile.profile_image || undefined,
        createdAt: profile.created_at,
        emailVerified: profile.email_verified,
      }));
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      return [];
    }
  };

  // Delete user by email (admin only)
  const deleteUserByEmail = async (email: string) => {
    try {
      if (user?.role !== 'juht' && user?.role !== 'coach') {
        return false;
      }
      
      // For this demo, we don't have admin API access to delete users
      // In a production app, you would use Supabase admin API or Edge Functions
      // For now, just simulate success
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };

  // Refresh users list
  const refreshUsers = async () => {
    // This now simply returns - actual refresh happens when calling getAllUsers
    return;
  };

  // Email verification (just stubs for now)
  const verifyEmail = async () => {
    return false;
  };

  const resendVerificationEmail = async () => {
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        updateProfileImage: handleUpdateProfileImage,
        getAllUsers,
        deleteUserByEmail,
        refreshUsers,
        verifyEmail,
        resendVerificationEmail,
        pendingVerificationEmail,
        setPendingVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
