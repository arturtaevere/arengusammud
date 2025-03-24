
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';

const Auth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log('User is authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  console.log('Auth page rendered, isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 pt-24">
        {/* Background elements with new colors */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-20 w-72 h-72 bg-orange-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-light"></div>
          </div>
        ) : (
          <div className="w-full max-w-md animate-fade-in">
            <AuthForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
