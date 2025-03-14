import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { et } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { SCHOOLS } from '@/context/AuthContext';
import { Filter, Trash2 } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
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
import { useToast } from '@/components/ui/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'teacher';
  profileImage?: string;
  school?: string;
  createdAt: string;
};

const Admin = () => {
  const { user, isAuthenticated, getAllUsers, deleteUserByEmail } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterSchool, setFilterSchool] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (user?.role !== 'coach') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'coach') {
      const allUsers = getAllUsers();
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    }
  }, [isAuthenticated, user, getAllUsers]);

  useEffect(() => {
    let result = users;
    
    if (filterRole !== 'all') {
      result = result.filter(user => user.role === filterRole);
    }
    
    if (filterSchool !== 'all') {
      result = result.filter(user => user.school === filterSchool);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        user => 
          user.name.toLowerCase().includes(term) || 
          user.email.toLowerCase().includes(term)
      );
    }
    
    setFilteredUsers(result);
  }, [users, filterRole, filterSchool, searchTerm]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'd. MMM yyyy', { locale: et });
    } catch (error) {
      return 'N/A';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      const success = await deleteUserByEmail(userToDelete);
      if (success) {
        const allUsers = getAllUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
      }
      setUserToDelete(null);
    }
  };

  if (!isAuthenticated || user?.role !== 'coach') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kasutajate haldus</h1>
          <p className="text-muted-foreground">
            Siit leiad kõik registreeritud kasutajad ja nende info.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtrid</CardTitle>
            <CardDescription>Filtreeri kasutajaid rolli ja kooli järgi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <Input
                  placeholder="Otsi nime või e-posti järgi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Roll" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Kõik rollid</SelectItem>
                    <SelectItem value="coach">Juhendaja</SelectItem>
                    <SelectItem value="teacher">Õpetaja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/3">
                <Select value={filterSchool} onValueChange={setFilterSchool}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Kool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Kõik koolid</SelectItem>
                    {SCHOOLS.map((school) => (
                      <SelectItem key={school} value={school}>
                        {school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kasutajad ({filteredUsers.length})</CardTitle>
            <CardDescription>
              Kõik platvormi registreeritud kasutajad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kasutaja</TableHead>
                  <TableHead>Roll</TableHead>
                  <TableHead>Kool</TableHead>
                  <TableHead>Liitumiskuupäev</TableHead>
                  <TableHead>Tegevused</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            {user.profileImage ? (
                              <AvatarImage src={user.profileImage} alt={user.name} />
                            ) : (
                              <AvatarImage 
                                src={`https://avatar.vercel.sh/${user.email}.png`} 
                                alt={user.name} 
                              />
                            )}
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'coach' ? 'default' : 'secondary'}>
                          {user.role === 'coach' ? 'Juhendaja' : 'Õpetaja'}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.school || 'N/A'}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setUserToDelete(user.email)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Kas olete kindel?</AlertDialogTitle>
                              <AlertDialogDescription>
                                See tegevus kustutab kasutaja <span className="font-bold">{user.name}</span> ({user.email}) jäädavalt.
                                Seda toimingut ei saa tagasi võtta.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setUserToDelete(null)}>
                                Tühista
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteUser}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Kustuta
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Kasutajaid ei leitud
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
