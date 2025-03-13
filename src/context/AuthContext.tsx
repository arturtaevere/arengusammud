
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the shape of our user object
type User = {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'teacher';
  profileImage?: string;
  school?: string;
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
});

// Create a hook for using the context
export const useAuth = () => useContext(AuthContext);

// List of available schools
export const SCHOOLS = [
  'Arengusammud',
  'Järveküla Kool',
  'Kilingi-Nõmme Gümnaasium',
];

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'coach@example.com',
    password: 'password',
    role: 'coach' as const,
    profileImage: '/lovable-uploads/6eae274c-d643-4822-ae8c-ba2410af6f2a.png',
    school: 'Arengusammud',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'teacher@example.com',
    password: 'password',
    role: 'teacher' as const,
    school: 'Järveküla Kool',
  },
  {
    id: '3',
    name: 'Artur',
    email: 'artur@arengusammud.ee',
    password: 'password',
    role: 'coach' as const,
    profileImage: '/lovable-uploads/6eae274c-d643-4822-ae8c-ba2410af6f2a.png',
    school: 'Arengusammud',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Find the user in MOCK_USERS to ensure we have all properties
        const mockUser = MOCK_USERS.find(u => u.email === parsedUser.email);
        
        if (mockUser) {
          // Always apply the profile image from the mock user data
          parsedUser.profileImage = mockUser.profileImage;
          
          // Set the school if it's missing
          if (mockUser.school && !parsedUser.school) {
            parsedUser.school = mockUser.school;
          }
          
          // Update localStorage with the enhanced user data
          localStorage.setItem('user', JSON.stringify(parsedUser));
        }
        
        // Ensure the user has all the required properties
        console.log('Setting user with profile image:', parsedUser.profileImage);
        setUser(parsedUser);
      } catch (error) {
        // Handle parsing error gracefully
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem('user');
      }
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
    
    // Copy all properties EXCEPT password to userWithoutPassword
    const { password: _, ...userWithoutPassword } = foundUser;
    
    // Log the profile image during login for debugging
    console.log('Login: Using profile image:', userWithoutPassword.profileImage);
    
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  // Mock signup functionality
  const signup = async (name: string, email: string, password: string, role: 'coach' | 'teacher', school?: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (MOCK_USERS.some(u => u.email === email)) {
      setIsLoading(false);
      throw new Error('Email already exists');
    }

    // Create new user with school field for both roles
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      school, // Store school for all users now
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Method to update profile image
  const updateProfileImage = (imageUrl: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: imageUrl };
      console.log('Updating profile image to:', imageUrl);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
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
        updateProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
