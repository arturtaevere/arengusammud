
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ClipboardList, LayoutDashboard, Users, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const MainNavLinks = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'juht';

  return (
    <nav className="hidden md:flex items-center space-x-6 ml-8">
      <Link 
        to="/competences" 
        className={`flex items-center transition-colors ${
          location.pathname === '/competences' || location.pathname === '/action-steps' || location.pathname.includes('/action-steps/') 
            ? 'text-primary font-medium' 
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        <span>Sisu</span>
      </Link>
      <Link 
        to="/study-circles" 
        className={`flex items-center transition-colors ${
          location.pathname.includes('/study-circles') 
            ? 'text-primary font-medium' 
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        <span>Õpiringid</span>
      </Link>
      <Link 
        to="/observations" 
        className={`flex items-center transition-colors ${
          location.pathname.includes('/observations') 
            ? 'text-primary font-medium' 
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        <ClipboardList className="mr-2 h-4 w-4" />
        <span>Õpipartnerlus</span>
      </Link>
      <Link 
        to="/dashboard" 
        className={`flex items-center transition-colors ${
          location.pathname === '/dashboard' 
            ? 'text-primary font-medium' 
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        <span>Töölaud</span>
      </Link>
      {isAdmin && (
        <Link 
          to="/admin" 
          className={`flex items-center transition-colors ${
            location.pathname === '/admin' 
              ? 'text-primary font-medium' 
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <Users className="mr-2 h-4 w-4" />
          <span>Haldus</span>
        </Link>
      )}
    </nav>
  );
};

export default MainNavLinks;
