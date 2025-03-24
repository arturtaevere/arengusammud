
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardContent, CardFooter } from '@/components/ui/card';
import { LoginFormValues, loginSchema } from './schemas';
import { useState, useEffect } from 'react';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add debug logging
  useEffect(() => {
    console.log("Auth state in LoginForm:", { isLoading, isSubmitting });
  }, [isLoading, isSubmitting]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    console.log("Login attempt with:", values.email);
    try {
      setIsSubmitting(true);
      await login(values.email, values.password);
      // Login successful - no need to show toast as the user will be redirected
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Sisselogimine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? "Sisselogimine..." : "Logi sisse"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default LoginForm;
