
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
import { BookOpen, ClipboardList, MessageSquare, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if window has been scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Conditionally set navbar styles
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || isAuthenticated 
      ? 'py-2 glass shadow-sm' 
      : 'py-4 bg-transparent'
  }`;

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <span className="font-semibold text-xl tracking-tight">TeachSpire</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`transition-all hover:text-primary ${
                    location.pathname === '/dashboard' ? 'text-primary font-medium' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/action-steps" 
                  className={`transition-all hover:text-primary ${
                    location.pathname === '/action-steps' ? 'text-primary font-medium' : ''
                  }`}
                >
                  Action Steps
                </Link>
                <Link 
                  to="/observations" 
                  className={`transition-all hover:text-primary ${
                    location.pathname === '/observations' ? 'text-primary font-medium' : ''
                  }`}
                >
                  Observations
                </Link>
                <Link 
                  to="/feedback" 
                  className={`transition-all hover:text-primary ${
                    location.pathname === '/feedback' ? 'text-primary font-medium' : ''
                  }`}
                >
                  Feedback
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
                  Features
                </Link>
                <Link 
                  to="/about" 
                  className={`transition-all hover:text-primary ${
                    location.pathname === '/about' ? 'text-primary font-medium' : ''
                  }`}
                >
                  About
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} alt={user?.name} />
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
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="transition-all">Login</Button>
                </Link>
                <Link to="/auth">
                  <Button className="transition-all">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === '/dashboard' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/action-steps" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === '/action-steps' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <ClipboardList className="mr-2 h-5 w-5" />
                    Action Steps
                  </div>
                </Link>
                <Link 
                  to="/observations" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === '/observations' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Observations
                  </div>
                </Link>
                <Link 
                  to="/feedback" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === '/feedback' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Feedback
                  </div>
                </Link>
                <div className="pt-4 pb-2">
                  <div className="flex items-center px-3">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} alt={user?.name} />
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
                      Profile
                    </Link>
                    <Link 
                      to="/settings"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
                    >
                      Settings
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-3 py-2 text-base font-medium text-red-500 hover:bg-gray-100 transition-colors"
                      onClick={logout}
                    >
                      Logout
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
                  Features
                </Link>
                <Link 
                  to="/about" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === '/about' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  About
                </Link>
                <div className="pt-4 space-y-2 px-3">
                  <Link to="/auth" className="w-full block">
                    <Button variant="outline" className="w-full transition-all">Login</Button>
                  </Link>
                  <Link to="/auth" className="w-full block">
                    <Button className="w-full transition-all">Get Started</Button>
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
