
import React, { createContext, useState } from 'react';
import { AuthContextType, User, UserWithPassword } from './types';
import { USER_STORAGE_KEY } from './constants';
import { useAuthInit } from './useAuthInit';
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
  verifyEmail: async () => false,
  resendVerificationEmail: async () => {},
  pendingVerificationEmail: null,
  setPendingVerificationEmail: () => {},
  deleteUserByEmail: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  
  // Custom hooks for auth functionality
  const {
    users,
    setUsers,
    verificationTokens,
    setVerificationTokens,
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    verifyEmail,
    resendVerificationEmail,
    deleteUserByEmail
  } = useAuthActions();

  // Initialize auth state
  useAuthInit(
    setUser,
    setUsers,
    setVerificationTokens,
    setIsLoading,
    setPendingVerificationEmail
  );

  // Handle user login
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
    } catch (error) {
      if (error instanceof Error && error.message.includes('E-posti aadress pole kinnitatud')) {
        setPendingVerificationEmail(email);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user signup
  const handleSignup = async (name: string, email: string, password: string, role: 'coach' | 'teacher', school?: string) => {
    setIsLoading(true);
    try {
      const newEmail = await signup(name, email, password, role, school);
      setPendingVerificationEmail(newEmail);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  // Handle profile image update
  const handleUpdateProfileImage = (imageUrl: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: imageUrl };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      updateProfileImage(user.id, imageUrl);
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
        verifyEmail,
        resendVerificationEmail,
        pendingVerificationEmail,
        setPendingVerificationEmail,
        deleteUserByEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
