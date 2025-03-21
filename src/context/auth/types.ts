
import { Session } from '@supabase/supabase-js';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'juht' | 'õpetaja' | 'coach';
  school?: string;
  profileImage?: string;
  createdAt: string;
  emailVerified?: boolean;
};

export type UserWithPassword = User & {
  password: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'juht' | 'õpetaja' | 'coach', school?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileImage: (url: string) => Promise<void>;
  getAllUsers: () => UserWithPassword[];
  deleteUserByEmail: (email: string) => Promise<boolean>;
  refreshUsers: () => void;
  
  // Email verification support
  verifyEmail: (userId: string, token: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<boolean>;
  pendingVerificationEmail: string | null;
  setPendingVerificationEmail: (email: string | null) => void;
};
