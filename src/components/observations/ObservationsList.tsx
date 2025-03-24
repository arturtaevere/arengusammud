
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, CheckCircle2, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Observation {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  status: string;
  hasFeedback: boolean;
  competences: string[];
  coach?: string;
}

interface ObservationsListProps {
  observations: Observation[];
  onFeedbackGiven: (id: string) => void;
  title?: string;
  emptyMessage?: string;
  role?: 'observer' | 'observed';
}

const ObservationsList = ({ 
  observations, 
  onFeedbackGiven, 
  title = "Vaatlused", 
  emptyMessage = "Vaatlusi pole", 
  role = 'observer' 
}: ObservationsListProps) => {
  const { toast } = useToast();

  const handleFeedbackGiven = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFeedbackGiven(id);
    toast({
      title: "Tagasiside antud",
      description: "Õpetajale on saadetud tagasiside",
    });
  };

  if (observations.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {title && (
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-medium">{title}</h2>
          <div className="text-sm text-gray-500">
            Kokku: {observations.length}
          </div>
        </div>
      )}
      
      <div className="grid gap-4">
        {observations.map((observation) => (
          <Card key={observation.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg">{observation.teacher}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  observation.status === 'Lõpetatud' 
                    ? 'bg-green-100 text-green-800' 
                    : observation.status === 'Vaadeldud' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-orange-100 text-orange-800'
                }`}>
                  {observation.status}
                </span>
              </div>
              <CardDescription>{observation.date}</CardDescription>
              {observation.coach && (
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <UserCircle className="mr-1 h-3 w-3" />
                  Õpipartner: {observation.coach}
                </div>
              )}
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-1 text-xs">
                {observation.competences.map((competence, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded-full">
                    {competence}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center text-xs text-gray-500">
                  {observation.hasFeedback ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Tagasiside antud
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Tagasiside puudub
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {role === 'observer' && !observation.hasFeedback && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={(e) => handleFeedbackGiven(observation.id, e)}
                    >
                      Tagasiside antud
                    </Button>
                  )}
                  <Link to={`/observations/${observation.id}`}>
                    <Button variant="outline" size="sm">Vaata</Button>
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ObservationsList;
