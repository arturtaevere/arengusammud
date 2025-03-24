
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="mt-4 border-t pt-4 px-3">
      <div className="flex items-center mb-3">
        <Avatar className="h-10 w-10 mr-3">
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
        <div>
          <div className="font-medium">{user?.name}</div>
          <div className="text-xs text-muted-foreground">
            {user?.role === 'juht' ? 'Juht' : 'Õpetaja'}
            {user?.school && ` • ${user.school}`}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Link to="/profile" className="block w-full">
          <Button variant="outline" className="w-full justify-start">
            Profiil
          </Button>
        </Link>
        <Link to="/settings" className="block w-full">
          <Button variant="outline" className="w-full justify-start">
            Seaded
          </Button>
        </Link>
        <Button 
          variant="destructive" 
          className="w-full" 
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
