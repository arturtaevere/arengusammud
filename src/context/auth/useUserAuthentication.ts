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
    
    if (users.some((u: UserWithPassword) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Selle e-posti aadressiga kasutaja on juba olemas');
    }

    if (role === 'õpetaja' && !school) {
      throw new Error('Õpetaja peab valima kooli');
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
    
    console.log('Creating new user:', newUser.email);
    
    const updatedUsers = [...users, newUser];
    
    // First update localStorage directly
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      console.log('Successfully saved new user to localStorage');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Kasutaja salvestamine ebaõnnestus');
    }
    
    // Then update state through saveUsers
    saveUsers(updatedUsers);
    
    // Explicitly dispatch events to ensure updates
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('users-updated'));
    
    toast({
      title: "Registreerimine õnnestus",
      description: "Konto on loodud. Võid nüüd sisse logida.",
    });
    
    return email;
  };

  return {
    login,
    signup
  };
};
