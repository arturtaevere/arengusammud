
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import MobileAuthenticatedLinks from './mobile/MobileAuthenticatedLinks';
import MobilePublicLinks from './mobile/MobilePublicLinks';
import MobileUserProfile from './mobile/MobileUserProfile';

interface MobileMenuProps {
  getInitials: (name: string) => string;
}

const MobileMenu = ({ getInitials }: MobileMenuProps) => {
  const { user } = useAuth();
  
  return (
    <div className="md:hidden glass animate-fade-in">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {user ? (
          <>
            <MobileAuthenticatedLinks />
            <MobileUserProfile getInitials={getInitials} />
          </>
        ) : (
          <MobilePublicLinks />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
