
// Define the shape of our user object
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'teacher';
  profileImage?: string;
  school?: string;
  createdAt: string;
  emailVerified: boolean;
};

// Define the shape of our auth context
export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'coach' | 'teacher', school?: string) => Promise<void>;
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
  getAllUsers: () => User[];
  verifyEmail: (userId: string, token: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<void>;
  pendingVerificationEmail: string | null;
  setPendingVerificationEmail: (email: string | null) => void;
  deleteUserByEmail: (email: string) => Promise<boolean>;
};

// User with password (for internal use)
export type UserWithPassword = User & { password: string };
