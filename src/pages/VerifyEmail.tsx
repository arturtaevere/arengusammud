
import { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const VerifyEmail = () => {
  const { verifyEmail, resendVerificationEmail, pendingVerificationEmail, setPendingVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error' | 'pending'>('pending');
  const [email, setEmail] = useState(pendingVerificationEmail || '');

  // Handle token verification
  useEffect(() => {
    const confirmToken = async () => {
      // Check if we have a token in the URL
      const token = searchParams.get('token');
      const type = searchParams.get('type');
      
      if (token && type === 'signup') {
        setVerifying(true);
        setVerificationStatus('verifying');
        
        try {
          // Verify with Supabase
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup'
          });
          
          if (error) throw error;
          
          setVerificationStatus('success');
          toast({
            title: "E-posti aadress kinnitatud",
            description: "Sinu e-posti aadress on edukalt kinnitatud. Võid nüüd sisse logida.",
          });
          
          // Redirect after a delay
          setTimeout(() => {
            navigate('/auth');
          }, 3000);
        } catch (error) {
          console.error('Error verifying email:', error);
          setVerificationStatus('error');
          toast({
            variant: "destructive",
            title: "Kinnitamine ebaõnnestus",
            description: error instanceof Error ? error.message : "Midagi läks valesti",
          });
        } finally {
          setVerifying(false);
        }
      } else {
        // Check if we have a pending verification email
        if (pendingVerificationEmail) {
          setEmail(pendingVerificationEmail);
        }
      }
    };
    
    confirmToken();
  }, [searchParams, navigate, toast, pendingVerificationEmail]);
  
  const handleResend = async () => {
    if (!email) return;
    
    setResending(true);
    try {
      const success = await resendVerificationEmail();
      
      if (success) {
        toast({
          title: "E-kiri saadetud",
          description: "Kinnituskiri on uuesti saadetud sinu e-posti aadressile.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Saatmine ebaõnnestus",
          description: "Ei õnnestunud kinnituskirja saata. Proovi hiljem uuesti.",
        });
      }
    } finally {
      setResending(false);
    }
  };
  
  const handleDismiss = () => {
    setPendingVerificationEmail(null);
    navigate('/auth');
  };
  
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
                {verificationStatus === 'success' ? (
                  <CheckCircle className="h-12 w-12 text-green-500" />
                ) : verificationStatus === 'error' ? (
                  <AlertCircle className="h-12 w-12 text-red-500" />
                ) : (
                  <Mail className="h-12 w-12 text-primary" />
                )}
              </div>
              
              <CardTitle className="text-2xl">
                {verificationStatus === 'success' 
                  ? "E-post kinnitatud" 
                  : verificationStatus === 'error'
                  ? "Kinnitamine ebaõnnestus"
                  : "E-posti aadress vajab kinnitamist"}
              </CardTitle>
              
              <CardDescription>
                {verificationStatus === 'success'
                  ? "Täname! Sinu e-posti aadress on nüüd kinnitatud."
                  : verificationStatus === 'error'
                  ? "Tekkis probleem e-posti aadressi kinnitamisel."
                  : "Palun kontrolli oma e-posti ja kinnita oma konto."}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {verificationStatus === 'verifying' ? (
                <div className="text-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Kontrollime sinu e-posti aadressi...</p>
                </div>
              ) : verificationStatus === 'success' ? (
                <p className="text-center text-muted-foreground">
                  Sinu e-posti aadress on nüüd kinnitatud. Sind suunatakse kohe sisselogimisele.
                </p>
              ) : verificationStatus === 'error' ? (
                <p className="text-center text-muted-foreground">
                  Kinnituslink on aegunud või vigane. Palun proovi uuesti või palu uus kinnitusmeil.
                </p>
              ) : (
                <p className="text-center text-muted-foreground">
                  Oleme saatnud kinnituslingi aadressile <span className="font-medium">{email}</span>. 
                  Palun kontrolli oma e-posti ja kliki lingil oma konto aktiveerimiseks.
                </p>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              {verificationStatus === 'success' ? (
                <Button className="w-full" onClick={() => navigate('/auth')}>
                  Sisselogimisele
                </Button>
              ) : verificationStatus === 'error' ? (
                <>
                  <Button className="w-full" onClick={handleResend} disabled={resending}>
                    {resending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saadan...
                      </>
                    ) : (
                      "Saada uus kinnitusmeil"
                    )}
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={handleDismiss}>
                    Tagasi sisselogimisele
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full" onClick={handleResend} disabled={resending || !email}>
                    {resending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saadan...
                      </>
                    ) : (
                      "Saada uuesti"
                    )}
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={handleDismiss}>
                    Tagasi sisselogimisele
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
