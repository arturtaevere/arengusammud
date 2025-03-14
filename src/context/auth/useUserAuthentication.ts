
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { USER_STORAGE_KEY, USERS_STORAGE_KEY } from './constants';

export const useUserAuthentication = () => {
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const { toast } = useToast();

  const saveUsers = (updatedUsers: UserWithPassword[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the most up-to-date users from localStorage
    const currentUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    
    // Convert any 'coach' role users to 'juht'
    const updatedUsers = currentUsers.map((u: UserWithPassword) => {
      // Use string literals instead of role type references
      // This solves the type checking issue while still performing the conversion
      if (u.role === 'coach') {
        return {...u, role: 'juht' as const};
      }
      if (u.role === 'teacher') {
        return {...u, role: 'õpetaja' as const};
      }
      return u;
    });
    
    // Save the updated users with the new roles
    if (JSON.stringify(updatedUsers) !== JSON.stringify(currentUsers)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    }
    
    const foundUser = updatedUsers.find((u: UserWithPassword) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      throw new Error('Vale e-post või parool');
    }
    
    if (foundUser.password !== password) {
      throw new Error('Vale e-post või parool');
    }
    
    // No longer checking emailVerified flag
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
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
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
      emailVerified: true, // Set to true by default to skip verification
    };
    
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    
    toast({
      title: "Registreerimine õnnestus",
      description: "Konto on loodud. Võid nüüd sisse logida.",
    });
    
    return email;
  };

  return {
    users,
    setUsers,
    saveUsers,
    login,
    signup
  };
};
