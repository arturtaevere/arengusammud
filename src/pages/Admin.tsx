
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (user?.role !== 'juht' && user?.role !== 'coach') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || (user?.role !== 'juht' && user?.role !== 'coach')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Administratsiooni paneel</h1>
          <p className="text-muted-foreground">
            Siit leiad administreerimise tööriistad
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kasutajate haldus</CardTitle>
            <CardDescription>
              Kasutajate halduse funktsioon on ajutiselt eemaldatud
            </CardDescription>
          </CardHeader>
          <CardContent className="py-10">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-2">
                Kasutajate halduse süsteem ehitatakse tulevikus uuesti üles.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
