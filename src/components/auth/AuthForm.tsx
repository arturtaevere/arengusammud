
import { useState, useEffect } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthForm = () => {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="w-full glass border-orange-light/30">
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
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
