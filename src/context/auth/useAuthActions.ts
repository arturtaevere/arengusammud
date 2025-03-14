
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
    // Clear any existing tokens for this user first
    const currentTokens = JSON.parse(localStorage.getItem(VERIFICATION_TOKENS_KEY) || '{}');
    
    // Generate a stronger token
    const token = Math.random().toString(36).substring(2, 15);
    
    // Store the new token
    const updatedTokens = { ...currentTokens, [userId]: token };
    localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify(updatedTokens));
    
    // Update state
    setVerificationTokens(updatedTokens);
    
    console.log(`Generated new token for userId ${userId}: ${token}`);
    console.log(`Updated tokens in localStorage:`, updatedTokens);
    
    return token;
  };

  const verifyEmail = async (userId: string, token: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the most up-to-date tokens directly from localStorage
    const currentTokens = JSON.parse(localStorage.getItem(VERIFICATION_TOKENS_KEY) || '{}');
    
    console.log(`Trying to verify userId: ${userId} with token: ${token}`);
    console.log('Available tokens from localStorage:', currentTokens);
    
    // For debugging
    if (currentTokens[userId] === token) {
      console.log('✅ Token match found!');
    } else {
      console.log(`❌ Token mismatch. Expected: ${currentTokens[userId]}, Received: ${token}`);
    }
    
    // Check against the tokens from localStorage
    if (currentTokens[userId] === token) {
      try {
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
        const { [userId]: removedToken, ...restTokens } = currentTokens;
        localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify(restTokens));
        setVerificationTokens(restTokens);
        
        console.log('User verified successfully');
        console.log('Updated users:', updatedUsers);
        console.log('Removed used token, remaining tokens:', restTokens);
        
        toast({
          title: "Email kinnitatud",
          description: "Sinu e-posti aadress on edukalt kinnitatud. Võid nüüd sisse logida.",
        });
        
        return true;
      } catch (error) {
        console.error('Error during verification process:', error);
        return false;
      }
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
    
    // Always use the most up-to-date users from localStorage
    const currentUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const foundUser = currentUsers.find((u: UserWithPassword) => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      // Always regenerate the token
      const token = generateVerificationToken(foundUser.id);
      const verificationLink = `${window.location.origin}/verify-email?id=${foundUser.id}&token=${token}`;
      
      console.log(`User found: ${foundUser.email}, ID: ${foundUser.id}`);
      console.log(`New verification token: ${token}`);
      console.log(`Verification link: ${verificationLink}`);
      
      // Save tokens to ensure consistency
      const updatedTokens = { ...verificationTokens, [foundUser.id]: token };
      saveVerificationTokens(updatedTokens);
      
      toast({
        title: "Kinnitusmeil saadetud",
        description: "Uus kinnitusmeil on saadetud. Palun kontrolli oma postkasti.",
      });
      
      // For development: Show verification link directly in UI and alert
      alert(`DEV MODE: Use this verification link: ${verificationLink}`);
      
      return true;
    } else {
      console.log(`User with email ${email} not found`);
      
      toast({
        variant: "destructive",
        title: "Saatmine ebaõnnestus",
        description: "Kasutajat selle e-posti aadressiga ei leitud.",
      });
      
      return false;
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
