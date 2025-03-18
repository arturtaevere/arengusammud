
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { FilterCard, UserTable } from '@/components/admin';
import AdminHeader from '@/components/admin/AdminHeader';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Admin = () => {
  const { user, isAuthenticated, refreshUsers } = useAuth();
  const navigate = useNavigate();
  const { 
    users, 
    searchTerm, 
    filterRole, 
    filterSchool,
    setSearchTerm,
    setFilterRole,
    setFilterSchool,
    handleDeleteUser,
    handleRefreshUsers,
    refreshUsersList
  } = useUserManagement();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (user?.role !== 'juht') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Refresh users whenever this component renders or mounts
  useEffect(() => {
    if (isAuthenticated && user?.role === 'juht') {
      console.log('Admin page - Initial load, forcing refresh from context');
      refreshUsers(); // Call context refresh first
      setTimeout(() => {
        refreshUsersList(); // Then call local refresh
      }, 300);
    }
  }, [isAuthenticated, user, refreshUsers, refreshUsersList]);

  // Set up interval to check for updates
  useEffect(() => {
    if (isAuthenticated && user?.role === 'juht') {
      const intervalId = setInterval(() => {
        console.log('Admin page - Periodic refresh');
        refreshUsersList();
      }, 2000); // Check every 2 seconds

      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated, user, refreshUsersList]);

  if (!isAuthenticated || user?.role !== 'juht') {
    return null;
  }

  const handleManualRefresh = () => {
    console.log('Admin page - Manual refresh triggered');
    refreshUsers(); // Global refresh
    setTimeout(refreshUsersList, 300); // Local refresh with delay
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <AdminHeader onRefreshUsers={handleRefreshUsers} />

        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleManualRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Värskenda nimekirja</span>
          </Button>
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
          users={users} 
          onDeleteUser={handleDeleteUser} 
        />
      </div>
    </div>
  );
};

export default Admin;
