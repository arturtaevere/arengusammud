
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { USER_STORAGE_KEY, USERS_STORAGE_KEY, VERIFICATION_TOKENS_KEY } from './constants';

export const useAuthActions = () => {
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const [verificationTokens, setVerificationTokens] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const saveUsers = (updatedUsers: UserWithPassword[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const saveVerificationTokens = (tokens: Record<string, string>) => {
    localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify(tokens));
    setVerificationTokens(tokens);
  };

  const generateVerificationToken = (userId: string) => {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const updatedTokens = { ...verificationTokens, [userId]: token };
    saveVerificationTokens(updatedTokens);
    return token;
  };

  const verifyEmail = async (userId: string, token: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (verificationTokens[userId] === token) {
      const updatedUsers = users.map(u => {
        if (u.id === userId) {
          return { ...u, emailVerified: true };
        }
        return u;
      });
      
      saveUsers(updatedUsers);
      
      const { [userId]: _, ...restTokens } = verificationTokens;
      saveVerificationTokens(restTokens);
      
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
    
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser && !foundUser.emailVerified) {
      const token = generateVerificationToken(foundUser.id);
      console.log(`New verification token for ${foundUser.email}: ${token}`);
      console.log(`Verification link: ${window.location.origin}/verify-email?id=${foundUser.id}&token=${token}`);
      
      toast({
        title: "Kinnitusmeil saadetud",
        description: "Uus kinnitusmeil on saadetud. Palun kontrolli oma postkasti.",
      });
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
    
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      throw new Error('Vale e-post või parool');
    }
    
    if (foundUser.password !== password) {
      throw new Error('Vale e-post või parool');
    }

    if (!foundUser.emailVerified) {
      const token = generateVerificationToken(foundUser.id);
      console.log(`Verification token for ${foundUser.email}: ${token}`);
      console.log(`Verification link: ${window.location.origin}/verify-email?id=${foundUser.id}&token=${token}`);
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
