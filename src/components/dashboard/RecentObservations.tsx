
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, Plus } from 'lucide-react';

interface Observation {
  id: string;
  teacher: string;
  date: string;
  subject: string;
}

interface RecentObservationsProps {
  observations: Observation[];
}

const RecentObservations = ({ observations }: RecentObservationsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Hiljutised vaatlused</CardTitle>
            <CardDescription>Sinu viimased tunnivaatlused</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to="/observations">Vaata kõiki</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {observations.length > 0 ? (
          <div className="space-y-4">
            {observations.map((observation) => (
              <div 
                key={observation.id}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="rounded-full bg-primary/10 p-2 mr-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{observation.teacher}</h4>
                  <p className="text-sm text-muted-foreground">{observation.subject}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {observation.date}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary text-xs"
                    asChild
                  >
                    <Link to={`/observations/${observation.id}`}>Vaata detaile</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Ühtegi vaatlust pole veel salvestatud</p>
            <Button asChild>
              <Link to="/observations/new">
                <Plus className="mr-2 h-4 w-4" />
                Uus vaatlus
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentObservations;
