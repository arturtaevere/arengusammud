
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Logo = () => {
  const [imgError, setImgError] = useState(false);
  const logoPath = "/lovable-uploads/89481257-304f-4313-93a8-76b507d1a8ee.png";

  return (
    <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
      <img 
        src={imgError ? '/favicon.ico' : logoPath}
        alt="Arengusammud logo" 
        className="h-8 w-auto"
        loading="eager"
        onError={(e) => {
          console.error('Logo failed to load', e);
          e.currentTarget.onerror = null; // Prevent infinite error loop
          setImgError(true);
        }}
      />
      <span className="font-semibold text-xl tracking-tight">Arengusammud</span>
    </Link>
  );
};

export default Logo;
