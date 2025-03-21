
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import CompetencesGrid from '@/components/dashboard/CompetencesGrid';
import StatsCards from '@/components/dashboard/StatsCards';
import QuickActions from '@/components/dashboard/QuickActions';
import { competences } from '@/components/dashboard/CompetencesList';

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
    <div className="min-h-screen bg-orange-light/10">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tere tulemast tagasi, {user?.name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground">
            Siin on ülevaade sinu õppimisest, arengust ja tegevusest õpipartnerina.
          </p>
        </div>
        
        <CompetencesGrid competences={competences} />
        
        <StatsCards stats={stats} />
        
        <QuickActions />
      </main>
    </div>
  );
};

export default Dashboard;
