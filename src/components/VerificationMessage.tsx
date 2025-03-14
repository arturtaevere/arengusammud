
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
        <CardTitle className="text-2xl">Kinnita oma e-post</CardTitle>
        <CardDescription>
          Saatsime e-kirja aadressile <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          Palun kontrolli oma postkasti ja kliki kirjas oleval kinnituslinkil.
          Kui sa ei leia meie kirja, kontrolli ka rämpsposti kausta.
        </p>
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
