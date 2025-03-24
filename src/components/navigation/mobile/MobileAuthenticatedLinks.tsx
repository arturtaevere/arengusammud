
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Lightbulb, MessageCircle, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const MobileAuthenticatedLinks = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isJuht = user?.role === 'juht';

  return (
    <>
      <Link 
        to="/dashboard" 
        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
          location.pathname === '/dashboard' 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center">
          <Home className="mr-2 h-5 w-5" />
          Avaleht
        </div>
      </Link>
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
        to="/study-circles" 
        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
          location.pathname.includes('/study-circles') 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5" />
          Õpiringid
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
          <MessageCircle className="mr-2 h-5 w-5" />
          Õpipartnerlus
        </div>
      </Link>
      {isJuht && (
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
    </>
  );
};

export default MobileAuthenticatedLinks;
