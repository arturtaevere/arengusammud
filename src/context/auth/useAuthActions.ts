
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User } from './types';
import { supabase } from '@/integrations/supabase/client';

export const useAuthActions = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();
  
  // Load user profiles from Supabase
  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
        
      if (error) {
        console.error('Error fetching profiles:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profiles",
        });
        return [];
      }
      
      console.log('Loaded profiles from Supabase:', data);
      
      // Transform profiles to the expected User format
      const transformedUsers = data.map(profile => ({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role as 'juht' | 'õpetaja',
        school: profile.school || undefined,
        createdAt: profile.created_at,
        emailVerified: profile.email_verified || false,
        profileImage: profile.profile_image || undefined
      }));
      
      return transformedUsers;
    } catch (error) {
      console.error('Error in fetchProfiles:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch user profiles",
      });
      return [];
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      const profiles = await fetchProfiles();
      setUsers(profiles);
    };
    
    loadUsers();
    
    // Listen for auth state changes to refresh users list
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        loadUsers();
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
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
      
      toast({
        title: "Sisselogimine õnnestus",
        description: `Tere tulemast, ${profileData.name}!`,
      });
      
      return {
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        role: profileData.role,
        school: profileData.school || undefined,
        createdAt: profileData.created_at,
        emailVerified: profileData.email_verified || false,
        profileImage: profileData.profile_image || undefined
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'juht' | 'õpetaja', school?: string) => {
    try {
      console.log(`Attempting to sign up user with email: ${email}, role: ${role}, school: ${school || 'Not specified'}`);
      
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            school: school || ''
          }
        }
      });
      
      if (error) {
        console.error('Signup error (Supabase):', error);
        throw error;
      }
      
      if (!data.user) {
        console.error('No user returned from signup');
        throw new Error('No user returned from signup');
      }
      
      // Registration was successful
      console.log('Signup successful, user ID:', data.user.id);
      
      toast({
        title: "Registreerimine õnnestus",
        description: "Konto on loodud. Kontrolli oma e-posti kinnituslingi saamiseks.",
      });
      
      await fetchProfiles(); // Refresh the profiles list
      
      return email;
    } catch (error) {
      console.error('Signup error in useAuthActions:', error);
      throw error;
    }
  };

  const updateProfileImage = async (userId: string, imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ profile_image: imageUrl })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Profiilipilt uuendatud",
        description: "Sinu profiilipilt on edukalt uuendatud.",
      });
      
      // Refresh local users state
      const updatedUsers = users.map(u => {
        if (u.id === userId) {
          return { ...u, profileImage: imageUrl };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Get the updated user profile
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (profileError) {
        console.error('Error fetching updated profile:', profileError);
        return updatedUsers.find(u => u.id === userId);
      }
      
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        school: data.school || undefined,
        createdAt: data.created_at,
        emailVerified: data.email_verified || false,
        profileImage: data.profile_image || undefined
      };
    } catch (error) {
      console.error('Error updating profile image:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile image",
      });
      return users.find(u => u.id === userId);
    }
  };

  const getAllUsers = async () => {
    const profiles = await fetchProfiles();
    return profiles;
  };

  const deleteUserByEmail = async (email: string) => {
    try {
      // Find the user ID by email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
        
      if (userError) {
        toast({
          variant: "destructive",
          title: "Kasutaja kustutamine ebaõnnestus",
          description: "Kasutajat selle e-posti aadressiga ei leitud.",
        });
        return false;
      }
      
      // Only admins should be able to delete users through the admin panel
      // This is a client-side operation so we also need Row Level Security for proper security
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userData.id);
        
      if (error) {
        console.error('Error deleting user:', error);
        toast({
          variant: "destructive",
          title: "Kasutaja kustutamine ebaõnnestus",
          description: error.message,
        });
        return false;
      }
      
      toast({
        title: "Kasutaja kustutatud",
        description: `Kasutaja e-postiga ${email} on edukalt kustutatud.`,
      });
      
      // Refresh the users list
      const updatedProfiles = await fetchProfiles();
      setUsers(updatedProfiles);
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        variant: "destructive",
        title: "Kasutaja kustutamine ebaõnnestus",
        description: "Midagi läks valesti, proovi hiljem uuesti.",
      });
      return false;
    }
  };

  return {
    users,
    setUsers,
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail,
  };
};
