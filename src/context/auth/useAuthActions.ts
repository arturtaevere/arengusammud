
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserWithPassword } from './types';
import { USERS_STORAGE_KEY } from './constants';
import { useTokenManagement } from './useTokenManagement';
import { useUserAuthentication } from './useUserAuthentication';
import { useUserProfile } from './useUserProfile';
import { useEmailVerification } from './useEmailVerification';

export const useAuthActions = () => {
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const { toast } = useToast();

  // Custom hooks
  const { verificationTokens, setVerificationTokens, saveVerificationTokens, generateVerificationToken } = useTokenManagement();
  
  // Helper function for saving users that we can pass to other hooks
  const saveUsers = (updatedUsers: UserWithPassword[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };
  
  // Authentication hooks
  const { login, signup } = useUserAuthentication();
  const { updateProfileImage, getAllUsers, deleteUserByEmail } = useUserProfile(users, saveUsers);
  const { verifyEmail, resendVerificationEmail } = useEmailVerification(users, saveUsers, generateVerificationToken);

  // Load initial data from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error('Error parsing users:', error);
      }
    }

    const storedTokens = localStorage.getItem('verification_tokens');
    if (storedTokens) {
      try {
        setVerificationTokens(JSON.parse(storedTokens));
      } catch (error) {
        console.error('Error parsing tokens:', error);
      }
    }
  }, []);

  return {
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
    deleteUserByEmail,
  };
};
