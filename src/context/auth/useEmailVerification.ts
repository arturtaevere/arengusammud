
import { useToast } from '@/components/ui/use-toast';
import { UserWithPassword } from './types';
import { USERS_STORAGE_KEY, VERIFICATION_TOKENS_KEY } from './constants';

export const useEmailVerification = (
  users: UserWithPassword[],
  saveUsers: (updatedUsers: UserWithPassword[]) => void,
  generateVerificationToken: (userId: string) => string
) => {
  const { toast } = useToast();

  const verifyEmail = async (userId: string, token: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the most up-to-date tokens directly from localStorage
    const currentTokens = JSON.parse(localStorage.getItem(VERIFICATION_TOKENS_KEY) || '{}');
    
    console.log(`Trying to verify userId: ${userId} with token: ${token}`);
    console.log('Available tokens from localStorage:', currentTokens);
    
    // For debugging
    if (currentTokens[userId] === token) {
      console.log('✅ Token match found!');
    } else {
      console.log(`❌ Token mismatch. Expected: ${currentTokens[userId]}, Received: ${token}`);
    }
    
    // Check against the tokens from localStorage
    if (currentTokens[userId] === token) {
      try {
        // Get the most up-to-date users
        const currentUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
        
        // Update the user's emailVerified status
        const updatedUsers = currentUsers.map((u: UserWithPassword) => {
          if (u.id === userId) {
            console.log(`Marking user ${u.email} as verified`);
            return { ...u, emailVerified: true };
          }
          return u;
        });
        
        // Save the updated users
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
        saveUsers(updatedUsers);
        
        // Remove the used token
        const { [userId]: removedToken, ...restTokens } = currentTokens;
        localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify(restTokens));
        
        console.log('User verified successfully');
        console.log('Updated users:', updatedUsers);
        console.log('Removed used token, remaining tokens:', restTokens);
        
        toast({
          title: "Email kinnitatud",
          description: "Sinu e-posti aadress on edukalt kinnitatud. Võid nüüd sisse logida.",
        });
        
        return true;
      } catch (error) {
        console.error('Error during verification process:', error);
        return false;
      }
    }
    
    toast({
      variant: "destructive",
      title: "Kinnitamine ebaõnnestus",
      description: "Vigane või aegunud kinnituslink. Palun proovi uuesti.",
    });
    
    return false;
  };

  const resendVerificationEmail = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Always use the most up-to-date users from localStorage
    const currentUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const foundUser = currentUsers.find((u: UserWithPassword) => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      // Always regenerate the token
      const token = generateVerificationToken(foundUser.id);
      const verificationLink = `${window.location.origin}/verify-email?id=${foundUser.id}&token=${token}`;
      
      console.log(`User found: ${foundUser.email}, ID: ${foundUser.id}`);
      console.log(`New verification token: ${token}`);
      console.log(`Verification link: ${verificationLink}`);
      
      toast({
        title: "Kinnitusmeil saadetud",
        description: "Uus kinnitusmeil on saadetud. Palun kontrolli oma postkasti.",
      });
      
      // For development: Show verification link directly in UI and alert
      alert(`DEV MODE: Use this verification link: ${verificationLink}`);
      
      return true;
    } else {
      console.log(`User with email ${email} not found`);
      
      toast({
        variant: "destructive",
        title: "Saatmine ebaõnnestus",
        description: "Kasutajat selle e-posti aadressiga ei leitud.",
      });
      
      return false;
    }
  };

  return {
    verifyEmail,
    resendVerificationEmail
  };
};
