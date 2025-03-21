
import React, { createContext } from 'react';
import { AuthContextType } from './types';
import { useAuthState } from './useAuthState';
import { useAuthMethods } from './useAuthMethods';
import { useProfileManagement } from './useProfileManagement';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  session: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {}, 
  updateProfileImage: async () => {}, 
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
  const { 
    user, 
    setUser, 
    isLoading, 
    session,
    pendingVerificationEmail, 
    setPendingVerificationEmail,
    loadUserProfile 
  } = useAuthState();

  const {
    login,
    signup,
    logout,
    verifyEmail,
    resendVerificationEmail,
  } = useAuthMethods(loadUserProfile, setPendingVerificationEmail);

  const {
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail,
    refreshUsers,
  } = useProfileManagement(user, setUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        session,
        login,
        signup,
        logout,
        updateProfileImage,
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
