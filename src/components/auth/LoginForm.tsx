
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    setLocalLoading(true);
    try {
      await login(values.email, values.password);
      
      // Show a toast notification
      toast({
        title: "Sisselogimine õnnestus",
        description: "Tere tulemast tagasi!",
      });
      
      // Also use sonner toast for more visibility
      sonnerToast.success("Sisselogimine õnnestus", {
        description: "Suuname teid töölauale...",
      });
      
      // Navigate programmatically to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sisselogimine ebaõnnestus",
        description: error instanceof Error ? error.message : "Midagi läks valesti",
      });
    } finally {
      setLocalLoading(false);
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
            disabled={isLoading || localLoading}
          >
            {isLoading || localLoading ? "Sisselogimine..." : "Logi sisse"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default LoginForm;
