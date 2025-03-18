
import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { USER_STORAGE_KEY } from './constants';

export const useUserProfile = (
  users: UserWithPassword[], 
  saveUsers: (updatedUsers: UserWithPassword[]) => void
) => {
  const { toast } = useToast();

  const updateProfileImage = (userId: string, imageUrl: string) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return { ...u, profileImage: imageUrl };
      }
      return u;
    });
    
    saveUsers(updatedUsers);
    
    // Update the current user in localStorage if needed
    const currentUserStr = localStorage.getItem(USER_STORAGE_KEY);
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser.id === userId) {
          const updatedUser = { ...currentUser, profileImage: imageUrl };
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error('Error updating profile image in localStorage:', error);
      }
    }
    
    toast({
      title: "Profiilipilt uuendatud",
      description: "Sinu profiilipilt on edukalt uuendatud.",
    });
    
    return updatedUsers.find(u => u.id === userId);
  };

  const getAllUsers = () => {
    console.log('getAllUsers called, returning users:', users.length);
    // Deep clone the users array and remove passwords
    return users.map(({ password, ...user }) => user);
  };

  const deleteUserByEmail = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Protect main admin account
    if (email.toLowerCase() === 'artur@arengusammud.ee') {
      toast({
        variant: "destructive",
        title: "Toimingut ei saa teha",
        description: "Süsteemi peakasutajat ei saa kustutada.",
      });
      return false;
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);
    
    if (userIndex === -1) {
      toast({
        variant: "destructive",
        title: "Kasutaja kustutamine ebaõnnestus",
        description: "Kasutajat selle e-posti aadressiga ei leitud.",
      });
      return false;
    }
    
    const updatedUsers = [...users];
    updatedUsers.splice(userIndex, 1);
    
    saveUsers(updatedUsers);
    
    toast({
      title: "Kasutaja kustutatud",
      description: `Kasutaja e-postiga ${email} on edukalt kustutatud.`,
    });
    
    return true;
  };

  return {
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail
  };
};
