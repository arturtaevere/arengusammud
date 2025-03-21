
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/auth/AuthForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, pendingVerificationEmail, user, session } = useAuth();
  const [localLoading, setLocalLoading] = useState(true);
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  
  // Set a maximum loading time to avoid getting stuck in loading state
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLocalLoading(false);
    }, 2000); // 2 seconds max loading time
    
    return () => clearTimeout(loadingTimeout);
  }, []);
  
  // Forcefully check auth status every 2 seconds (up to 5 attempts)
  useEffect(() => {
    if (!isAuthenticated && !isLoading && redirectAttempts < 5) {
      const redirectCheck = setTimeout(() => {
        setRedirectAttempts(prev => prev + 1);
        console.log('Checking auth state again, attempt:', redirectAttempts + 1);
      }, 2000);
      
      return () => clearTimeout(redirectCheck);
    }
  }, [isAuthenticated, isLoading, redirectAttempts]);
  
  useEffect(() => {
    // Handle redirect if user is authenticated
    if (session && !pendingVerificationEmail) {
      console.log('User session exists, redirecting to dashboard');
      navigate('/dashboard');
    } else if (isAuthenticated && !pendingVerificationEmail) {
      console.log('User is authenticated, redirecting to dashboard');
      navigate('/dashboard');
    } else if (!isLoading && !localLoading) {
      console.log('Auth state resolved, ready to show auth form');
    }
  }, [isAuthenticated, isLoading, localLoading, navigate, pendingVerificationEmail, session, user]);
  
  // Only show loading state if we're still loading
  if ((isLoading || localLoading) && redirectAttempts < 3) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4 w-64">
          <Skeleton className="w-full h-8 rounded-full" />
          <Skeleton className="w-3/4 h-8 rounded-full" />
          <Skeleton className="w-1/2 h-8 rounded-full" />
          <p className="text-gray-500 mt-2">Laadimine...</p>
        </div>
      </div>
    );
  }
  
  // If authenticated but still here, add a manual redirect button as fallback
  if (session || isAuthenticated || (user && !pendingVerificationEmail)) {
    // This is a fallback to ensure users can always get to the dashboard
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <p className="text-green-600 mb-3">Sisselogimine õnnestus!</p>
          <p className="text-gray-500 mb-3">Ümbersuunamine...</p>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Mine avalehele
          </Button>
        </div>
      </div>
    );
  }
  
  // Show auth form if not authenticated
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthForm />
    </div>
  );
};

export default Auth;
