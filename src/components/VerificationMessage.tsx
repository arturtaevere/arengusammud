
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
  const [resendSuccess, setResendSuccess] = useState(false);
  
  const handleResend = async () => {
    setResending(true);
    try {
      const success = await resendVerificationEmail(email);
      setResendSuccess(success);
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
          Saatsime kinnituslingi aadressile {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Palun kontrolli oma postkasti ja kliki e-kirjas olevale lingile. 
          See võib võtta mõne minuti, et e-kiri kohale jõuaks.
        </p>
        
        {resendSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-800 text-sm my-4">
            Kinnituskiri on uuesti saadetud. Palun kontrolli oma postkasti.
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          variant="outline" 
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
            "Saada kinnitusmeil uuesti"
          )}
        </Button>
        <Button variant="ghost" className="w-full" onClick={handleDismiss}>
          Tagasi sisselogimisse
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationMessage;
