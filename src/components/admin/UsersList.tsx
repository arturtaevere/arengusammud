
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/context/auth/types';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Info } from 'lucide-react';

const UsersList = () => {
  const { getAllUsers } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const loadUsers = useCallback(() => {
    try {
      console.log('UsersList: Loading users from getAllUsers...');
      const allUsers = getAllUsers();
      console.log('UsersList: Loaded users:', allUsers.length);
      
      if (allUsers.length > 0) {
        console.log('UsersList: User emails:', allUsers.map(u => u.email).join(', '));
      }
      
      setUsers(allUsers);
      setLastRefreshed(new Date());
    } catch (error) {
      console.error('UsersList: Error loading users:', error);
    }
  }, [getAllUsers]);

  // Initial load and setup listeners
  useEffect(() => {
    loadUsers();
    
    const handleStorageChange = () => {
      console.log('UsersList: Storage change detected, reloading users');
      loadUsers();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('users-updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('users-updated', handleStorageChange);
    };
  }, [loadUsers]);

  if (users.length === 0) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-800">No users found. Try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
        <Info className="h-4 w-4" />
        <span>Viimati värskendatud: {lastRefreshed.toLocaleTimeString('et-EE')}</span>
        <span>({users.length} kasutajat)</span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nimi</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roll</TableHead>
            <TableHead>Kool</TableHead>
            <TableHead>Liitumiskuupäev</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === 'juht' ? "default" : "secondary"}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>{user.school || '-'}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString('et-EE')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
