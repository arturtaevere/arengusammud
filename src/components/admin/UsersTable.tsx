
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/context/auth/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Trash2 } from 'lucide-react';
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

const UsersTable = () => {
  const { getAllUsers, deleteUserByEmail, refreshUsers } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadUsers = () => {
      try {
        const allUsers = getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Error loading users:', error);
        toast({
          variant: "destructive",
          title: "Kasutajate laadimine ebaõnnestus",
          description: "Viga kasutajate nimekirja laadimisel",
        });
      }
    };

    // Initial load
    loadUsers();

    // Set up event listeners
    const handleStorageEvent = () => loadUsers();
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('users-updated', handleStorageEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('users-updated', handleStorageEvent);
    };
  }, [getAllUsers, toast]);

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      const deleted = await deleteUserByEmail(userToDelete);
      if (deleted) {
        refreshUsers();
        setUsers(getAllUsers());
        toast({
          title: "Kasutaja kustutatud",
          description: `Kasutaja e-postiga ${userToDelete} on edukalt kustutatud.`,
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
      setUserToDelete(null);
    }
  };

  // If no users (which shouldn't happen since we have initial users)
  if (users.length === 0) {
    return (
      <div className="rounded-md bg-yellow-50 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Tähelepanu</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Kasutajate nimekiri on tühi. Süsteemis peaks alati olema vähemalt üks administraatori rolliga kasutaja.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nimi</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roll</TableHead>
            <TableHead>Kool</TableHead>
            <TableHead>Liitumiskuupäev</TableHead>
            <TableHead>Tegevused</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {user.name}
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === 'juht' ? "default" : "secondary"}>
                  {user.role === 'juht' ? 'Juht' : 'Õpetaja'}
                </Badge>
              </TableCell>
              <TableCell>{user.school || '-'}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString('et-EE')}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => setUserToDelete(user.email)}
                      disabled={user.email === 'artur@arengusammud.ee'} // Protect main admin
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Kas oled kindel?</AlertDialogTitle>
                      <AlertDialogDescription>
                        See tegevus kustutab kasutaja {userToDelete} jäädavalt.
                        Seda tegevust ei saa tagasi võtta.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setUserToDelete(null)}>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
