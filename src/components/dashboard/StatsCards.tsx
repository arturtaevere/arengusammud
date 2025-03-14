
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  MessageSquare, 
  Plus 
} from 'lucide-react';

interface StatsCardsProps {
  stats: {
    actionStepsAssigned: number;
    actionStepsCompleted: number;
    feedbackCount: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
      <Card className="hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <ClipboardList className="mr-2 h-5 w-5 text-primary" />
            Arengusammud
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">{stats.actionStepsAssigned}</p>
              <p className="text-sm text-muted-foreground">Määratud</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-500">{stats.actionStepsCompleted}</p>
              <p className="text-sm text-muted-foreground">Lõpetatud</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-primary rounded-full" 
              style={{ width: `${(stats.actionStepsCompleted / stats.actionStepsAssigned) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Tagasiside
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.feedbackCount}</p>
          <p className="text-sm text-muted-foreground">Tagasisidekohtumist läbi viidud</p>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/feedback/new">
                <Plus className="mr-2 h-4 w-4" />
                Anna tagasisidet
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
