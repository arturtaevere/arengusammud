
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { getReflections, deleteReflection } from '@/components/reflection/service';
import { StandaloneReflection } from '@/components/reflection/types';
import ReflectionCard from '@/components/reflection/ReflectionCard';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Reflections = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [reflections, setReflections] = useState<StandaloneReflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const loadReflections = async () => {
      setLoading(true);
      try {
        const data = await getReflections();
        setReflections(data);
      } catch (error) {
        console.error('Error loading reflections:', error);
        toast({
          title: "Viga",
          description: "Refleksioonide laadimine ebaõnnestus",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadReflections();
  }, [toast]);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      const success = await deleteReflection(deleteId);
      if (success) {
        // Remove the deleted reflection from the state
        setReflections(prev => prev.filter(r => r.id !== deleteId));
        toast({
          title: "Kustutatud",
          description: "Refleksioon on edukalt kustutatud",
        });
      } else {
        toast({
          title: "Viga",
          description: "Refleksiooni kustutamine ebaõnnestus",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting reflection:', error);
      toast({
        title: "Viga",
        description: "Refleksiooni kustutamine ebaõnnestus",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-orange-light/10">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Minu refleksioonid</h1>
            <p className="text-muted-foreground">
              Siin on sinu refleksioonid õppimistest ja kogemustest
            </p>
          </div>
          <Button onClick={() => navigate('/reflections/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Lisa uus refleksioon
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p>Laadin refleksioone...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reflections.length > 0 ? (
              reflections.map(reflection => (
                <ReflectionCard 
                  key={reflection.id} 
                  reflection={reflection} 
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 text-center py-16 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  Sul pole veel ühtegi refleksiooni
                </p>
                <Button onClick={() => navigate('/reflections/new')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Lisa esimene refleksioon
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kas oled kindel?</AlertDialogTitle>
            <AlertDialogDescription>
              Kas soovid selle refleksiooni kustutada? Seda tegevust ei saa tagasi võtta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tühista</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Kustuta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Reflections;
