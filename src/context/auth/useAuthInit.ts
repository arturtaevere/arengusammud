
import { useEffect } from 'react';
import { User } from './types';
import { USER_STORAGE_KEY } from './constants';

export const useAuthInit = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // Check for logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('User logged in:', parsedUser.name);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, [setUser, setIsLoading]);
};
