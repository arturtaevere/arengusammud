
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthButtons = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link to="/auth">
        <Button variant="outline" className="transition-all">Logi sisse</Button>
      </Link>
      <Link to="/auth">
        <Button className="transition-all">Alusta</Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
