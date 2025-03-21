
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/context/auth/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, RefreshCw, Trash2, Info } from 'lucide-react';
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const { toast } = useToast();

  const loadUsers = useCallback(() => {
    try {
      console.log('Loading users from storage...');
      const allUsers = getAllUsers();
      console.log('Users loaded:', allUsers.length, 'users found');
      console.log('User emails:', allUsers.map(u => u.email).join(', '));
      setUsers(allUsers);
      setLastRefreshed(new Date());
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        variant: "destructive",
        title: "Kasutajate laadimine ebaõnnestus",
        description: "Viga kasutajate nimekirja laadimisel",
      });
    }
  }, [getAllUsers, toast]);

  useEffect(() => {
    // Initial load
    loadUsers();
    
    // Set up event listeners
    const handleStorageEvent = () => {
      console.log('Storage event detected, reloading users...');
      loadUsers();
    };
    
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('users-updated', handleStorageEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('users-updated', handleStorageEvent);
    };
  }, [loadUsers]);

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      const deleted = await deleteUserByEmail(userToDelete);
      if (deleted) {
        refreshUsers();
        loadUsers();
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

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    
    try {
      console.log('Manual refresh requested');
      // Force refresh from the auth context
      refreshUsers();
      
      // Small delay to ensure storage is updated
      setTimeout(() => {
        // Get fresh users directly
        const freshUsers = getAllUsers();
        console.log('Fresh users loaded:', freshUsers.length);
        console.log('User emails after refresh:', freshUsers.map(u => u.email).join(', '));
        
        setUsers(freshUsers);
        setLastRefreshed(new Date());
        
        toast({
          title: "Kasutajate nimekiri värskendatud",
          description: `Laeti ${freshUsers.length} kasutajat.`,
        });
        setIsRefreshing(false);
      }, 300);
    } catch (error) {
      console.error('Error refreshing users:', error);
      toast({
        variant: "destructive",
        title: "Värskendamine ebaõnnestus",
        description: "Viga kasutajate nimekirja värskendamisel",
      });
      setIsRefreshing(false);
    }
  };

  // Force direct local storage check for users
  const handleForceRefresh = () => {
    setIsRefreshing(true);
    
    try {
      console.log('Force refresh requested - checking localStorage directly');
      // Read directly from localStorage
      const usersStorageKey = 'arengusammud_users';
      const storedUsersString = localStorage.getItem(usersStorageKey);
      
      if (storedUsersString) {
        try {
          const storedUsers = JSON.parse(storedUsersString);
          console.log('Direct localStorage read:', storedUsers.length, 'users found');
          console.log('Direct storage user emails:', storedUsers.map((u: User) => u.email).join(', '));
          
          // Remove passwords
          const cleanUsers = storedUsers.map(({ password, ...rest }: any) => rest);
          setUsers(cleanUsers);
          setLastRefreshed(new Date());
          
          toast({
            title: "Kasutajate nimekiri värskendatud",
            description: `Loeti otse salvestusest ${cleanUsers.length} kasutajat.`,
          });
        } catch (e) {
          console.error('Error parsing users from storage:', e);
          toast({
            variant: "destructive",
            title: "Andmete lugemine ebaõnnestus",
            description: "Viga salvestatud andmete lugemisel",
          });
        }
      } else {
        console.log('No users found in localStorage');
        toast({
          variant: "destructive",
          title: "Kasutajaid ei leitud",
          description: "Salvestuses ei ole kasutajate andmeid",
        });
      }
    } catch (error) {
      console.error('Force refresh error:', error);
      toast({
        variant: "destructive",
        title: "Otse lugemine ebaõnnestus",
        description: "Viga andmete otsesel lugemisel",
      });
    } finally {
      setIsRefreshing(false);
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
              <div className="mt-4">
                <Button onClick={handleForceRefresh} variant="outline" size="sm">
                  Loe kasutajad otse salvestusest
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Info className="h-4 w-4" />
          Viimati värskendatud: {lastRefreshed.toLocaleTimeString('et-EE')}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleForceRefresh}
            variant="secondary"
            size="sm"
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Otse salvestusest
          </Button>
          <Button
            onClick={handleManualRefresh}
            variant="outline"
            size="sm"
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Värskenda nimekirja
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default UsersTable;
