
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, Trash2 } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';

interface UsersTableActionsProps {
  email: string;
  onRefresh: () => void;
}

const UsersTableActions = ({ email, onRefresh }: UsersTableActionsProps) => {
  const { deleteUserByEmail } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDeleteUser = async () => {
    if (!email) return;
    
    setIsDeleting(true);
    try {
      const deleted = await deleteUserByEmail(email);
      if (deleted) {
        onRefresh();
        toast({
          title: "Kasutaja kustutatud",
          description: `Kasutaja e-postiga ${email} on edukalt kustutatud.`,
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        variant: "destructive",
        title: "Kasutaja kustutamine ebaõnnestus",
        description: error instanceof Error ? error.message : "Viga kasutaja kustutamisel",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="text-destructive hover:bg-destructive/10"
          disabled={email === 'artur@arengusammud.ee' || isDeleting} // Protect main admin
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kas oled kindel?</AlertDialogTitle>
          <AlertDialogDescription>
            See tegevus kustutab kasutaja {email} jäädavalt.
            Seda tegevust ei saa tagasi võtta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Tühista
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteUser}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Kustuta
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UsersTableActions;
