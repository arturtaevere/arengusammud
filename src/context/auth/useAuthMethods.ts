
import { User } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useAuthMethods = (
  loadUserProfile: (user: any) => Promise<void>,
  setPendingVerificationEmail: (email: string | null) => void,
) => {
  const { toast } = useToast();

  // Handle user login
  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      // No need to return data.user as the onAuthStateChange handler will update the state
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Vale e-post või parool');
    }
  };

  // Handle user signup
  const handleSignup = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'juht' | 'õpetaja' | 'coach', 
    school?: string
  ): Promise<void> => {
    try {
      console.log('Signing up user with data:', { name, email, role, school });
      
      // Use Supabase signUp with metadata for the trigger
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            school,
          },
          // We'll handle redirect based on auth config
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });
      
      if (error) throw error;
      
      console.log('Signup response:', data);
      
      // Check if email verification is needed based on the response
      // When email verification is disabled, identities will be confirmed automatically
      const isEmailVerificationNeeded = data.user && !data.user.identities?.[0]?.identity_data?.email_verified;
      
      if (isEmailVerificationNeeded) {
        setPendingVerificationEmail(email);
      } else {
        // If email verification is not needed, we don't need to set pendingVerificationEmail
        // The auth state change will handle the redirection
        toast({
          title: "Registreerimine õnnestus",
          description: "Konto on loodud. Sisselogimine toimub automaatselt...",
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Registreerimine ebaõnnestus');
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Email verification
  const verifyEmail = async (userId: string, token: string): Promise<boolean> => {
    try {
      // Update the profile's email_verified status in the database
      const { error } = await supabase
        .from('profiles')
        .update({ email_verified: true })
        .eq('id', userId);
      
      if (error) {
        console.error('Error updating email_verified status:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in verifyEmail:', error);
      return false;
    }
  };

  const resendVerificationEmail = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });
      
      if (error) {
        console.error('Error resending verification email:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in resendVerificationEmail:', error);
      return false;
    }
  };

  return {
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    verifyEmail,
    resendVerificationEmail,
  };
};
