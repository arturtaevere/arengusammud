
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserWithPassword } from './types';
import { USERS_STORAGE_KEY } from './constants';
import { useUserAuthentication } from './useUserAuthentication';
import { useUserProfile } from './useUserProfile';

export const useAuthActions = () => {
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const { toast } = useToast();
  
  // Helper function for saving users that we can pass to other hooks
  const saveUsers = (updatedUsers: UserWithPassword[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };
  
  // Authentication hooks
  const { login, signup } = useUserAuthentication();
  const { updateProfileImage, getAllUsers, deleteUserByEmail } = useUserProfile(users, saveUsers);

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
  }, []);

  return {
    users,
    setUsers,
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail,
  };
};
