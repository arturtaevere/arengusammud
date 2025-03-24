
import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, User } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useAuthActions } from './useAuthActions';

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
  
  // Verification functions
  verifyEmail: async () => false,
  resendVerificationEmail: async () => false,
  pendingVerificationEmail: null,
  setPendingVerificationEmail: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // State for pendingVerificationEmail
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  
  // Custom hooks for auth functionality
  const {
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail
  } = useAuthActions();

  // Initialize auth state from Supabase
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        // If we have a session, get the user profile
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (error) {
            console.error('Error fetching user profile:', error);
            setUser(null);
          } else {
            const userProfile: User = {
              id: profile.id,
              name: profile.name,
              email: profile.email,
              role: profile.role as 'juht' | 'õpetaja', // Cast the role to the expected union type
              school: profile.school || undefined,
              createdAt: profile.created_at,
              emailVerified: profile.email_verified || false,
              profileImage: profile.profile_image || undefined
            };
            setUser(userProfile);
          }
        } else {
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
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (!session) {
          setUser(null);
          return;
        }
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          // Get user profile on sign in or update
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (error) {
            console.error('Error fetching user profile on auth change:', error);
            setUser(null);
          } else {
            const userProfile: User = {
              id: profile.id,
              name: profile.name,
              email: profile.email,
              role: profile.role as 'juht' | 'õpetaja', // Cast the role to the expected union type
              school: profile.school || undefined,
              createdAt: profile.created_at,
              emailVerified: profile.email_verified || false,
              profileImage: profile.profile_image || undefined
            };
            setUser(userProfile);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Handle user login - modified to handle void return type
  const handleLogin = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser) {
        // Cast the role to ensure it matches our union type
        const typedUser: User = {
          ...loggedInUser,
          role: loggedInUser.role as 'juht' | 'õpetaja'
        };
        setUser(typedUser);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user signup - modified to handle void return type
  const handleSignup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string): Promise<void> => {
    setIsLoading(true);
    try {
      await signup(name, email, password, role, school);
      // Don't need to return anything for void return type
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    setUser(null);
  };

  // Handle profile image update
  const handleUpdateProfileImage = async (imageUrl: string) => {
    if (user) {
      const updatedUser = await updateProfileImage(user.id, imageUrl);
      if (updatedUser) {
        // Cast the role to ensure it matches our union type
        const typedUser: User = {
          ...updatedUser,
          role: updatedUser.role as 'juht' | 'õpetaja'
        };
        setUser(typedUser);
      }
    }
  };

  // Wrap getAllUsers to ensure it returns the correct type
  const handleGetAllUsers = (): User[] => {
    // This is a sync function that returns User[] in the interface,
    // but our implementation is async. For now, we'll provide an empty array
    // and then update it when the async operation completes.
    return [];
  };

  // Email verification functions
  const verifyEmail = async (id: string, token: string) => {
    console.log("Email verification is handled by Supabase Auth");
    return true;
  };

  const resendVerificationEmail = async (email: string) => {
    if (pendingVerificationEmail) {
      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: pendingVerificationEmail,
        });
        
        if (error) throw error;
        
        return true;
      } catch (error) {
        console.error('Error resending verification email:', error);
        return false;
      }
    }
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
        getAllUsers: handleGetAllUsers,
        deleteUserByEmail,
        // Verification-related values
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
