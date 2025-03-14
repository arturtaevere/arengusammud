
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
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Palun sisesta korrektne e-posti aadress'),
  password: z.string().min(6, 'Parool peab olema vähemalt 6 tähemärki pikk'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Nimi peab olema vähemalt 2 tähemärki pikk'),
  email: z.string().email('Palun sisesta korrektne e-posti aadress'),
  password: z.string().min(6, 'Parool peab olema vähemalt 6 tähemärki pikk'),
  role: z.enum(['coach', 'teacher']),
  school: z.string().optional(),
}).refine(data => {
  // School is required only for teachers
  return data.role !== 'teacher' || (data.role === 'teacher' && !!data.school);
}, {
  message: "Õpetaja peab valima kooli",
  path: ["school"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthForm = () => {
  const { login, signup, isLoading } = useAuth();
  const { toast } = useToast();
  const [formType, setFormType] = useState<'login' | 'signup'>('login');

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'teacher',
      school: '',
    },
  });

  // Watch role to conditionally display school selection
  const role = signupForm.watch('role');
  
  // Reset form errors when switching tabs
  useEffect(() => {
    loginForm.reset();
    signupForm.reset();
  }, [formType, loginForm, signupForm]);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sisselogimine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
    }
  };

  const handleSignup = async (values: SignupFormValues) => {
    try {
      await signup(values.name, values.email, values.password, values.role, values.school);
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
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-post</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="sinu.email@näide.ee" 
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parool</FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
            </Form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Täisnimi</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Sinu Nimi"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-post</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="sinu.email@näide.ee"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parool</FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            placeholder="Vähemalt 6 tähemärki"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Ma olen</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            value={field.value}
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {role === 'teacher' && (
                    <FormField
                      control={signupForm.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kool</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange}
                              value={field.value}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
            </Form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
