
import { useState } from 'react';
import { User } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useAuthActions } from '../useAuthActions';

export const useAuthHandlers = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPendingVerificationEmail: React.Dispatch<React.SetStateAction<string | null>>
) => {
  // Custom hooks for auth functionality
  const {
    login: loginAction,
    signup: signupAction,
    updateProfileImage: updateProfileImageAction,
    deleteUserByEmail
  } = useAuthActions();

  // Handle user login - returns void as per interface
  const handleLogin = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const loggedInUser = await loginAction(email, password);
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

  // Handle user signup - returns void as per interface
  const handleSignup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string): Promise<void> => {
    setIsLoading(true);
    try {
      const emailResult = await signupAction(name, email, password, role, school);
      if (emailResult) {
        setPendingVerificationEmail(emailResult);
      }
    } catch (error) {
      console.error('Signup error in AuthProvider:', error);
      throw error; // Re-throw to handle in the UI
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle profile image update
  const handleUpdateProfileImage = async (imageUrl: string) => {
    const updatedUser = await updateProfileImageAction(imageUrl);
    if (updatedUser) {
      // Cast the role to ensure it matches our union type
      const typedUser: User = {
        ...updatedUser,
        role: updatedUser.role as 'juht' | 'õpetaja'
      };
      setUser(typedUser);
    }
  };

  // Wrap getAllUsers to ensure it returns the correct type
  const handleGetAllUsers = (): User[] => {
    // This is a sync function that returns User[] in the interface,
    // but our implementation is async. For now, we'll provide an empty array
    return [];
  };

  return {
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    updateProfileImage: handleUpdateProfileImage,
    getAllUsers: handleGetAllUsers,
    deleteUserByEmail
  };
};
