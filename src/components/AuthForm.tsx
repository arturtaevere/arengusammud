
import { useState, useEffect } from 'react';
import { useAuth, SCHOOLS } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AuthForm = () => {
  const { login, signup, isLoading } = useAuth();
  const { toast } = useToast();
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<'coach' | 'teacher'>('coach');
  const [signupSchool, setSignupSchool] = useState<string>('');
  const [showSchoolField, setShowSchoolField] = useState(false);

  // Update school field visibility based on role
  useEffect(() => {
    setShowSchoolField(signupRole === 'teacher');
    if (signupRole !== 'teacher') {
      setSignupSchool('');
    }
  }, [signupRole]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPassword);
      toast({
        title: "Sisselogimine õnnestus",
        description: "Tere tulemast tagasi Arengusammudesse!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sisselogimine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate school is selected for teachers
    if (signupRole === 'teacher' && !signupSchool) {
      toast({
        variant: "destructive",
        title: "Registreerimine ebaõnnestus",
        description: "Palun vali oma kool",
      });
      return;
    }

    try {
      await signup(signupName, signupEmail, signupPassword, signupRole, signupSchool);
      toast({
        title: "Konto loodud",
        description: "Tere tulemast Arengusammudesse!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registreerimine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="w-full glass">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Arengusammud</CardTitle>
          <CardDescription className="text-center">
            Õpipartnerlus ja õpiringid aitavad õpetajal kasvada
          </CardDescription>
        </CardHeader>
        <Tabs 
          defaultValue={formType} 
          onValueChange={(value) => setFormType(value as 'login' | 'signup')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="transition-all">Logi sisse</TabsTrigger>
            <TabsTrigger value="signup" className="transition-all">Registreeru</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-post</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="sinu.email@näide.ee" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Parool</Label>
                  <Input 
                    id="login-password" 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sisselogimine..." : "Logi sisse"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Täisnimi</Label>
                  <Input 
                    id="signup-name" 
                    placeholder="Sinu Nimi"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">E-post</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="sinu.email@näide.ee"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Parool</Label>
                  <Input 
                    id="signup-password" 
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ma olen</Label>
                  <RadioGroup 
                    value={signupRole}
                    onValueChange={(value) => setSignupRole(value as 'coach' | 'teacher')}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="coach" id="coach" />
                      <Label htmlFor="coach">Juhendaja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teacher" id="teacher" />
                      <Label htmlFor="teacher">Õpetaja</Label>
                    </div>
                  </RadioGroup>
                </div>

                {showSchoolField && (
                  <div className="space-y-2">
                    <Label htmlFor="signup-school">Kool</Label>
                    <Select 
                      value={signupSchool} 
                      onValueChange={setSignupSchool}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Vali oma kool" />
                      </SelectTrigger>
                      <SelectContent>
                        {SCHOOLS.map((school) => (
                          <SelectItem key={school} value={school}>
                            {school}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? "Konto loomine..." : "Loo konto"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
