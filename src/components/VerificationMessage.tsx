import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

type VerificationMessageProps = {
  email: string;
};

const VerificationMessage = ({ email }: VerificationMessageProps) => {
  const { resendVerificationEmail, setPendingVerificationEmail } = useAuth();
  const [resending, setResending] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState<string | null>(null);
  
  // Listen for verification URL in console logs
  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = function(...args) {
      originalConsoleLog.apply(console, args);
      // Check if this is a verification link log
      if (typeof args[0] === 'string' && args[0].includes('Verification link:') && args[1]) {
        setVerificationUrl(args[1]);
        // For development, show the verification link in an alert
        // Helps ensure the user can easily copy it
        alert(`DEV MODE: Use this verification link: ${args[1]}`);
      }
    };
    
    return () => {
      console.log = originalConsoleLog;
    };
  }, []);
  
  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerificationEmail(email);
    } finally {
      setResending(false);
    }
  };
  
  const handleDismiss = () => {
    setPendingVerificationEmail(null);
  };
  
  // Function to automatically verify when link is available
  const handleAutoVerify = () => {
    if (verificationUrl) {
      // Instead of just navigating, we'll open in a new tab to keep this context
      window.open(verificationUrl, '_blank');
    }
  };
  
  return (
    <Card className="w-full glass">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Mail className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Kinnita oma e-post</CardTitle>
        <CardDescription>
          Saatsime e-kirja aadressile <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Palun kontrolli oma postkasti ja kliki kirjas oleval kinnituslinkil.
          Kui sa ei leia meie kirja, kontrolli ka rämpsposti kausta.
        </p>
        <p className="text-center text-sm text-muted-foreground mb-2">
          <em>Arendusrežiimis: Verifitseerimislink kuvatakse brauseri konsoolis (F12) ja hüpikaknas.</em>
        </p>
        
        {verificationUrl && (
          <div className="mt-4 p-3 bg-primary/10 rounded-md">
            <p className="text-sm font-medium mb-2">Arendusrežiimi link:</p>
            <a href={verificationUrl} target="_blank" rel="noopener noreferrer" className="text-sm break-all text-primary hover:underline">
              {verificationUrl}
            </a>
            <Button 
              className="w-full mt-3"
              onClick={handleAutoVerify}
              variant="outline"
            >
              Kinnita e-post
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saadan...
            </>
          ) : (
            'Saada kinnituslink uuesti'
          )}
        </Button>
        <Link to="/verify-email" className="w-full">
          <Button variant="outline" className="w-full">
            Mine kinnituse lehele
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Button variant="ghost" className="w-full" onClick={handleDismiss}>
          Tagasi sisselogimisele
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationMessage;
