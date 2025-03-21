
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardContent, CardFooter } from '@/components/ui/card';
import { LoginFormValues, loginSchema } from './schemas';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const LoginForm = () => {
  const { login, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [localLoading, setLocalLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Reset local loading state if auth loading state changes
  useEffect(() => {
    if (!authLoading && localLoading) {
      // Give a small delay before resetting the local loading state
      const timer = setTimeout(() => {
        setLocalLoading(false);
        setIsButtonDisabled(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [authLoading, localLoading]);

  const handleLogin = async (values: LoginFormValues) => {
    setLocalLoading(true);
    setIsButtonDisabled(true);
    
    try {
      console.log('Attempting login for:', values.email);
      await login(values.email, values.password);
      
      // Show success toasts
      toast({
        title: "Sisselogimine õnnestus",
        description: "Tere tulemast tagasi!",
      });
      
      sonnerToast.success("Sisselogimine õnnestus", {
        description: "Suuname teid töölauale...",
      });

    } catch (error) {
      console.error('Login error:', error);
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Sisselogimine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
      
      // Reset loading states
      setLocalLoading(false);
      setIsButtonDisabled(false);
    }
  };

  // Determine if button should show loading state
  const showLoading = localLoading || authLoading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-post</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="sinu.email@näide.ee" 
                    type="email"
                    disabled={showLoading}
                    {...field}
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
                    disabled={showLoading}
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
            disabled={isButtonDisabled || showLoading}
          >
            {showLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sisselogimine...
              </>
            ) : "Logi sisse"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default LoginForm;
