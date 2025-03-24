
import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { USER_STORAGE_KEY, USERS_STORAGE_KEY } from './constants';
import { supabase } from '@/integrations/supabase/client';

export const useUserAuthentication = (
  users: UserWithPassword[],
  saveUsers: (updatedUsers: UserWithPassword[]) => void
) => {
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting to login with Supabase:', { email });
      
      // Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        console.error('Supabase auth error:', authError);
        throw new Error(authError.message || 'Vale e-post või parool');
      }
      
      if (!authData.user) {
        console.error('No user data returned from Supabase');
        throw new Error('Kasutajat ei leitud');
      }
      
      console.log('Auth successful, fetching profile');
      
      // Get the user profile from the profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();
      
      if (profileError) {
        console.error('Error fetching profile:', profileError);
        throw new Error('Profiili laadimine ebaõnnestus');
      }
      
      if (!profileData) {
        console.error('No profile found for user:', authData.user.id);
        throw new Error('Kasutaja profiili ei leitud');
      }
      
      console.log('Profile data retrieved:', profileData);
      
      // Map Supabase profile to our User type
      const userWithoutPassword: User = {
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        role: profileData.role as 'juht' | 'õpetaja',
        school: profileData.school,
        createdAt: profileData.created_at,
        emailVerified: profileData.email_verified,
        profileImage: profileData.profile_image
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Sisselogimine õnnestus",
        description: `Tere tulemast, ${userWithoutPassword.name}!`,
      });
      
      return userWithoutPassword;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school: string) => {
    // School is now required for all users, so we validate it here
    if (!school || school.trim() === '') {
      throw new Error('Kooli valimine on kohustuslik');
    }

    console.log('Attempting to signup with Supabase:', { name, email, role, school });

    try {
      // Register with Supabase
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
        console.error('Signup error from Supabase:', error);
        throw new Error(error.message || 'Registreerimine ebaõnnestus');
      }
      
      if (!data || !data.user) {
        console.error('No user data returned from Supabase signup');
        throw new Error('Kasutaja loomine ebaõnnestus');
      }

      console.log('Signup successful, user created:', data.user.id);
      
      toast({
        title: "Registreerimine õnnestus",
        description: "Konto on loodud. Võid nüüd sisse logida.",
      });
      
      return email;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  return {
    login,
    signup
  };
};
