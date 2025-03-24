
import { useToast } from '@/components/ui/use-toast';
import { UserWithPassword, User } from './types';
import { supabase } from '@/integrations/supabase/client';

export const useUserProfile = (
  users: UserWithPassword[], 
  saveUsers: (updatedUsers: UserWithPassword[]) => void
) => {
  const { toast } = useToast();

  const updateProfileImage = async (userId: string, imageUrl: string) => {
    try {
      // Update profile image in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ profile_image: imageUrl })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Profiilipilt uuendatud",
        description: "Sinu profiilipilt on edukalt uuendatud.",
      });
      
      // Return the updated user data
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      return data;
    } catch (error) {
      console.error('Error updating profile image:', error);
      toast({
        variant: "destructive",
        title: "Profiilipildi uuendamine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
      return null;
    }
  };

  const getAllUsers = async (): Promise<User[]> => {
    try {
      // Fetch all users from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Map the data to our User type
      return data.map(profile => ({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role as 'juht' | 'õpetaja',
        school: profile.school,
        createdAt: profile.created_at,
        emailVerified: profile.email_verified,
        profileImage: profile.profile_image
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Kasutajate laadimine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
      return [];
    }
  };

  const deleteUserByEmail = async (email: string): Promise<boolean> => {
    try {
      // First find the user with this email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      
      if (userError) throw userError;
      if (!userData) throw new Error('Kasutajat selle e-posti aadressiga ei leitud');
      
      // Delete the user from Supabase auth (this will cascade to the profile due to our foreign key)
      const { error: deleteError } = await supabase.auth.admin.deleteUser(
        userData.id
      );
      
      if (deleteError) throw deleteError;
      
      toast({
        title: "Kasutaja kustutatud",
        description: `Kasutaja e-postiga ${email} on edukalt kustutatud.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        variant: "destructive",
        title: "Kasutaja kustutamine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
      return false;
    }
  };

  return {
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail
  };
};
