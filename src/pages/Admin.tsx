
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';
import { FilterCard, UserTable } from '@/components/admin';
import { User } from '@/context/auth/types';
import { USERS_STORAGE_KEY } from '@/context/auth/constants';

const Admin = () => {
  const { user, isAuthenticated, getAllUsers, deleteUserByEmail } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterSchool, setFilterSchool] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toast } = useToast();

  const loadUsers = () => {
    if (isAuthenticated && user?.role === 'juht') {
      // Get users directly from localStorage to ensure we have the latest data
      const storedUsersStr = localStorage.getItem(USERS_STORAGE_KEY);
      let allUsers = [];
      
      if (storedUsersStr) {
        try {
          const storedUsers = JSON.parse(storedUsersStr);
          // Remove passwords before setting to state
          allUsers = storedUsers.map(({ password, ...user }: any) => user);
        } catch (error) {
          console.error('Error parsing stored users:', error);
          allUsers = getAllUsers();
        }
      } else {
        allUsers = getAllUsers();
      }
      
      console.log('Admin page - Loading users:', {
        fromStorage: !!storedUsersStr,
        count: allUsers.length,
        emails: allUsers.map((u: User) => u.email)
      });
      
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (user?.role !== 'juht') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    console.log('Admin component mounted, loading initial users');
    loadUsers();
    
    const handleUsersUpdated = () => {
      console.log('Admin page - users-updated event received, reloading users');
      loadUsers();
    };
    
    window.addEventListener('users-updated', handleUsersUpdated);
    window.addEventListener('storage', (e) => {
      if (e.key === USERS_STORAGE_KEY) {
        console.log('Admin page - storage event received, reloading users');
        handleUsersUpdated();
      }
    });
    
    return () => {
      window.removeEventListener('users-updated', handleUsersUpdated);
      window.removeEventListener('storage', handleUsersUpdated);
    };
  }, [isAuthenticated, user]);

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

  const handleDeleteUser = async (email: string) => {
    const success = await deleteUserByEmail(email);
    if (success) {
      loadUsers();
    }
  };

  if (!isAuthenticated || user?.role !== 'juht') {
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
          <button 
            onClick={() => {
              loadUsers();
              toast({
                title: "Kasutajate nimekiri värskendatud",
                description: "Näed nüüd kõige uuemaid andmeid.",
              });
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Värskenda kasutajate nimekirja
          </button>
        </div>

        <FilterCard 
          searchTerm={searchTerm}
          filterRole={filterRole}
          filterSchool={filterSchool}
          onSearchChange={setSearchTerm}
          onRoleChange={setFilterRole}
          onSchoolChange={setFilterSchool}
        />

        <UserTable 
          users={filteredUsers} 
          onDeleteUser={handleDeleteUser} 
        />
      </div>
    </div>
  );
};

export default Admin;
