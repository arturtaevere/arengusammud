
import { Link, useLocation } from 'react-router-dom';

const PublicNavLinks = () => {
  const location = useLocation();
  
  return (
    <nav className="hidden md:flex space-x-8">
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
    </nav>
  );
};

export default PublicNavLinks;
