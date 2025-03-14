
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { USER_STORAGE_KEY, USERS_STORAGE_KEY } from './constants';
import { useTokenManagement } from './useTokenManagement';

export const useUserAuthentication = () => {
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const { toast } = useToast();
  const { generateVerificationToken } = useTokenManagement();

  const saveUsers = (updatedUsers: UserWithPassword[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the most up-to-date users from localStorage
    const currentUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const foundUser = currentUsers.find((u: UserWithPassword) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      throw new Error('Vale e-post või parool');
    }
    
    if (foundUser.password !== password) {
      throw new Error('Vale e-post või parool');
    }

    if (!foundUser.emailVerified) {
      console.log(`User ${foundUser.email} not verified, sending verification email`);
      
      const token = generateVerificationToken(foundUser.id);
      const verificationLink = `${window.location.origin}/verify-email?id=${foundUser.id}&token=${token}`;
      
      console.log(`Verification token for ${foundUser.email}: ${token}`);
      console.log(`Verification link: ${verificationLink}`);
      
      // For development: Show verification link directly 
      alert(`DEV MODE: Use this verification link: ${verificationLink}`);
      
      throw new Error('E-posti aadress pole kinnitatud. Palun kontrolli oma postkasti kinnituslingi jaoks.');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));

    toast({
      title: "Sisselogimine õnnestus",
      description: `Tere tulemast, ${userWithoutPassword.name}!`,
    });
    
    return userWithoutPassword;
  };

  const signup = async (name: string, email: string, password: string, role: 'coach' | 'teacher', school?: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Selle e-posti aadressiga kasutaja on juba olemas');
    }

    if (role === 'teacher' && !school) {
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
      emailVerified: false,
    };
    
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    
    const token = generateVerificationToken(userId);
    const verificationLink = `${window.location.origin}/verify-email?id=${userId}&token=${token}`;
    
    console.log(`New user created: ${email}, ID: ${userId}`);
    console.log(`Verification token: ${token}`);
    console.log(`Verification link: ${verificationLink}`);
    
    toast({
      title: "Registreerimine õnnestus",
      description: "Kinnitusmeil on saadetud. Palun kontrolli oma postkasti.",
    });
    
    // For development
    alert(`DEV MODE: Use this verification link: ${verificationLink}`);
    
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
