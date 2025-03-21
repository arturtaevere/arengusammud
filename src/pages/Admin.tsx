
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { UsersTable } from '@/components/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const { user, isAuthenticated, refreshUsers } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (user?.role !== 'juht' && user?.role !== 'coach') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // First refresh users from localStorage
    refreshUsers();
    
    // Show toast to confirm action
    toast({
      title: "Kasutajate nimekiri värskendatakse",
      description: "Kasutajate nimekiri uuendatakse...",
    });
    
    // Add a small delay to ensure state is updated
    setTimeout(() => {
      setIsRefreshing(false);
      // Dispatch a custom event to notify components
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('users-updated'));
      
      toast({
        title: "Kasutajate nimekiri värskendatud",
        description: "Kasutajate nimekiri on edukalt uuendatud.",
      });
    }, 800);
  };

  // When admin page loads, refresh users list
  useEffect(() => {
    if (isAuthenticated && (user?.role === 'juht' || user?.role === 'coach')) {
      // Set a short timeout to ensure components are mounted
      setTimeout(() => {
        handleRefresh();
      }, 100);
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || (user?.role !== 'juht' && user?.role !== 'coach')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Administratsiooni paneel</h1>
            <p className="text-muted-foreground">
              Siit leiad administreerimise tööriistad
            </p>
          </div>
          <Button 
            onClick={handleRefresh}
            variant="outline"
            className="flex items-center gap-2"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Värskenda kasutajaid
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kasutajate haldus</CardTitle>
            <CardDescription>
              Siit saad hallata kõiki süsteemi kasutajaid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
