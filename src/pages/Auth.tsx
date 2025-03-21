
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, pendingVerificationEmail } = useAuth();
  const [localLoading, setLocalLoading] = useState(true);
  
  // Set a maximum loading time to avoid getting stuck in loading state
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLocalLoading(false);
    }, 2000); // 2 seconds max loading time
    
    return () => clearTimeout(loadingTimeout);
  }, []);
  
  useEffect(() => {
    // Initialize with a small delay to allow auth state to settle
    const initTimeout = setTimeout(() => {
      // If authenticated and not waiting for email verification, redirect to dashboard
      if (isAuthenticated && !pendingVerificationEmail) {
        console.log('User is authenticated, redirecting to dashboard');
        navigate('/dashboard');
      } else if (!isLoading && !localLoading) {
        console.log('User is not authenticated, staying on auth page');
      }
    }, 500);
    
    return () => clearTimeout(initTimeout);
  }, [isAuthenticated, isLoading, localLoading, navigate, pendingVerificationEmail]);
  
  // Show loading indicator while checking auth state
  if (isLoading || localLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-10 h-10 bg-primary/60 rounded-full mb-3"></div>
          <p className="text-gray-500">Laadimine...</p>
        </div>
      </div>
    );
  }
  
  // If already authenticated but still here, there might be a redirect issue
  // Add a button to manually go to dashboard
  if (isAuthenticated && !pendingVerificationEmail) {
    // This is a fallback to ensure users can always get to the dashboard
    // The useEffect should handle the redirect, but if it fails for some reason
    // this gives users a way out
    setTimeout(() => navigate('/dashboard'), 500);
    
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <p className="text-green-600 mb-3">Sisselogimine õnnestus!</p>
          <p className="text-gray-500 mb-3">Ümbersuunamine...</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Mine avalehele
          </button>
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
