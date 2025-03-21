
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('id');
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verify = async () => {
      if (!token || !userId) {
        setVerifying(false);
        return;
      }
      
      try {
        const success = await verifyEmail(userId, token);
        setVerified(success);
      } catch (error) {
        console.error('Error verifying email:', error);
      } finally {
        setVerifying(false);
      }
    };
    
    verify();
  }, [token, userId, verifyEmail]);
  
  const handleContinue = () => {
    navigate('/auth');
  };
  
  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Kinnitame teie e-posti...</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-6">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {verified ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {verified 
              ? 'E-post on kinnitatud!' 
              : 'E-posti kinnitamine ebaõnnestus'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            {verified 
              ? 'Teie e-post on edukalt kinnitatud. Nüüd saate sisse logida.' 
              : 'Kahjuks ei õnnestunud teie e-posti kinnitada. Link võib olla aegunud või vigane.'}
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleContinue}>
            {verified ? 'Jätka sisselogimisega' : 'Tagasi sisselogimisse'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
