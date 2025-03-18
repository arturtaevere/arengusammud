
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
  const { user, isAuthenticated } = useAuth();
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

  // Refresh users whenever this component renders
  useEffect(() => {
    if (isAuthenticated && user?.role === 'juht') {
      // Force refresh user list on page load
      refreshUsersList();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== 'juht') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <AdminHeader onRefreshUsers={handleRefreshUsers} />

        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshUsersList}
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
