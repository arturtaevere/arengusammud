
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserWithPassword } from './types';
import { USERS_STORAGE_KEY, INITIAL_USERS } from './constants';
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
          
          // Check if the stored users list contains any test users we want to remove
          const testEmails = ['coach@example.com', 'teacher@example.com', 'maarja@kesklinnakool.ee', 'tiit@reaalkool.ee'];
          const hasTestUsers = parsedUsers.some((user: UserWithPassword) => 
            testEmails.includes(user.email.toLowerCase())
          );
          
          if (hasTestUsers) {
            console.log('Found test users in localStorage, resetting to initial users');
            saveUsers(INITIAL_USERS);
          } else {
            console.log('Loading users in useAuthActions:', {
              count: parsedUsers.length,
              emails: parsedUsers.map((u: UserWithPassword) => u.email)
            });
            setUsers(parsedUsers);
          }
        } else {
          // If no users in localStorage, load initial users
          console.log('No users found in localStorage, loading initial users');
          saveUsers(INITIAL_USERS);
        }
      } catch (error) {
        console.error('Error loading users:', error);
        // If there's an error, load initial users as fallback
        console.log('Error occurred, loading initial users as fallback');
        saveUsers(INITIAL_USERS);
      }
    };

    // Load initial users
    loadUsers();
    
    // Set up event listeners
    const handleUsersUpdated = () => {
      console.log('users-updated event received in useAuthActions');
      loadUsers();
    };
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === USERS_STORAGE_KEY) {
        console.log('storage event received for users in useAuthActions');
        loadUsers();
      }
    };
    
    window.addEventListener('users-updated', handleUsersUpdated);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('users-updated', handleUsersUpdated);
      window.removeEventListener('storage', handleStorageChange);
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
