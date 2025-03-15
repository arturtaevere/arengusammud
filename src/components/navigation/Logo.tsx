
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
      <img 
        src="/lovable-uploads/89481257-304f-4313-93a8-76b507d1a8ee.png" 
        alt="Arengusammud logo" 
        className="h-8 w-auto"
        loading="eager"
        onError={(e) => {
          console.error('Logo failed to load', e);
          e.currentTarget.onerror = null; // Prevent infinite error loop
          e.currentTarget.src = '/favicon.ico'; // Fallback image
        }}
      />
      <span className="font-semibold text-xl tracking-tight">Arengusammud</span>
    </Link>
  );
};

export default Logo;
