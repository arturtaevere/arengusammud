
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

  // Redirect if not authenticated or not a juht
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (user?.role !== 'juht') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Load users directly from localStorage to ensure we have the latest data
  const loadUsers = () => {
    if (isAuthenticated && user?.role === 'juht') {
      const allUsers = getAllUsers();
      console.log('Loaded users in Admin:', allUsers.length);
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    }
  };

  // Load users when the component mounts and when users are updated
  useEffect(() => {
    loadUsers();
    
    // Set up listeners for user changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === USERS_STORAGE_KEY) {
        console.log('Users updated in localStorage, refreshing users list');
        loadUsers();
      }
    };
    
    const handleUsersUpdated = () => {
      console.log('Users updated event received, refreshing users list');
      loadUsers();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('users-updated', handleUsersUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('users-updated', handleUsersUpdated);
    };
  }, [isAuthenticated, user]);

  // Filter users based on search and filter criteria
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
      loadUsers(); // Reload the users after deletion
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
