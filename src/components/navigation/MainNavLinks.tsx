
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ClipboardList, LayoutDashboard } from 'lucide-react';

const MainNavLinks = () => {
  const location = useLocation();
  
  return (
    <nav className="hidden md:flex space-x-8">
      <Link 
        to="/competences" 
        className={`transition-all hover:text-primary flex items-center ${
          location.pathname === '/competences' || location.pathname === '/action-steps' || location.pathname.includes('/action-steps/') ? 'text-primary font-medium' : ''
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
    </nav>
  );
};

export default MainNavLinks;
