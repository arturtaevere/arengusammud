
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { createReflection, getReflectionById, updateReflection } from './service';

interface ReflectionFormProps {
  isEditing?: boolean;
}

const ReflectionForm = ({ isEditing = false }: ReflectionFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    reflection: '',
  });

  useEffect(() => {
    const loadReflection = async () => {
      if (isEditing && id) {
        setLoading(true);
        try {
          const reflection = await getReflectionById(id);
          if (reflection) {
            setFormData({
              reflection: reflection.reflection,
            });
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
      }
    };
    
    loadReflection();
  }, [id, isEditing, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Viga",
        description: "Palun logi sisse",
        variant: "destructive",
      });
      return;
    }

    if (!formData.reflection.trim()) {
      toast({
        title: "Viga",
        description: "Refleksioon ei saa olla tühi",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (isEditing && id) {
        await updateReflection(id, formData);
        toast({
          title: "Õnnestus",
          description: "Refleksioon on edukalt uuendatud",
        });
      } else {
        await createReflection(formData);
        toast({
          title: "Õnnestus",
          description: "Uus refleksioon on loodud",
        });
      }
      navigate('/reflections');
    } catch (error) {
      console.error('Error saving reflection:', error);
      toast({
        title: "Viga",
        description: "Refleksiooni salvestamine ebaõnnestus",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/reflections')}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tagasi
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Muuda refleksiooni' : 'Lisa uus refleksioon'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Muuda refleksiooni' : 'Uus refleksioon'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reflection">
                Minu refleksioon
              </Label>
              <Textarea
                id="reflection"
                name="reflection"
                value={formData.reflection}
                onChange={handleInputChange}
                placeholder="Kirjelda oma tähelepanekuid, kogemusi, õnnestumisi, ebaõnnestumisi, mõtteid..."
                rows={12}
                className="min-h-[200px]"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/reflections')}
              >
                Tühista
              </Button>
              <Button 
                type="submit"
                disabled={loading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? 'Uuenda' : 'Salvesta'} refleksioon
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReflectionForm;
