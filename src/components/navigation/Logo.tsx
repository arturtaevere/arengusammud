
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
      <div className="h-10 w-auto flex items-center justify-center">
        {!imageError ? (
          <img 
            src="/lovable-uploads/3d322529-4177-4602-ac5a-72d33ab80aa9.png" 
            alt="Arengusammud Logo" 
            className="h-10 w-auto"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="font-bold text-2xl text-primary">A</span>
        )}
      </div>
      <span className="font-semibold text-xl tracking-tight">Arengusammud</span>
    </Link>
  );
};

export default Logo;
