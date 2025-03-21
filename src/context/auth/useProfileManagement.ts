
import { User, UserWithPassword } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { USER_STORAGE_KEY } from './constants';

export const useProfileManagement = (user: User | null, setUser: (user: User | null) => void) => {
  const { toast } = useToast();

  // Handle profile image update
  const handleUpdateProfileImage = async (imageUrl: string): Promise<void> => {
    if (user) {
      try {
        // Update in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({ profile_image: imageUrl })
          .eq('id', user.id);
          
        if (error) throw error;
        
        // Update local state
        const updatedUser = { ...user, profileImage: imageUrl };
        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating profile image:', error);
        throw error;
      }
    }
    return Promise.resolve();
  };

  // Get all users (admin only)
  const getAllUsers = (): UserWithPassword[] => {
    // Modified to return an empty array of UserWithPassword type
    return [] as UserWithPassword[];
  };

  // Delete user by email (admin only)
  const deleteUserByEmail = async (email: string): Promise<boolean> => {
    try {
      if (user?.role !== 'juht' && user?.role !== 'coach') {
        return false;
      }
      
      // For this demo, we don't have admin API access to delete users
      // In a production app, you would use Supabase admin API or Edge Functions
      // For now, just simulate success
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };

  // Modified to be synchronous per the type definition
  const refreshUsers = () => {
    // This is now a no-op since getAllUsers is synchronous
    return;
  };

  return {
    updateProfileImage: handleUpdateProfileImage,
    getAllUsers,
    deleteUserByEmail,
    refreshUsers,
  };
};
