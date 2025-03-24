
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  MessageSquare, 
  Plus,
  Heart 
} from 'lucide-react';

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
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
      <Card className="hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <ClipboardList className="mr-2 h-5 w-5 text-primary" />
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
              <h4 className="text-xs text-muted-foreground mb-1">Minu arengueesmärk</h4>
              <p className="text-sm font-medium">Õpilaste individuaalse arengu toetamine</p>
            </div>
            
            <div>
              <h4 className="text-xs text-muted-foreground mb-1">Minu arengusamm</h4>
              <p className="text-sm font-medium">Tagasiside andmine õppimisprotsessile</p>
            </div>
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
