
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

type VerificationMessageProps = {
  email: string;
};

const VerificationMessage = ({ email }: VerificationMessageProps) => {
  const { resendVerificationEmail, setPendingVerificationEmail } = useAuth();
  const [resending, setResending] = useState(false);
  
  const handleResend = async () => {
    setResending(true);
    try {
      // Make sure to pass the email parameter
      await resendVerificationEmail(email);
    } finally {
      setResending(false);
    }
  };
  
  const handleDismiss = () => {
    setPendingVerificationEmail(null);
  };
  
  return (
    <Card className="w-full glass">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Mail className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Verification Disabled</CardTitle>
        <CardDescription>
          Email verification is currently disabled
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Email verification has been temporarily disabled. You can proceed with using the application.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button variant="ghost" className="w-full" onClick={handleDismiss}>
          Back to login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationMessage;
