
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import { getReflectionById } from '@/components/reflection/service';
import { StandaloneReflection } from '@/components/reflection/types';
import { useToast } from '@/hooks/use-toast';

const ReflectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reflection, setReflection] = useState<StandaloneReflection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReflection = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getReflectionById(id);
        if (data) {
          setReflection(data);
        } else {
          toast({
            title: "Viga",
            description: "Refleksiooni ei leitud",
            variant: "destructive",
          });
          navigate('/reflections');
        }
      } catch (error) {
        console.error('Error loading reflection:', error);
        toast({
          title: "Viga",
          description: "Refleksiooni laadimine ebaõnnestus",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadReflection();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-light/10">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <p className="text-center">Laadin refleksiooni...</p>
        </main>
      </div>
    );
  }

  if (!reflection) {
    return (
      <div className="min-h-screen bg-orange-light/10">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <p className="text-center">Refleksiooni ei leitud</p>
        </main>
      </div>
    );
  }

  const formattedDate = reflection.created_at
    ? format(new Date(reflection.created_at), 'dd.MM.yyyy')
    : '';

  return (
    <div className="min-h-screen bg-orange-light/10">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/reflections')}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tagasi
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(`/reflections/edit/${reflection.id}`)}
              className="flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Muuda
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">{reflection.title || 'Refleksioon'}</CardTitle>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formattedDate}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">
                  {reflection.reflection}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ReflectionDetail;
