
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import StatsCards from '@/components/dashboard/StatsCards';
import { 
  Sidebar,
  SidebarProvider, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Heart } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const stats = {
    actionStepsAssigned: 12,
    actionStepsCompleted: 7,
    feedbackCount: 15
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-orange-light/10 flex w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-base font-medium">Õpetajana</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-2 py-4 space-y-6">
                  <div>
                    <h4 className="text-xs text-muted-foreground mb-1">Minu arengueesmärk</h4>
                    <p className="text-sm font-medium">Õpilaste individuaalse arengu toetamine</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs text-muted-foreground mb-1">Minu arengusamm</h4>
                    <p className="text-sm font-medium">Tagasiside andmine õppimisprotsessile</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs text-muted-foreground mb-1">Arengusamme saavutatud</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">{stats.actionStepsCompleted}</span>
                      <Heart className="h-5 w-5 fill-orange-500 text-orange-500" />
                    </div>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full">
                      <div 
                        className="h-2 bg-orange-500 rounded-full" 
                        style={{ width: `${(stats.actionStepsCompleted / stats.actionStepsAssigned) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1">
          <Navbar />
          
          <main className="container mx-auto px-4 py-24">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Tere tulemast tagasi, {user?.name?.split(' ')[0]}</h1>
              <p className="text-muted-foreground">
                Siin on ülevaade sinu õppimisest, arengust ja tegevusest õpipartnerina.
              </p>
            </div>
            
            <StatsCards stats={stats} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
