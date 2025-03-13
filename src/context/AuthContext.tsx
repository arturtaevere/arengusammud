
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the shape of our user object
type User = {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'teacher';
};

// Define the shape of our auth context
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'coach' | 'teacher') => Promise<void>;
  logout: () => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Create a hook for using the context
export const useAuth = () => useContext(AuthContext);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'coach@example.com',
    password: 'password',
    role: 'coach' as const,
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'teacher@example.com',
    password: 'password',
    role: 'teacher' as const,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login functionality
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  // Mock signup functionality
  const signup = async (name: string, email: string, password: string, role: 'coach' | 'teacher') => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (MOCK_USERS.some(u => u.email === email)) {
      setIsLoading(false);
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
