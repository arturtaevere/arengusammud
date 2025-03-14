import React, { createContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { AuthContextType, User, UserWithPassword } from './types';
import { INITIAL_USERS, SCHOOLS, USER_STORAGE_KEY, USERS_STORAGE_KEY, VERIFICATION_TOKENS_KEY } from './constants';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfileImage: () => {},
  getAllUsers: () => [],
  verifyEmail: async () => false,
  resendVerificationEmail: async () => {},
  pendingVerificationEmail: null,
  setPendingVerificationEmail: () => {},
  deleteUserByEmail: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const [verificationTokens, setVerificationTokens] = useState<Record<string, string>>({});
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const { toast } = useToast();

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
  }, []);

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
      console.log(`Verification link: /verify-email?id=${foundUser.id}&token=${token}`);
      
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
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Vale e-post või parool');
    }
    
    if (!foundUser.emailVerified) {
      setPendingVerificationEmail(foundUser.email);
      setIsLoading(false);
      throw new Error('E-posti aadress pole kinnitatud. Palun kontrolli oma postkasti kinnituslingi jaoks.');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    
    setUser(userWithoutPassword);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    setIsLoading(false);

    toast({
      title: "Sisselogimine õnnestus",
      description: `Tere tulemast, ${userWithoutPassword.name}!`,
    });
  };

  const signup = async (name: string, email: string, password: string, role: 'coach' | 'teacher', school?: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setIsLoading(false);
      throw new Error('Selle e-posti aadressiga kasutaja on juba olemas');
    }

    if (role === 'teacher' && !school) {
      setIsLoading(false);
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
    console.log(`Verification link: /verify-email?id=${userId}&token=${token}`);
    
    setPendingVerificationEmail(email);
    
    setIsLoading(false);

    toast({
      title: "Registreerimine õnnestus",
      description: "Kinnitusmeil on saadetud. Palun kontrolli oma postkasti.",
    });
  };

  const updateProfileImage = (imageUrl: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: imageUrl };
      console.log('Updating profile image to:', imageUrl);
      
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return { ...u, profileImage: imageUrl };
        }
        return u;
      });
      
      saveUsers(updatedUsers);
      
      toast({
        title: "Profiilipilt uuendatud",
        description: "Sinu profiilipilt on edukalt uuendatud.",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    
    toast({
      title: "Väljalogimine õnnestus",
      description: "Oled edukalt välja logitud.",
    });
  };

  const deleteUserByEmail = async (email: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userIndex === -1) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Kasutaja kustutamine ebaõnnestus",
        description: "Kasutajat selle e-posti aadressiga ei leitud.",
      });
      return false;
    }
    
    if (user && user.email.toLowerCase() === email.toLowerCase()) {
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    
    const updatedUsers = [...users];
    updatedUsers.splice(userIndex, 1);
    
    saveUsers(updatedUsers);
    
    setIsLoading(false);
    
    toast({
      title: "Kasutaja kustutatud",
      description: `Kasutaja e-postiga ${email} on edukalt kustutatud.`,
    });
    
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfileImage,
        getAllUsers,
        verifyEmail,
        resendVerificationEmail,
        pendingVerificationEmail,
        setPendingVerificationEmail,
        deleteUserByEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
