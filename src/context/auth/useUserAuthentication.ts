import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { USER_STORAGE_KEY, USERS_STORAGE_KEY, TEST_EMAILS } from './constants';

export const useUserAuthentication = (
  users: UserWithPassword[],
  saveUsers: (updatedUsers: UserWithPassword[]) => void
) => {
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log('Attempting login for:', email);
    
    // Get the latest users from localStorage in case another browser tab has updated it
    const storedUsersStr = localStorage.getItem(USERS_STORAGE_KEY);
    const latestUsers: UserWithPassword[] = storedUsersStr ? JSON.parse(storedUsersStr) : users;
    
    const normalizedEmail = email.toLowerCase().trim();
    const foundUser = latestUsers.find((u: UserWithPassword) => 
      u.email.toLowerCase().trim() === normalizedEmail
    );
    
    if (!foundUser) {
      console.log('User not found for email:', normalizedEmail);
      throw new Error('Vale e-post või parool');
    }
    
    if (foundUser.password !== password) {
      console.log('Invalid password for user:', normalizedEmail);
      throw new Error('Vale e-post või parool');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    
    console.log('Login successful for user:', userWithoutPassword.name);
    
    toast({
      title: "Sisselogimine õnnestus",
      description: `Tere tulemast, ${userWithoutPassword.name}!`,
    });
    
    return userWithoutPassword;
  };

  const signup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // First, check if this is a test email that should be rejected
    const normalizedNewEmail = email.toLowerCase().trim();
    
    // Check against normalized test emails
    const isTestEmail = TEST_EMAILS.some(testEmail => 
      testEmail.toLowerCase().trim() === normalizedNewEmail
    );
    
    if (isTestEmail) {
      console.log('Attempted to sign up with a test email:', normalizedNewEmail);
      throw new Error('Selle e-posti aadressiga ei saa kontot luua');
    }
    
    // IMPORTANT: Always get the fresh users list from localStorage for signup
    const storedUsersStr = localStorage.getItem(USERS_STORAGE_KEY);
    let currentUsers: UserWithPassword[] = [];
    
    if (storedUsersStr) {
      try {
        currentUsers = JSON.parse(storedUsersStr);
        console.log('Retrieved users from localStorage during signup:', currentUsers.length);
      } catch (e) {
        console.error('Error parsing stored users during signup:', e);
        currentUsers = users; // Fallback to state if localStorage parse fails
      }
    } else {
      console.log('No users found in localStorage, using state users');
      currentUsers = users;
    }
    
    console.log('Attempting signup for email:', email);
    
    const existingUserIndex = currentUsers.findIndex(
      (u: UserWithPassword) => u.email.toLowerCase().trim() === normalizedNewEmail
    );
    
    if (existingUserIndex !== -1) {
      console.log('Found existing user with email:', email);
      throw new Error('Selle e-posti aadressiga kasutaja on juba olemas');
    }

    if (role === 'õpetaja' && !school) {
      throw new Error('Õpetaja peab valima kooli');
    }

    const userId = Math.random().toString(36).substr(2, 9);
    const newUser = {
      id: userId,
      name,
      email: normalizedNewEmail, // Store normalized email
      password,
      role,
      school,
      createdAt: new Date().toISOString(),
      emailVerified: true,
    };
    
    const updatedUsers = [...currentUsers, newUser];
    
    console.log('New user signup - adding user:', {
      email: newUser.email,
      role: newUser.role,
      totalUsersAfter: updatedUsers.length
    });
    
    try {
      // First update localStorage directly
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      console.log('Successfully saved new user to localStorage');
      
      // Then update state via context
      saveUsers(updatedUsers);
      console.log('Successfully updated state via saveUsers');
      
      // Force refresh by dispatching multiple events
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('users-updated'));
      
      toast({
        title: "Registreerimine õnnestus",
        description: "Konto on loodud. Võid nüüd sisse logida.",
      });
      
      return email;
    } catch (error) {
      console.error('Error during signup:', error);
      throw new Error('Kasutaja salvestamine ebaõnnestus');
    }
  };

  return {
    login,
    signup
  };
};
