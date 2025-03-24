
import React, { createContext } from 'react';
import { AuthContextType } from './types';
import { useAuthSession } from './hooks/useAuthSession';
import { useVerification } from './hooks/useVerification';
import { useAuthHandlers } from './hooks/useAuthHandlers';

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
  // Use custom hooks for different aspects of auth
  const { user, setUser, isLoading, setIsLoading } = useAuthSession();
  const { 
    verifyEmail, 
    resendVerificationEmail, 
    pendingVerificationEmail, 
    setPendingVerificationEmail 
  } = useVerification();
  const { 
    login, 
    signup, 
    logout, 
    updateProfileImage, 
    getAllUsers, 
    deleteUserByEmail 
  } = useAuthHandlers(setUser, setIsLoading, setPendingVerificationEmail);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfileImage,
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
