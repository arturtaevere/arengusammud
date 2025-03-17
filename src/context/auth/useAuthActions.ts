
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
    // Log the users before saving for debugging
    console.log('Saving users, count:', updatedUsers.length);
    
    try {
      // Save to localStorage
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      console.log('Successfully saved users to localStorage');
      
      // Update state
      setUsers(updatedUsers);
      
      // Dispatch a custom event so other components can react to user changes
      window.dispatchEvent(new CustomEvent('users-updated'));
      console.log('Dispatched users-updated event');
    } catch (error) {
      console.error('Error in saveUsers:', error);
    }
  };
  
  // Load initial data from localStorage
  useEffect(() => {
    const loadUsers = () => {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          console.log('Loading users from localStorage, count:', parsedUsers.length);
          setUsers(parsedUsers);
        } catch (error) {
          console.error('Error parsing users:', error);
        }
      } else {
        console.log('No users found in localStorage');
      }
    };

    loadUsers();
    
    // Listen for changes to users from other components
    const handleUsersUpdated = () => {
      console.log('users-updated event received in useAuthActions');
      loadUsers();
    };
    
    window.addEventListener('users-updated', handleUsersUpdated);
    window.addEventListener('storage', (e) => {
      if (e.key === USERS_STORAGE_KEY) {
        loadUsers();
      }
    });
    
    return () => {
      window.removeEventListener('users-updated', handleUsersUpdated);
      window.removeEventListener('storage', handleUsersUpdated);
    };
  }, []);
  
  // Authentication hooks
  const { login, signup } = useUserAuthentication(users, saveUsers);
  
  // We need to pass the current users state and the saveUsers function
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
