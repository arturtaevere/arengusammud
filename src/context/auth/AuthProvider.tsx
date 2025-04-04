import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, User } from './types';
import { useAuthInit } from './useAuthInit';
import { useAuthActions } from './useAuthActions';
import { supabase } from '@/integrations/supabase/client';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => false,
  updateProfileImage: () => {},
  getAllUsers: async () => [],
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
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  
  // Custom hooks for auth functionality
  const {
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail
  } = useAuthActions();

  // Initialize auth state
  useAuthInit(
    setUser,
    setIsLoading
  );

  // Handle user login
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user signup
  const handleSignup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string) => {
    setIsLoading(true);
    try {
      await signup(name, email, password, role, school);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout - modify to return success status
  const handleLogout = async () => {
    try {
      // Clear local user state first
      setUser(null);
      
      // Then attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error during logout:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  };

  // Handle profile image update
  const handleUpdateProfileImage = async (imageUrl: string) => {
    if (user) {
      try {
        const updatedUser = await updateProfileImage(user.id, imageUrl);
        if (updatedUser) {
          // Update the user state with the new profile image
          setUser({
            ...user,
            profileImage: imageUrl
          });
        }
      } catch (error) {
        console.error('Error updating profile image in AuthProvider:', error);
      }
    }
  };

  // Stub implementations for verification functions
  const verifyEmail = async (id: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });
      
      return !error;
    } catch (error) {
      console.error("Email verification error:", error);
      return false;
    }
  };

  const resendVerificationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      return !error;
    } catch (error) {
      console.error("Error resending verification email:", error);
      return false;
    }
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
