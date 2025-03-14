
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { verifyEmail, resendVerificationEmail, pendingVerificationEmail, setPendingVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error' | 'pending'>('pending');
  const [email, setEmail] = useState(pendingVerificationEmail || '');
  const [verificationMessage, setVerificationMessage] = useState('');
  
  // Try to verify email if ID and token are provided in URL
  useEffect(() => {
    const id = searchParams.get('id');
    const token = searchParams.get('token');
    
    const verifyEmailToken = async () => {
      if (id && token) {
        setVerifying(true);
        setVerificationStatus('verifying');
        try {
          console.log(`Starting verification process with id: ${id}, token: ${token}`);
          
          // Read tokens directly from localStorage to debug
          const localStorageTokens = JSON.parse(localStorage.getItem('verification_tokens') || '{}');
          console.log('Current tokens in localStorage:', localStorageTokens);
          console.log(`Checking if token ${token} matches stored token for id ${id}: ${localStorageTokens[id]}`);
          
          const success = await verifyEmail(id, token);
          console.log(`Verification result: ${success ? 'success' : 'failure'}`);
          
          setVerificationStatus(success ? 'success' : 'error');
          setVerificationMessage(success 
            ? 'Sinu e-posti aadress on edukalt kinnitatud.' 
            : 'Vigane või aegunud kinnituslink. Tokenid ei kattu.');
          
          // If verification is successful, clear the pending email
          if (success) {
            console.log('Email verification successful, clearing pending email');
            setPendingVerificationEmail(null);
            
            // Show success toast
            toast({
              title: "E-post kinnitatud",
              description: "Sinu e-posti aadress on edukalt kinnitatud.",
            });
          } else {
            // Show error toast
            toast({
              variant: "destructive",
              title: "Kinnitamine ebaõnnestus",
              description: "Vigane või aegunud kinnituslink. Palun proovi uuesti.",
            });
          }
        } catch (error) {
          console.error('Error during verification:', error);
          setVerificationStatus('error');
          setVerificationMessage('Verifikatsiooni käigus tekkis viga. Palun proovi uuesti.');
          
          toast({
            variant: "destructive",
            title: "Kinnitamine ebaõnnestus",
            description: "Verifikatsiooni käigus tekkis viga. Palun proovi uuesti.",
          });
        } finally {
          setVerifying(false);
        }
      }
    };
    
    verifyEmailToken();
  }, [searchParams, verifyEmail, setPendingVerificationEmail, toast]);
  
  const handleResendVerification = async () => {
    if (!email.trim()) return;
    
    setResending(true);
    try {
      await resendVerificationEmail(email);
      console.log(`Verification email resent to ${email}`);
      
      toast({
        title: "Kinnitusmeil saadetud",
        description: "Uus kinnitusmeil on saadetud. Palun kontrolli oma postkasti.",
      });
    } catch (error) {
      console.error('Error resending verification email:', error);
      
      toast({
        variant: "destructive",
        title: "Saatmine ebaõnnestus",
        description: "Kinnitusmeili saatmine ebaõnnestus. Palun proovi uuesti.",
      });
    } finally {
      setResending(false);
    }
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
              {verificationStatus === 'verifying' ? (
                <div className="mx-auto mb-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : verificationStatus === 'success' ? (
                <div className="mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              ) : verificationStatus === 'error' ? (
                <div className="mx-auto mb-4">
                  <AlertCircle className="h-12 w-12 text-red-500" />
                </div>
              ) : (
                <div className="mx-auto mb-4">
                  <Mail className="h-12 w-12 text-primary" />
                </div>
              )}
              
              <CardTitle className="text-2xl">
                {verificationStatus === 'verifying' ? 'Kontrollimine...' : 
                 verificationStatus === 'success' ? 'E-post on kinnitatud!' : 
                 verificationStatus === 'error' ? 'Kinnitamine ebaõnnestus' : 
                 'Kinnita oma e-post'}
              </CardTitle>
              
              <CardDescription>
                {verificationStatus === 'verifying' ? 'Palun oota, kontrollime sinu e-posti...' : 
                 verificationMessage ? verificationMessage :
                 verificationStatus === 'success' ? 'Sinu e-posti aadress on edukalt kinnitatud.' : 
                 verificationStatus === 'error' ? 'Vigane või aegunud kinnituslink.' : 
                 'Kirjutasime sulle kinnituslingi. Palun kontrolli oma postkasti.'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {verificationStatus === 'success' ? (
                <p className="text-center text-muted-foreground">
                  Võid nüüd jätkata sisselogimisega Arengusammud platvormile.
                </p>
              ) : verificationStatus === 'error' || verificationStatus === 'pending' ? (
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground mb-4">
                    {verificationStatus === 'error' 
                      ? 'Proovi uuesti või lase saata uus kinnituslink.'
                      : 'Kui sa ei leia meie kirja, kontrolli ka rämpsposti kausta.'}
                  </p>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      E-posti aadress
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sinu.email@näide.ee"
                    />
                  </div>
                </div>
              ) : null}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              {verificationStatus === 'success' ? (
                <Button className="w-full" onClick={() => navigate('/auth')}>
                  Jätka sisselogimisega
                </Button>
              ) : verificationStatus === 'error' || verificationStatus === 'pending' ? (
                <>
                  <Button 
                    className="w-full" 
                    onClick={handleResendVerification}
                    disabled={resending || !email.trim()}
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
                  <Link to="/auth" className="w-full">
                    <Button variant="outline" className="w-full mt-2">
                      Tagasi
                    </Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => navigate('/auth')}>
                  Tagasi
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
