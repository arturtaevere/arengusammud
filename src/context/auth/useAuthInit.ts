
import { useEffect } from 'react';
import { User, UserWithPassword } from './types';
import { INITIAL_USERS, USERS_STORAGE_KEY, USER_STORAGE_KEY, VERIFICATION_TOKENS_KEY } from './constants';

export const useAuthInit = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setUsers: React.Dispatch<React.SetStateAction<UserWithPassword[]>>,
  setVerificationTokens: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPendingVerificationEmail: React.Dispatch<React.SetStateAction<string | null>>
) => {
  // Initialize users from localStorage or default
  useEffect(() => {
    const initializeUsers = () => {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          setUsers(parsedUsers);
          console.log(`Loaded ${parsedUsers.length} users from localStorage`);
        } catch (error) {
          console.error("Error parsing users from localStorage:", error);
          setUsers(INITIAL_USERS);
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        }
      } else {
        console.log("Initializing with test users");
        setUsers(INITIAL_USERS);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      }
    };

    const initializeTokens = () => {
      const storedTokens = localStorage.getItem(VERIFICATION_TOKENS_KEY);
      if (storedTokens) {
        try {
          setVerificationTokens(JSON.parse(storedTokens));
        } catch (error) {
          console.error("Error parsing verification tokens:", error);
          setVerificationTokens({});
          localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify({}));
        }
      } else {
        localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify({}));
      }
    };

    initializeUsers();
    initializeTokens();
  }, [setUsers, setVerificationTokens]);

  // Check for logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        if (parsedUser.emailVerified) {
          setUser(parsedUser);
          console.log('User logged in:', parsedUser.name);
        } else {
          localStorage.removeItem(USER_STORAGE_KEY);
          setPendingVerificationEmail(parsedUser.email);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, [setUser, setIsLoading, setPendingVerificationEmail]);
};
