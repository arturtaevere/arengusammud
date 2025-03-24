
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

// Import the refactored components
import Logo from './navigation/Logo';
import MainNavLinks from './navigation/MainNavLinks';
import PublicNavLinks from './navigation/PublicNavLinks';
import UserMenu from './navigation/UserMenu';
import AuthButtons from './navigation/AuthButtons';
import MobileMenu from './navigation/MobileMenu';
import { getInitials } from '@/utils/stringUtils';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
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
          <Logo />

          {isAuthenticated ? <MainNavLinks /> : <PublicNavLinks />}

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu getInitials={getInitials} />
            ) : (
              <AuthButtons />
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

      {mobileMenuOpen && <MobileMenu getInitials={getInitials} />}
    </header>
  );
};

export default Navbar;
