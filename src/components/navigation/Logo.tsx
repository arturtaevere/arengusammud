
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
      <div className="h-8 w-auto flex items-center justify-center">
        {/* Step logo with orange gradients based on provided image */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="transparent" />
          <rect x="8" y="16" width="8" height="8" fill="#FEC6A1" /> {/* Light orange (bottom step) */}
          <rect x="8" y="8" width="8" height="8" fill="#FEC6A1" /> {/* Light orange (middle step) */}
          <rect x="16" y="8" width="8" height="8" fill="#FEC6A1" /> {/* Light orange (middle step) */}
          <rect x="16" y="0" width="8" height="8" fill="#F97316" /> {/* Dark orange (top) */}
        </svg>
      </div>
      <span className="font-semibold text-xl tracking-tight">Arengusammud</span>
    </Link>
  );
};

export default Logo;
