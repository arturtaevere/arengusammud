
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useUserAuthentication } from './useUserAuthentication';
import { useUserProfile } from './useUserProfile';

export const useAuthActions = () => {
  const { toast } = useToast();
  
  const { login, signup } = useUserAuthentication();
  const { updateProfileImage, getAllUsers, deleteUserByEmail } = useUserProfile();

  return {
    login,
    signup,
    updateProfileImage,
    getAllUsers,
    deleteUserByEmail,
  };
};
