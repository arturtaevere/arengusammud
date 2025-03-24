
// Define User types
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'juht' | 'õpetaja';
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
  login: (email: string, password: string) => Promise<User>; // Updated return type
  signup: (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school: string) => Promise<string>; // Updated return type and made school required
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
  getAllUsers: () => Promise<User[]>;
  deleteUserByEmail: (email: string) => Promise<boolean>;
  
  // Adding these stub properties to fix type errors
  verifyEmail: (id: string, token: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<boolean>;
  pendingVerificationEmail: string | null;
  setPendingVerificationEmail: (email: string | null) => void;
}
