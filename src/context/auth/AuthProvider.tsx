import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, User, UserWithPassword } from './types';
import { USER_STORAGE_KEY, USERS_STORAGE_KEY } from './constants';
import { useAuthInit } from './useAuthInit';
import { useAuthActions } from './useAuthActions';
import { supabase } from '@/integrations/supabase/client';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => { throw new Error('Not implemented'); },
  signup: async () => { throw new Error('Not implemented'); },
  logout: () => {},
  updateProfileImage: () => {},
  getAllUsers: async () => Promise.resolve([]),
  deleteUserByEmail: async () => false,
  
  // Add the stub verification functions
  verifyEmail: async () => false,
  resendVerificationEmail: async () => false,
  pendingVerificationEmail: null,
  setPendingVerificationEmail: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  // Wrap hooks in try/catch to prevent fatal rendering errors
  let authActions: any = {};
  try {
    // Custom hooks for auth functionality
    authActions = useAuthActions();
  } catch (err) {
    console.error('Error initializing auth actions:', err);
    setError(err instanceof Error ? err : new Error(String(err)));
  }
  
  const {
    users,
    saveUsers,
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail
  } = authActions;

  // Initialize auth state
  useEffect(() => {
    try {
      const initAuth = async () => {
        setIsLoading(true);
        try {
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
      initAuth();
      
      // Set up auth state change listener
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state change:", event);
        
        if (event === 'SIGNED_IN' && session) {
          try {
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
          } catch (err) {
            console.error("Error processing auth state change:", err);
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
    } catch (err) {
      console.error("Fatal error in auth setup:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setIsLoading(false);
    }
  }, []);

  // Handle user login
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user signup
  const handleSignup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school: string) => {
    setIsLoading(true);
    console.log('AuthProvider: handleSignup called with', { name, email, role, school });
    try {
      if (!email || !password || !name || !role || !school) {
        console.error('Signup error: Missing required fields', { 
          hasEmail: !!email, 
          hasPassword: !!password, 
          hasName: !!name, 
          hasRole: !!role,
          hasSchool: !!school 
        });
        throw new Error('Kõik väljad on kohustuslikud');
      }
      
      const result = await signup(name, email, password, role, school);
      console.log('AuthProvider: signup result', result);
      // Store the email for verification purposes
      setPendingVerificationEmail(email);
      return result;
    } catch (error) {
      console.error('Signup error in AuthProvider:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear user from state and localStorage
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle profile image update
  const handleUpdateProfileImage = async (imageUrl: string) => {
    if (user) {
      const updatedUser = await updateProfileImage(user.id, imageUrl);
      if (updatedUser) {
        setUser({ ...user, profileImage: imageUrl });
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ ...user, profileImage: imageUrl }));
      }
    }
  };

  // Stub implementations for verification functions
  const verifyEmail = async () => {
    console.log("Email verification is using Supabase's built-in verification");
    return false;
  };

  const resendVerificationEmail = async () => {
    console.log("Email verification is using Supabase's built-in verification");
    return false;
  };

  // If there was a fatal error during initialization, show error message
  if (error) {
    console.error("Fatal auth error - rendering fallback UI:", error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="p-6 rounded-lg shadow-lg bg-background border border-red-500 max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Authentication Error</h2>
          <p className="mb-4 text-foreground">{error.message}</p>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

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
        // Add the verification-related values
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
