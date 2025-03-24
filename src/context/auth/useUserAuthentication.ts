
import { useToast } from '@/components/ui/use-toast';
import { User } from './types';
import { supabase } from '@/integrations/supabase/client';

export const useUserAuthentication = () => {
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error(error.message || 'Vale e-post või parool');
      }
      
      toast({
        title: "Sisselogimine õnnestus",
        description: `Tere tulemast!`,
      });
      
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string) => {
    try {
      // Create auth user with metadata for our trigger function
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
        throw new Error(error.message || 'Registreerimine ebaõnnestus');
      }
      
      toast({
        title: "Registreerimine õnnestus",
        description: "Konto on loodud. Võid nüüd sisse logida.",
      });
      
      return data.user;
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
