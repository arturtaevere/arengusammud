import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { USER_STORAGE_KEY, USERS_STORAGE_KEY } from './constants';

export const useUserAuthentication = (
  users: UserWithPassword[],
  saveUsers: (updatedUsers: UserWithPassword[]) => void
) => {
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Convert any 'coach' role users to 'juht'
    const updatedUsers = users.map((u: UserWithPassword) => {
      // Use type assertions to fix the type comparison issues
      if (u.role === 'coach' as any) {
        return {...u, role: 'juht' as const};
      }
      if (u.role === 'teacher' as any) {
        return {...u, role: 'õpetaja' as const};
      }
      return u;
    });
    
    // Save the updated users with the new roles if there are changes
    if (JSON.stringify(updatedUsers) !== JSON.stringify(users)) {
      saveUsers(updatedUsers);
    }
    
    const foundUser = updatedUsers.find((u: UserWithPassword) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      throw new Error('Vale e-post või parool');
    }
    
    if (foundUser.password !== password) {
      throw new Error('Vale e-post või parool');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    
    toast({
      title: "Sisselogimine õnnestus",
      description: `Tere tulemast, ${userWithoutPassword.name}!`,
    });
    
    return userWithoutPassword;
  };

  const signup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the latest users from localStorage
    const storedUsersStr = localStorage.getItem(USERS_STORAGE_KEY);
    const currentUsers = storedUsersStr ? JSON.parse(storedUsersStr) : users;
    
    console.log('Signup - Current users in storage:', {
      count: currentUsers.length,
      emails: currentUsers.map((u: UserWithPassword) => u.email)
    });
    
    const existingUser = currentUsers.find((u: UserWithPassword) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      console.log('Found existing user with email:', existingUser);
      throw new Error('Selle e-posti aadressiga kasutaja on juba olemas');
    }

    if (!school) {
      throw new Error('Kooli valimine on kohustuslik');
    }

    const userId = Math.random().toString(36).substr(2, 9);
    const newUser = {
      id: userId,
      name,
      email,
      password,
      role,
      school,
      createdAt: new Date().toISOString(),
      emailVerified: true,
    };
    
    console.log('Creating new user:', newUser);
    
    const updatedUsers = [...currentUsers, newUser];
    
    try {
      // First update localStorage
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      console.log('Successfully saved to localStorage. Updated users:', {
        count: updatedUsers.length,
        emails: updatedUsers.map(u => u.email)
      });
      
      // Then update state through saveUsers
      saveUsers(updatedUsers);
      
      // Dispatch events to notify other components
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
