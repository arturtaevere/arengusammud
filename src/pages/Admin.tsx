import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';
import { FilterCard, UserTable } from '@/components/admin';
import { User } from '@/context/auth/types';
import { USERS_STORAGE_KEY, TEST_EMAILS } from '@/context/auth/constants';

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
      try {
        const allUsers = getAllUsers();
        console.log('Admin page - Loading users from getAllUsers:', {
          total: allUsers.length,
          emails: allUsers.map((u: User) => u.email)
        });
        
        const hasTestUsers = allUsers.some(u => TEST_EMAILS.includes(u.email.toLowerCase().trim()));
        if (hasTestUsers) {
          console.log('Admin page - Test users still present, dispatching reset event');
          window.dispatchEvent(new CustomEvent('reset-users'));
          setTimeout(loadUsers, 500);
          return;
        }
        
        setUsers(allUsers);
      } catch (error) {
        console.error('Error getting users in Admin page:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load users",
        });
      }
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
    
    const storedUsersStr = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsersStr) {
      try {
        const parsedUsers = JSON.parse(storedUsersStr);
        const hasTestUsers = parsedUsers.some((u: any) => TEST_EMAILS.includes(u.email.toLowerCase().trim()));
        if (hasTestUsers) {
          console.log('Admin page - Test users found in localStorage, dispatching reset event');
          window.dispatchEvent(new CustomEvent('reset-users'));
          setTimeout(loadUsers, 800);
        } else {
          loadUsers();
        }
      } catch (error) {
        console.error('Error parsing users from localStorage:', error);
        loadUsers();
      }
    } else {
      loadUsers();
    }
    
    const handleUsersUpdated = () => {
      console.log('Admin page - users-updated event received');
      loadUsers();
    };
    
    const handleResetUsers = () => {
      console.log('Admin page - reset-users event received');
      localStorage.removeItem(USERS_STORAGE_KEY);
      window.dispatchEvent(new Event('storage'));
    };
    
    window.addEventListener('users-updated', handleUsersUpdated);
    window.addEventListener('reset-users', handleResetUsers);
    window.addEventListener('storage', (e) => {
      if (e.key === USERS_STORAGE_KEY) {
        console.log('Admin page - storage event received for users');
        loadUsers();
      }
    });
    
    const checkUsersInterval = setInterval(() => {
      loadUsers();
    }, 3000);
    
    return () => {
      window.removeEventListener('users-updated', handleUsersUpdated);
      window.removeEventListener('reset-users', handleResetUsers);
      window.removeEventListener('storage', handleUsersUpdated);
      clearInterval(checkUsersInterval);
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
    if (email === 'artur@arengusammud.ee') {
      toast({
        variant: "destructive",
        title: "Toimingut ei saa teha",
        description: "Süsteemi peakasutajat ei saa kustutada.",
      });
      return;
    }
    
    const success = await deleteUserByEmail(email);
    if (success) {
      loadUsers();
    }
  };

  const handleRefreshUsers = () => {
    console.log('Admin page - Manual reset triggered');
    window.dispatchEvent(new CustomEvent('reset-users'));
    
    setTimeout(() => {
      loadUsers();
      toast({
        title: "Kasutajate nimekiri lähtestatud",
        description: `Nimekiri taastatud vaikeväärtusele.`,
      });
    }, 800);
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
            onClick={handleRefreshUsers}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Lähtesta kasutajate nimekiri
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
