import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { BookOpen, ClipboardList, LayoutDashboard, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  useEffect(() => {
    if (user) {
      console.log('User in Navbar:', user);
      console.log('Profile image:', user.profileImage);
    }
  }, [user]);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || isAuthenticated 
      ? 'py-2 glass shadow-sm' 
      : 'py-4 bg-transparent'
  }`;

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <img 
              src="/lovable-uploads/89481257-304f-4313-93a8-76b507d1a8ee.png" 
              alt="Arengusammud logo" 
              className="h-8 w-auto"
            />
            <span className="font-semibold text-xl tracking-tight">Arengusammud</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/competences" 
                  className={`transition-all hover:text-primary flex items-center ${
                    location.pathname === '/competences' ? 'text-primary font-medium' : ''
                  }`}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Sisu
                </Link>
                <Link 
                  to="/observations" 
                  className={`transition-all hover:text-primary flex items-center ${
                    location.pathname.includes('/observations') ? 'text-primary font-medium' : ''
                  }`}
                >
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Vaatlused ja tagasiside
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`transition-all hover:text-primary flex items-center ${
                    location.pathname === '/dashboard' ? 'text-primary font-medium' : ''
                  }`}
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Töölaud
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/features" 
                  className={`transition-all hover:text-primary ${
                    location.pathname === '/features' ? 'text-primary font-medium' : ''
                  }`}
                >
                  Võimalused
                </Link>
                <Link 
                  to="/about" 
                  className={`transition-all hover:text-primary ${
                    location.pathname === '/about' ? 'text-primary font-medium' : ''
                  }`}
                >
                  Meist
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
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
                    onClick={logout}
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                  >
                    Logi välja
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="transition-all">Logi sisse</Button>
                </Link>
                <Link to="/auth">
                  <Button className="transition-all">Alusta</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/competences" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === '/competences' 
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
                </div>
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
      )}
    </header>
  );
};

export default Navbar;
