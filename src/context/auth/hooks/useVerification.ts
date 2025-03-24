
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVerification = () => {
  // State for pendingVerificationEmail
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  
  // Email verification functions
  const verifyEmail = async (id: string, token: string) => {
    console.log("Email verification is handled by Supabase Auth");
    return true;
  };

  const resendVerificationEmail = async (email: string) => {
    if (pendingVerificationEmail) {
      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: pendingVerificationEmail,
        });
        
        if (error) throw error;
        
        return true;
      } catch (error) {
        console.error('Error resending verification email:', error);
        return false;
      }
    }
    return false;
  };

  return {
    verifyEmail,
    resendVerificationEmail,
    pendingVerificationEmail,
    setPendingVerificationEmail
  };
};
