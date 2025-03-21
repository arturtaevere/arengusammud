
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/auth/AuthForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, pendingVerificationEmail } = useAuth();
  
  useEffect(() => {
    // Handle redirect if user is authenticated
    if (isAuthenticated && !pendingVerificationEmail) {
      console.log('User is authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, pendingVerificationEmail]);
  
  if (isLoading) {
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
  
  // If user is authenticated but still here (e.g., during redirect), show a manual redirect button
  if (isAuthenticated && !pendingVerificationEmail) {
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
