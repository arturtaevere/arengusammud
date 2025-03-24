
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth, SCHOOLS } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardContent, CardFooter } from '@/components/ui/card';
import { SignupFormValues, signupSchema } from './schemas';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const SignupForm = () => {
  const { signup, isLoading: authLoading, setPendingVerificationEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Add debug logging for form state
  useEffect(() => {
    console.log("Signup form state:", { authLoading, isSubmitting, signupSuccess });
  }, [authLoading, isSubmitting, signupSuccess]);

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
    console.log("Signup attempt with values:", { ...values, password: '[REDACTED]' });
    
    // Don't try to submit if already submitting
    if (isSubmitting) {
      console.log("Already submitting, ignoring click");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSignupSuccess(false);
      
      console.log("Calling signup function with:", values.name, values.email, "[password omitted]", values.role, values.school);
      const result = await signup(values.name, values.email, values.password, values.role, values.school);
      
      console.log("Signup successful, result:", result);
      setSignupSuccess(true);
      
      // Store pending verification email
      setPendingVerificationEmail(values.email);
      
      // Reset form
      form.reset();
      
      // Display success message
      toast({
        title: "Registreerimine õnnestus",
        description: "Konto on loodud. Võid nüüd sisse logida.",
      });
      
    } catch (error) {
      console.error('Signup error in form handler:', error);
      toast({
        variant: "destructive",
        title: "Registreerimine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
      setSignupSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent submitting the form while loading
  const isFormDisabled = isSubmitting || authLoading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)}>
        <CardContent className="space-y-4">
          {/* Form fields */}
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
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
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
            disabled={isFormDisabled || signupSuccess}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Konto loomine...
              </>
            ) : signupSuccess ? (
              "Konto loodud!"
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
