
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MobilePublicLinks = () => {
  const location = useLocation();
  
  return (
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
  );
};

export default MobilePublicLinks;
