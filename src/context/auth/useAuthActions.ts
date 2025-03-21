
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserWithPassword, User } from './types';
import { USERS_STORAGE_KEY, INITIAL_USERS, TEST_EMAILS } from './constants';
import { useUserAuthentication } from './useUserAuthentication';
import { useUserProfile } from './useUserProfile';

export const useAuthActions = () => {
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const { toast } = useToast();
  
  const saveUsers = (updatedUsers: UserWithPassword[]) => {
    try {
      // First update localStorage
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      
      // Then update state
      setUsers(updatedUsers);
      
      // Dispatch events to notify other components
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('users-updated'));
      
      console.log('Successfully saved users, total:', updatedUsers.length);
    } catch (error) {
      console.error('Error in saveUsers:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save user data",
      });
    }
  };

  const forceRefreshUsers = () => {
    console.log('Force refreshing users from localStorage');
    // Read users directly from local storage
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        console.log('Found', parsedUsers.length, 'users in localStorage');
        setUsers(parsedUsers);
        return parsedUsers.length;
      } catch (error) {
        console.error('Error parsing users during forced refresh:', error);
      }
    } else {
      console.log('No users found in localStorage, setting initial users');
      // If localStorage is empty, set initial users
      saveUsers(INITIAL_USERS);
      return INITIAL_USERS.length;
    }
    return 0;
  };

  useEffect(() => {
    const loadUsers = () => {
      try {
        console.log('Initial load of users');
        const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
        if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          console.log('Found', parsedUsers.length, 'users in localStorage');
          setUsers(parsedUsers);
        } else {
          // If no users in localStorage, load initial users
          console.log('No users in localStorage, loading initial users');
          saveUsers(INITIAL_USERS);
        }
      } catch (error) {
        console.error('Error loading users:', error);
        // If there's an error, load initial users as fallback
        console.log('Error loading users, loading initial users as fallback');
        saveUsers(INITIAL_USERS);
      }
    };

    // Load initial users
    loadUsers();
    
    // Set up event listeners
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === USERS_STORAGE_KEY) {
        console.log('Storage event detected for users, reloading');
        loadUsers();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const { login, signup } = useUserAuthentication(users, saveUsers);
  const { updateProfileImage, getAllUsers, deleteUserByEmail } = useUserProfile(users, saveUsers);

  return {
    users,
    setUsers,
    saveUsers,
    forceRefreshUsers,
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail,
  };
};
