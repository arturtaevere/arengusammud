
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const VerifyEmail = () => {
  const { verifyEmail, resendVerificationEmail, pendingVerificationEmail, setPendingVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error' | 'pending'>('pending');
  const [email, setEmail] = useState(pendingVerificationEmail || '');
  
  useEffect(() => {
    // Show toast notifying that verification is disabled
    toast({
      title: "Email Verification Disabled",
      description: "Email verification is currently disabled. You can proceed with using the application.",
    });
  }, [toast]);
  
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
          <Card className="w-full glass">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Mail className="h-12 w-12 text-primary" />
              </div>
              
              <CardTitle className="text-2xl">
                Email Verification Disabled
              </CardTitle>
              
              <CardDescription>
                Email verification is currently disabled
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-center text-muted-foreground">
                Email verification has been temporarily disabled. You can proceed with using the application.
              </p>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" onClick={() => navigate('/auth')}>
                Back to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
