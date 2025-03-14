
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, ClipboardList, LayoutDashboard, Users } from 'lucide-react';

interface MobileMenuProps {
  getInitials: (name: string) => string;
}

const MobileMenu = ({ getInitials }: MobileMenuProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isCoach = user?.role === 'coach';

  return (
    <div className="md:hidden glass animate-fade-in">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {user ? (
          <>
            <Link 
              to="/competences" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/competences' || location.pathname === '/action-steps' || location.pathname.includes('/action-steps/') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Sisu
              </div>
            </Link>
            <Link 
              to="/observations" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname.includes('/observations') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <ClipboardList className="mr-2 h-5 w-5" />
                Vaatlused ja tagasiside
              </div>
            </Link>
            <Link 
              to="/dashboard" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/dashboard' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Töölaud
              </div>
            </Link>
            {isCoach && (
              <Link 
                to="/admin" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === '/admin' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Haldus
                </div>
              </Link>
            )}
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
                  onClick={logout}
                >
                  Logi välja
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link 
              to="/features" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/features' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-gray-100'
              }`}
            >
              Võimalused
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/about' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-gray-100'
              }`}
            >
              Meist
            </Link>
            <div className="pt-4 space-y-2 px-3">
              <Link to="/auth" className="w-full block">
                <Button variant="outline" className="w-full transition-all">Logi sisse</Button>
              </Link>
              <Link to="/auth" className="w-full block">
                <Button className="w-full transition-all">Alusta</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
