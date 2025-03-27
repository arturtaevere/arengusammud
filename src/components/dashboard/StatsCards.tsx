
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  UserCheck,
  Plus,
  Heart,
  ArrowRight,
  PenLine,
  MessageSquare,
  GraduationCap
} from 'lucide-react';
import { getStoredObservations } from '@/components/observation/storage';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface StatsCardsProps {
  stats: {
    actionStepsAssigned: number;
    actionStepsCompleted: number;
    feedbackCount: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  // Generate an array of the length of completed steps to render hearts
  const completedHearts = Array.from({ length: stats.actionStepsCompleted }, (_, i) => i);
  const { user } = useAuth();
  const [completedFeedbackCount, setCompletedFeedbackCount] = useState(0);
  
  // Count completed feedback meetings for the current user
  useEffect(() => {
    if (user) {
      const fetchCompletedFeedback = async () => {
        try {
          const observations = await getStoredObservations();
          const completed = observations.filter(obs => 
            obs.coachName === user.name && 
            obs.hasFeedback === true
          ).length;
          
          setCompletedFeedbackCount(completed);
        } catch (error) {
          console.error('Error fetching completed feedback count:', error);
          setCompletedFeedbackCount(0);
        }
      };
      
      fetchCompletedFeedback();
    }
  }, [user]);
  
  // Generate an array for feedback hearts
  const feedbackHearts = Array.from({ length: completedFeedbackCount }, (_, i) => i);
  
  // This would typically come from your API or state
  // For now we're hard-coding step10-1 as that's a valid action step from your data
  const currentActionStepId = "step10-1";
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
      <Card className="hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-primary" />
            Õpetajana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="text-xs text-muted-foreground mb-1">Samme astutud</h4>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{stats.actionStepsCompleted}</span>
                <div className="flex">
                  {completedHearts.map((_, index) => (
                    <Heart 
                      key={index} 
                      className="h-5 w-5 fill-orange-500 text-orange-500" 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs text-muted-foreground mb-1">Minu eesmärk</h4>
              <p className="text-sm font-medium">Õpilaste individuaalse arengu toetamine</p>
            </div>
            
            <div>
              <h4 className="text-xs text-muted-foreground mb-1">Minu arengusamm</h4>
              <Link 
                to={`/action-step/${currentActionStepId}`} 
                className="group flex items-center justify-between hover:text-primary transition-colors"
              >
                <p className="text-sm font-medium">Tagasiside andmine õppimisprotsessile</p>
                <ArrowRight className="h-4 w-4 ml-1 text-primary" />
              </Link>
            </div>
            
            {/* Update reflection link to point to the new page */}
            <div>
              <Link 
                to="/reflections/new" 
                className="flex items-center justify-between text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
              >
                <span className="flex items-center">
                  <PenLine className="h-4 w-4 mr-2" />
                  Lisa refleksioon
                </span>
                <ArrowRight className="h-4 w-4 text-orange-500" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Õpipartnerina
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="text-xs text-muted-foreground mb-1">Tagasisidekohtumist läbi viidud</h4>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{completedFeedbackCount}</span>
                <div className="flex">
                  {feedbackHearts.map((_, index) => (
                    <Heart 
                      key={index} 
                      className="h-5 w-5 fill-orange-500 text-orange-500" 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Link 
                to="/observations/new" 
                className="flex items-center justify-between text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
              >
                <span className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Lisa uus tunnivaatlus
                </span>
                <ArrowRight className="h-4 w-4 text-orange-500" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
