
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
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfileImage: () => {},
  getAllUsers: async () => Promise.resolve([]), // Fix: Return a Promise that resolves to an empty array
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
  // Add state for pendingVerificationEmail
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  
  // Custom hooks for auth functionality
  const {
    users,
    saveUsers,
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
    try {
      const result = await signup(name, email, password, role, school);
      // Store the email for verification purposes
      setPendingVerificationEmail(email);
      return result;
    } catch (error) {
      console.error('Signup error:', error);
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
