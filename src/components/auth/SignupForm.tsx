
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
import { SCHOOLS } from '@/context/auth/constants';

const SignupForm = () => {
  const { signup, isLoading } = useAuth();
  const { toast } = useToast();

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

  // Watch role to conditionally display school selection
  const role = form.watch('role');

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

          {role === 'õpetaja' && (
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
  );
};

export default SignupForm;
