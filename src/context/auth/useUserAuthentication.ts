
import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { supabase } from '@/integrations/supabase/client';

export const useUserAuthentication = (
  users: UserWithPassword[],
  saveUsers: (updatedUsers: UserWithPassword[]) => void
) => {
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      console.log('Login process started for email:', email);
      
      // Use Supabase for authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        throw error;
      }
      
      if (!data.user) {
        throw new Error('No user returned from login');
      }
      
      // Get the user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        throw new Error('Failed to load user profile');
      }
      
      console.log('Login successful, fetched profile:', profileData);
      
      // Return the user details
      const userProfile = {
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        role: profileData.role,
        school: profileData.school || undefined,
        createdAt: profileData.created_at,
        emailVerified: profileData.email_verified || false,
        profileImage: profileData.profile_image || undefined
      };
      
      toast({
        title: "Sisselogimine õnnestus",
        description: `Tere tulemast, ${profileData.name}!`,
      });
      
      return userProfile;
    } catch (error) {
      console.error('Login error in useUserAuthentication:', error);
      throw error; // Re-throw the error for proper handling in the UI
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string) => {
    try {
      console.log(`Attempting to sign up user with email: ${email}, role: ${role}, school: ${school || 'Not specified'}`);
      
      if (!school) {
        throw new Error('Kooli valimine on kohustuslik');
      }
      
      // Use Supabase for user registration
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            school
          }
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        throw error;
      }
      
      if (!data.user) {
        console.error('No user returned from signup');
        throw new Error('No user returned from signup');
      }
      
      console.log('Signup successful, user ID:', data.user.id);
      
      toast({
        title: "Registreerimine õnnestus",
        description: "Konto on loodud. Kontrolli oma e-posti kinnituslingi saamiseks.",
      });
      
      return email;
    } catch (error) {
      console.error('Signup error in useUserAuthentication:', error);
      throw error;
    }
  };

  return {
    login,
    signup
  };
};
