
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import { Loader2 } from 'lucide-react';

const Auth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(true);
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    console.log('Auth component mounted, auth state:', { isAuthenticated, isLoading });
    
    // Add a small delay to ensure auth state is fully loaded
    const timer = setTimeout(() => {
      setLocalLoading(false);
      if (isAuthenticated) {
        console.log('User is authenticated, redirecting to dashboard');
        navigate('/dashboard');
      } else {
        console.log('User is not authenticated, staying on auth page');
      }
    }, 1000); // Increased timeout to ensure auth state is resolved
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, isLoading]);
  
  // Force exit loading state after 3 seconds maximum to prevent stalling
  useEffect(() => {
    const maxLoadingTimer = setTimeout(() => {
      if (localLoading) {
        console.log('Forcing exit from loading state after timeout');
        setLocalLoading(false);
      }
    }, 3000);
    
    return () => clearTimeout(maxLoadingTimer);
  }, [localLoading]);
  
  if (isLoading && localLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Only show the auth form if the user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4 pt-24">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-20 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="w-full max-w-md animate-fade-in">
            <AuthForm />
          </div>
        </div>
      </div>
    );
  }
  
  // If we get here, user is authenticated but hasn't been redirected yet
  // This ensures we don't get stuck in a loading state
  console.log('Authenticated but not redirected yet, forcing redirect');
  navigate('/dashboard');
  return null;
};

export default Auth;
