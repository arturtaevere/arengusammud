
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardContent, CardFooter } from '@/components/ui/card';
import { SignupFormValues, signupSchema } from './schemas';
import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SCHOOLS } from '@/context/auth/constants';

const SignupForm = () => {
  const { signup, setPendingVerificationEmail } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'õpetaja',
      school: '',
    },
  });

  const handleSignup = async (values: SignupFormValues) => {
    if (isLoading) return; // Prevent multiple submissions
    
    setIsLoading(true);
    
    try {
      await signup(values.name, values.email, values.password, values.role, values.school);
      
      // Store the email for verification purposes
      setPendingVerificationEmail(values.email);
      
      toast({
        title: "Registreerimine õnnestus",
        description: "Konto on loodud. Kontrolli oma e-posti kinnituslingi saamiseks.",
      });
      
      // Reset the form
      form.reset();
      
      // Navigate to verification page
      navigate('/verify-email');
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'Midagi läks valesti';
      
      if (error instanceof Error) {
        if (error.message.includes('already registered') || error.message.includes('user_already_exists')) {
          errorMessage = 'Selle e-posti aadressiga kasutaja on juba olemas';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Registreerimine ebaõnnestus",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)}>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Täisnimi</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Sinu Nimi"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-post</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="sinu.email@näide.ee"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parool</FormLabel>
                <FormControl>
                  <Input 
                    type="password"
                    placeholder="Vähemalt 6 tähemärki"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Ma olen</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value}
                    className="flex space-x-4"
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="juht" id="juht" />
                      <Label htmlFor="juht">Juht</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="õpetaja" id="õpetaja" />
                      <Label htmlFor="õpetaja">Õpetaja</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kool</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
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
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full transition-all" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Konto loomine...
              </>
            ) : (
              "Loo konto"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default SignupForm;
