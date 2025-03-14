
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Define the shape of our user object
type User = {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'teacher';
  profileImage?: string;
  school?: string;
  createdAt: string;
};

// Define the shape of our auth context
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'coach' | 'teacher', school?: string) => Promise<void>;
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
  getAllUsers: () => User[];
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfileImage: () => {},
  getAllUsers: () => [],
});

// Create a hook for using the context
export const useAuth = () => useContext(AuthContext);

// List of available schools
export const SCHOOLS = [
  'Arengusammud',
  'Järveküla Kool',
  'Kilingi-Nõmme Gümnaasium',
  'Tartu Kesklinna Kool',
  'Tallinna Reaalkool',
  'Pärnu Koidula Gümnaasium',
];

// Initial test users
const INITIAL_USERS = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'coach@example.com',
    password: 'password',
    role: 'coach' as const,
    profileImage: '/lovable-uploads/6eae274c-d643-4822-ae8c-ba2410af6f2a.png',
    school: 'Arengusammud',
    createdAt: new Date(2023, 4, 15).toISOString(),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'teacher@example.com',
    password: 'password',
    role: 'teacher' as const,
    school: 'Järveküla Kool',
    createdAt: new Date(2023, 5, 20).toISOString(),
  },
  {
    id: '3',
    name: 'Artur',
    email: 'artur@arengusammud.ee',
    password: 'password',
    role: 'coach' as const,
    profileImage: '/lovable-uploads/6eae274c-d643-4822-ae8c-ba2410af6f2a.png',
    school: 'Arengusammud',
    createdAt: new Date(2023, 6, 10).toISOString(),
  },
  {
    id: '4',
    name: 'Maarja Raud',
    email: 'maarja@kesklinnakool.ee',
    password: 'password',
    role: 'teacher' as const,
    school: 'Tartu Kesklinna Kool',
    createdAt: new Date(2023, 7, 5).toISOString(),
  },
  {
    id: '5',
    name: 'Tiit Mets',
    email: 'tiit@reaalkool.ee',
    password: 'password',
    role: 'teacher' as const,
    school: 'Tallinna Reaalkool',
    createdAt: new Date(2023, 8, 12).toISOString(),
  },
];

// Local storage key for users
const USERS_STORAGE_KEY = 'arengusammud_users';
// Local storage key for current user
const USER_STORAGE_KEY = 'user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Array<User & { password: string }>>([]);
  const { toast } = useToast();

  // Initialize users from localStorage or use the initial test users
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
        // First time: initialize with test users
        console.log("Initializing with test users");
        setUsers(INITIAL_USERS);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      }
    };

    initializeUsers();
  }, []);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Set the user
        setUser(parsedUser);
        console.log('User logged in:', parsedUser.name);
      } catch (error) {
        // Handle parsing error gracefully
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Helper to save users to localStorage
  const saveUsers = (updatedUsers: Array<User & { password: string }>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // Get all users (without passwords)
  const getAllUsers = () => {
    return users.map(({ password, ...user }) => user);
  };

  // Login functionality
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Vale e-post või parool');
    }
    
    // Copy all properties EXCEPT password
    const { password: _, ...userWithoutPassword } = foundUser;
    
    setUser(userWithoutPassword);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    setIsLoading(false);

    toast({
      title: "Sisselogimine õnnestus",
      description: `Tere tulemast, ${userWithoutPassword.name}!`,
    });
  };

  // Signup functionality
  const signup = async (name: string, email: string, password: string, role: 'coach' | 'teacher', school?: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setIsLoading(false);
      throw new Error('Selle e-posti aadressiga kasutaja on juba olemas');
    }

    // Validate school for teachers
    if (role === 'teacher' && !school) {
      setIsLoading(false);
      throw new Error('Õpetaja peab valima kooli');
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      role,
      school,
      createdAt: new Date().toISOString(),
    };
    
    // Add user to the users array
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    
    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);

    toast({
      title: "Registreerimine õnnestus",
      description: `Tere tulemast, ${name}!`,
    });
  };

  // Method to update profile image
  const updateProfileImage = (imageUrl: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: imageUrl };
      console.log('Updating profile image to:', imageUrl);
      
      // Update current user
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Update in users array
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

  // Logout functionality
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    
    toast({
      title: "Väljalogimine õnnestus",
      description: "Oled edukalt välja logitud.",
    });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
