
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserWithPassword } from './types';

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
    
    toast({
      title: "Profiilipilt uuendatud",
      description: "Sinu profiilipilt on edukalt uuendatud.",
    });
    
    return updatedUsers.find(u => u.id === userId);
  };

  const getAllUsers = () => {
    return users.map(({ password, ...user }) => user);
  };

  const deleteUserByEmail = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    
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
