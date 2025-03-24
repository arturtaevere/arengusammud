
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface MobileUserProfileProps {
  getInitials: (name: string) => string;
}

const MobileUserProfile = ({ getInitials }: MobileUserProfileProps) => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Use the context's logout function
      const success = await logout();
      
      if (!success) {
        toast({
          title: "Väljalogimine ebaõnnestus",
          description: "Proovi uuesti",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Oled välja logitud",
          description: "Täname, et kasutasid meie rakendust!"
        });
        
        // Force page refresh to ensure clean state
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: "Väljalogimine ebaõnnestus",
        description: "Proovi uuesti",
        variant: "destructive"
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) return null;

  return (
    <div className="pt-4 pb-2">
      <div className="flex items-center px-3">
        <div className="flex-shrink-0">
          <Avatar>
            {user?.profileImage ? (
              <AvatarImage 
                src={user.profileImage} 
                alt={user?.name || 'User'} 
              />
            ) : (
              <AvatarImage 
                src={`https://avatar.vercel.sh/${user?.email}.png`} 
                alt={user?.name || 'User'} 
              />
            )}
            <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-3">
          <div className="text-base font-medium">{user?.name}</div>
          <div className="text-sm text-muted-foreground">{user?.email}</div>
        </div>
      </div>
      <div className="mt-3 px-2 space-y-1">
        <Link 
          to="/profile"
          className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
        >
          Profiil
        </Link>
        <Link 
          to="/settings"
          className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
        >
          Seaded
        </Link>
        <Button 
          variant="ghost" 
          className="w-full justify-start px-3 py-2 text-base font-medium text-red-500 hover:bg-gray-100 transition-colors"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Väljalogimine...' : 'Logi välja'}
        </Button>
      </div>
    </div>
  );
};

export default MobileUserProfile;
