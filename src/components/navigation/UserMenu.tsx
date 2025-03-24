
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UserMenuProps {
  getInitials: (name: string) => string;
}

const UserMenu = ({ getInitials }: UserMenuProps) => {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass">
        <DropdownMenuLabel>
          <div className="font-medium">{user?.name}</div>
          <div className="text-xs text-muted-foreground">{user?.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">Profiil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">Seaded</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-red-500 focus:text-red-500 cursor-pointer"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Väljalogimine...' : 'Logi välja'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
