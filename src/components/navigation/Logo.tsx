
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
      <div className="h-8 w-auto flex items-center justify-center">
        {/* Staircase logo with orange gradients */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="url(#paint0_linear)" />
          <path d="M8 8H14V12H8V8Z" fill="white" />
          <path d="M14 12H20V16H14V12Z" fill="white" />
          <path d="M20 16H26V20H20V16Z" fill="white" />
          <path d="M8 20H26V24H8V20Z" fill="white" />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEC6A1" /> {/* Light orange */}
              <stop offset="1" stopColor="#F97316" /> {/* Dark orange */}
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="font-semibold text-xl tracking-tight">Arengusammud</span>
    </Link>
  );
};

export default Logo;
