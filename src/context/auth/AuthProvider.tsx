
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
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user signup
  const handleSignup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string) => {
    setIsLoading(true);
    try {
      await signup(name, email, password, role, school);
      // Force-refresh users list after signup
      window.dispatchEvent(new CustomEvent('users-updated'));
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

  // Stub implementations for verification functions
  const verifyEmail = async () => {
    console.log("Email verification is disabled");
    return false;
  };

  const resendVerificationEmail = async () => {
    console.log("Email verification is disabled");
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
