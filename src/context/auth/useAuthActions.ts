
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserWithPassword } from './types';
import { USERS_STORAGE_KEY } from './constants';
import { useUserAuthentication } from './useUserAuthentication';
import { useUserProfile } from './useUserProfile';

export const useAuthActions = () => {
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const { toast } = useToast();
  
  const saveUsers = (updatedUsers: UserWithPassword[]) => {
    console.log('Saving users to state and localStorage:', {
      currentUsers: users.length,
      updatedUsers: updatedUsers.length,
      emails: updatedUsers.map(u => u.email)
    });
    
    try {
      // First update localStorage
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      
      // Then update state
      setUsers(updatedUsers);
      
      // Dispatch events to notify other components
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('users-updated'));
      
      console.log('Successfully saved users and dispatched events');
    } catch (error) {
      console.error('Error in saveUsers:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save user data",
      });
    }
  };

  useEffect(() => {
    const loadUsers = () => {
      try {
        const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
        if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          console.log('Loading users in useAuthActions:', {
            count: parsedUsers.length,
            emails: parsedUsers.map((u: UserWithPassword) => u.email)
          });
          setUsers(parsedUsers);
        }
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    // Load initial users
    loadUsers();
    
    // Set up event listeners
    const handleUsersUpdated = () => {
      console.log('users-updated event received in useAuthActions');
      loadUsers();
    };
    
    window.addEventListener('users-updated', handleUsersUpdated);
    window.addEventListener('storage', (e) => {
      if (e.key === USERS_STORAGE_KEY) {
        console.log('storage event received for users in useAuthActions');
        loadUsers();
      }
    });
    
    return () => {
      window.removeEventListener('users-updated', handleUsersUpdated);
      window.removeEventListener('storage', handleUsersUpdated);
    };
  }, []);

  const { login, signup } = useUserAuthentication(users, saveUsers);
  const { updateProfileImage, getAllUsers, deleteUserByEmail } = useUserProfile(users, saveUsers);

  return {
    users,
    setUsers,
    saveUsers,
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail,
  };
};
