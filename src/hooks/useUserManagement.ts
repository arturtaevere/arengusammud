
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/context/auth/types';
import { useToast } from '@/components/ui/use-toast';
import { USERS_STORAGE_KEY, TEST_EMAILS } from '@/context/auth/constants';

export const useUserManagement = () => {
  const { user, isAuthenticated, getAllUsers, deleteUserByEmail } = useAuth();
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
        
        // Check for test users by comparing normalized emails
        const hasTestUsers = allUsers.some(u => {
          const normalizedEmail = u.email.toLowerCase().trim();
          return TEST_EMAILS.some(testEmail => testEmail.toLowerCase().trim() === normalizedEmail);
        });
        
        if (hasTestUsers) {
          console.log('Admin page - Test users still present, dispatching reset-users event');
          localStorage.removeItem(USERS_STORAGE_KEY);
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
    console.log('useUserManagement hook mounted, loading initial users');
    
    const storedUsersStr = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsersStr) {
      try {
        const parsedUsers = JSON.parse(storedUsersStr);
        
        // Check for test users with normalized email comparison
        const hasTestUsers = parsedUsers.some((u: any) => {
          const normalizedEmail = u.email.toLowerCase().trim();
          return TEST_EMAILS.some(testEmail => testEmail.toLowerCase().trim() === normalizedEmail);
        });
        
        if (hasTestUsers) {
          console.log('Admin page - Test users found in localStorage, dispatching reset event');
          localStorage.removeItem(USERS_STORAGE_KEY);
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
    localStorage.removeItem(USERS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('reset-users'));
    
    setTimeout(() => {
      loadUsers();
      toast({
        title: "Kasutajate nimekiri lähtestatud",
        description: `Nimekiri taastatud vaikeväärtusele.`,
      });
    }, 800);
  };

  return {
    users: filteredUsers,
    searchTerm,
    filterRole,
    filterSchool,
    setSearchTerm,
    setFilterRole,
    setFilterSchool,
    handleDeleteUser,
    handleRefreshUsers,
  };
};
