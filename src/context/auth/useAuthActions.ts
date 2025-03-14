
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { USER_STORAGE_KEY, USERS_STORAGE_KEY, VERIFICATION_TOKENS_KEY } from './constants';

export const useAuthActions = () => {
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const [verificationTokens, setVerificationTokens] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Load initial data from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error('Error parsing users:', error);
      }
    }

    const storedTokens = localStorage.getItem(VERIFICATION_TOKENS_KEY);
    if (storedTokens) {
      try {
        setVerificationTokens(JSON.parse(storedTokens));
      } catch (error) {
        console.error('Error parsing tokens:', error);
      }
    }
  }, []);

  const saveUsers = (updatedUsers: UserWithPassword[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const saveVerificationTokens = (tokens: Record<string, string>) => {
    localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify(tokens));
    setVerificationTokens(tokens);
  };

  const generateVerificationToken = (userId: string) => {
    // Generate a more reliable token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log(`Generated new token for userId ${userId}: ${token}`);
    
    // Store token in localStorage BEFORE updating state to ensure it's saved immediately
    const currentTokens = JSON.parse(localStorage.getItem(VERIFICATION_TOKENS_KEY) || '{}');
    const updatedTokens = { ...currentTokens, [userId]: token };
    localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify(updatedTokens));
    
    // Update state
    setVerificationTokens(updatedTokens);
    return token;
  };

  const verifyEmail = async (userId: string, token: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the most up-to-date tokens from localStorage
    const currentTokens = JSON.parse(localStorage.getItem(VERIFICATION_TOKENS_KEY) || '{}');
    
    console.log(`Trying to verify userId: ${userId} with token: ${token}`);
    console.log('Available tokens from localStorage:', currentTokens);
    console.log('Available tokens from state:', verificationTokens);
    
    // Check against the tokens from localStorage
    if (currentTokens[userId] === token) {
      // Get the most up-to-date users
      const currentUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      
      // Update the user's emailVerified status
      const updatedUsers = currentUsers.map((u: UserWithPassword) => {
        if (u.id === userId) {
          console.log(`Marking user ${u.email} as verified`);
          return { ...u, emailVerified: true };
        }
        return u;
      });
      
      // Save the updated users
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      
      // Remove the used token
      const { [userId]: _, ...restTokens } = currentTokens;
      localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify(restTokens));
      setVerificationTokens(restTokens);
      
      toast({
        title: "Email kinnitatud",
        description: "Sinu e-posti aadress on edukalt kinnitatud. Võid nüüd sisse logida.",
      });
      
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Kinnitamine ebaõnnestus",
      description: "Vigane või aegunud kinnituslink. Palun proovi uuesti.",
    });
    
    return false;
  };

  const resendVerificationEmail = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Use the most up-to-date users from localStorage
    const currentUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const foundUser = currentUsers.find((u: UserWithPassword) => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && !foundUser.emailVerified) {
      const token = generateVerificationToken(foundUser.id);
      const verificationLink = `${window.location.origin}/verify-email?id=${foundUser.id}&token=${token}`;
      
      console.log(`New verification token for ${foundUser.email}: ${token}`);
      console.log(`Verification link: ${verificationLink}`);
      
      toast({
        title: "Kinnitusmeil saadetud",
        description: "Uus kinnitusmeil on saadetud. Palun kontrolli oma postkasti.",
      });
      
      // For development: Show verification link directly in UI
      alert(`DEV MODE: Use this verification link: ${verificationLink}`);
    } else {
      toast({
        variant: "destructive",
        title: "Saatmine ebaõnnestus",
        description: "Kasutajat selle e-posti aadressiga ei leitud või on e-post juba kinnitatud.",
      });
    }
  };

  const getAllUsers = () => {
    return users.map(({ password, ...user }) => user);
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
      const token = generateVerificationToken(foundUser.id);
      const verificationLink = `${window.location.origin}/verify-email?id=${foundUser.id}&token=${token}`;
      
      console.log(`Verification token for ${foundUser.email}: ${token}`);
      console.log(`Verification link: ${verificationLink}`);
      
      // For development: Show verification link directly in UI
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
    console.log(`Verification token for ${email}: ${token}`);
    console.log(`Verification link: ${window.location.origin}/verify-email?id=${userId}&token=${token}`);
    
    toast({
      title: "Registreerimine õnnestus",
      description: "Kinnitusmeil on saadetud. Palun kontrolli oma postkasti.",
    });
    
    return email;
  };

  const updateProfileImage = (userId: string, imageUrl: string) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return { ...u, profileImage: imageUrl };
      }
      return u;
    });
    
    saveUsers(updatedUsers);
    
    toast({
      title: "Profiilipilt uuendatud",
      description: "Sinu profiilipilt on edukalt uuendatud.",
    });
    
    return updatedUsers.find(u => u.id === userId);
  };

  const deleteUserByEmail = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userIndex === -1) {
      toast({
        variant: "destructive",
        title: "Kasutaja kustutamine ebaõnnestus",
        description: "Kasutajat selle e-posti aadressiga ei leitud.",
      });
      return false;
    }
    
    const updatedUsers = [...users];
    updatedUsers.splice(userIndex, 1);
    
    saveUsers(updatedUsers);
    
    toast({
      title: "Kasutaja kustutatud",
      description: `Kasutaja e-postiga ${email} on edukalt kustutatud.`,
    });
    
    return true;
  };

  return {
    users,
    setUsers,
    verificationTokens,
    setVerificationTokens,
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    verifyEmail,
    resendVerificationEmail,
    deleteUserByEmail,
  };
};
