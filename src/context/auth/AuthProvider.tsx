
import React, { createContext } from 'react';
import { AuthContextType } from './types';
import { useAuthState } from './useAuthState';
import { useAuthMethods } from './useAuthMethods';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  session: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {}, 
  verifyEmail: async () => false,
  resendVerificationEmail: async () => false,
  pendingVerificationEmail: null,
  setPendingVerificationEmail: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, 
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

  console.log('AuthProvider state:', { 
    isAuthenticated: !!user, 
    isLoading, 
    user: user ? `${user.name} (${user.email})` : 'null' 
  });

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
