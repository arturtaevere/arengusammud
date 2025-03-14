
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import CompetencesGrid from '@/components/dashboard/CompetencesGrid';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentObservations from '@/components/dashboard/RecentObservations';
import ActionStepsCard from '@/components/dashboard/ActionStepsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { competencesList } from '@/components/dashboard/CompetencesList';

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
    observationsCount: 8,
    feedbackCount: 15
  };
  
  const recentObservations = [
    { id: '1', teacher: 'Jane Smith', date: '2023-05-15', subject: 'Matemaatika' },
    { id: '2', teacher: 'Alex Johnson', date: '2023-05-10', subject: 'Loodusõpetus' },
    { id: '3', teacher: 'Maria Garcia', date: '2023-05-05', subject: 'Eesti keel' },
  ];
  
  const upcomingActionSteps = [
    { id: '1', title: 'Rakenda mõtle-paarilisega-jaga meetodit', dueDate: '2023-05-20', category: 'Õpilaste kaasamine' },
    { id: '2', title: 'Kasuta väljumispileteid hindamiseks', dueDate: '2023-05-22', category: 'Hindamine' },
    { id: '3', title: 'Diferentseeri õpetamist', dueDate: '2023-05-25', category: 'Diferentseerimine' },
  ];

  // Debug the competencesList to see what's happening
  console.log('CompetencesList in Dashboard:', competencesList);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tere tulemast tagasi, {user?.name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground">
            Siin on ülevaade sinu juhendamistegevustest ja progressist.
          </p>
        </div>
        
        {competencesList && competencesList.length > 0 ? (
          <CompetencesGrid competences={competencesList} />
        ) : (
          <div className="p-6 bg-white rounded-lg shadow mb-8">
            <p className="text-center text-gray-500">Õpieesmärgid laadin...</p>
          </div>
        )}
        
        <StatsCards stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RecentObservations observations={recentObservations} />
          <ActionStepsCard actionSteps={upcomingActionSteps} />
        </div>
        
        <QuickActions />
      </main>
    </div>
  );
};

export default Dashboard;
