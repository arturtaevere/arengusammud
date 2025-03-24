
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export const AuthDebug = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [sessionStatus, setSessionStatus] = useState<string>('Checking...');
  const [profileStatus, setProfileStatus] = useState<string>('Checking...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          setSessionStatus('Error');
          setError(sessionError.message);
          return;
        }
        
        setSessionStatus(session ? 'Active' : 'None');
        
        // If we have a session, check profile
        if (session?.user) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (profileError) {
              setProfileStatus('Error');
              setError(profileError.message);
              return;
            }
            
            setProfileStatus(profile ? 'Found' : 'Not Found');
          } catch (err: any) {
            setProfileStatus('Error');
            setError(err.message);
          }
        } else {
          setProfileStatus('No Session');
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Authentication Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Auth Context:</span>
          <Badge variant={isLoading ? "outline" : isAuthenticated ? "success" : "destructive"}>
            {isLoading ? "Loading" : isAuthenticated ? "Authenticated" : "Not Authenticated"}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <span>Supabase Session:</span>
          <Badge variant={sessionStatus === 'Active' ? "success" : "destructive"}>
            {sessionStatus}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <span>User Profile:</span>
          <Badge variant={profileStatus === 'Found' ? "success" : "destructive"}>
            {profileStatus}
          </Badge>
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
            <div className="font-semibold">Error:</div>
            <div className="break-all">{error}</div>
          </div>
        )}
        
        {user && (
          <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
            <div className="font-semibold">User Info:</div>
            <pre className="overflow-auto text-xs">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
