
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User } from './types';
import { supabase } from '@/integrations/supabase/client';

export const useUserProfile = () => {
  const { toast } = useToast();

  const updateProfileImage = async (userId: string, imageUrl: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ profile_image: imageUrl })
        .eq('id', userId)
        .select()
        .single();
        
      if (error) {
        toast({
          variant: "destructive",
          title: "Profiilipildi uuendamine ebaõnnestus",
          description: error.message || "Proovi hiljem uuesti",
        });
        throw error;
      }
      
      toast({
        title: "Profiilipilt uuendatud",
        description: "Sinu profiilipilt on edukalt uuendatud.",
      });
      
      // Convert supabase profile to our User type
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        school: data.school,
        createdAt: data.created_at,
        emailVerified: data.email_verified,
        profileImage: data.profile_image,
      };
    } catch (error) {
      console.error('Error updating profile image:', error);
      throw error;
    }
  };

  const getAllUsers = async (): Promise<User[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching users:', error);
        return [];
      }
      
      // Map Supabase profile data to our User type
      return data.map(profile => ({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role as 'juht' | 'õpetaja',
        school: profile.school || undefined,
        createdAt: profile.created_at,
        emailVerified: profile.email_verified,
        profileImage: profile.profile_image || undefined,
      }));
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      return [];
    }
  };

  const deleteUserByEmail = async (email: string) => {
    try {
      // First get the user to fetch their ID
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
        
      if (error) {
        toast({
          variant: "destructive",
          title: "Kasutaja kustutamine ebaõnnestus",
          description: "Kasutajat selle e-posti aadressiga ei leitud.",
        });
        return false;
      }
      
      // Delete the user through Supabase Admin API
      // Since we can't directly delete users from client, we'll mark them for deletion
      // by removing their profile data
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', data.id);
        
      if (deleteError) {
        toast({
          variant: "destructive",
          title: "Kasutaja kustutamine ebaõnnestus",
          description: deleteError.message || "Proovi hiljem uuesti.",
        });
        return false;
      }
      
      toast({
        title: "Kasutaja kustutatud",
        description: `Kasutaja e-postiga ${email} on edukalt kustutatud.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error in deleteUserByEmail:', error);
      toast({
        variant: "destructive",
        title: "Kasutaja kustutamine ebaõnnestus",
        description: "Midagi läks valesti. Proovi hiljem uuesti.",
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
