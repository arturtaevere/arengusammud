
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
      <div className="h-8 w-auto flex items-center justify-center">
        {/* Logo with orange gradients instead of blue */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="url(#paint0_linear)" />
          <path d="M12.6666 8H9.33325V24H12.6666V8Z" fill="white" />
          <path d="M22.6666 8H19.3333V24H22.6666V8Z" fill="white" />
          <path d="M17.3333 8H14.6666V24H17.3333V8Z" fill="white" />
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
