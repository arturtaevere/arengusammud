
import { useToast } from '@/components/ui/use-toast';
import { User, UserWithPassword } from './types';
import { USER_STORAGE_KEY, USERS_STORAGE_KEY } from './constants';

export const useUserProfile = (
  users: UserWithPassword[], 
  saveUsers: (updatedUsers: UserWithPassword[]) => void
) => {
  const { toast } = useToast();

  const updateProfileImage = (imageUrl: string) => {
    const updatedUsers = users.map(u => {
      if (u.id === users.id) {
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
        if (currentUser.id === users.id) {
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
    
    return updatedUsers.find(u => u.id === users.id);
  };

  const getAllUsers = () => {
    // Always directly read from localStorage to get the most up-to-date data
    const storedUsersStr = localStorage.getItem(USERS_STORAGE_KEY);
    let latestUsers = [];
    
    if (storedUsersStr) {
      try {
        latestUsers = JSON.parse(storedUsersStr);
        console.log('getAllUsers - direct localStorage read:', latestUsers.length, 'users found');
        console.log('User emails in localStorage:', latestUsers.map((u: any) => u.email).join(', '));
      } catch (e) {
        console.error('Error parsing users in getAllUsers:', e);
        latestUsers = users; // Fallback to state
      }
    } else {
      console.log('No users found in localStorage, falling back to state');
      latestUsers = users;
    }
    
    // Deep clone the users array and remove passwords
    return latestUsers.map(({ password, ...user }: UserWithPassword) => user);
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
    
    // Always get the latest users from localStorage
    const storedUsersStr = localStorage.getItem(USERS_STORAGE_KEY);
    let currentUsers = users;
    
    if (storedUsersStr) {
      try {
        currentUsers = JSON.parse(storedUsersStr);
      } catch (e) {
        console.error('Error parsing users during delete:', e);
      }
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    const userIndex = currentUsers.findIndex(u => u.email.toLowerCase() === normalizedEmail);
    
    if (userIndex === -1) {
      toast({
        variant: "destructive",
        title: "Kasutaja kustutamine ebaõnnestus",
        description: "Kasutajat selle e-posti aadressiga ei leitud.",
      });
      return false;
    }
    
    const updatedUsers = [...currentUsers];
    updatedUsers.splice(userIndex, 1);
    
    // Save to localStorage first for immediate effect
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    // Then update state and dispatch events
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
