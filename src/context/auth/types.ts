
// Define User types
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'juht' | 'õpetaja' | 'coach';
  school?: string;
  createdAt: string;
  emailVerified: boolean;
  profileImage?: string;
};

export type UserWithPassword = User & {
  password: string;
};

// Define Auth Context type
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'juht' | 'õpetaja' | 'coach', school?: string) => Promise<void>;
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
  
  // User management functions
  getAllUsers: () => User[];
  deleteUserByEmail: (email: string) => Promise<boolean>;
  refreshUsers: () => void;
  
  // Email verification functions
  verifyEmail: (id: string, token: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<boolean>;
  pendingVerificationEmail: string | null;
  setPendingVerificationEmail: (email: string | null) => void;
}
