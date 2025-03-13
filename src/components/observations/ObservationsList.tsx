
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, List, Grid, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Observation {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  status: string;
  hasFeedback: boolean;
  competences: string[];
}

interface ObservationsListProps {
  observations: Observation[];
}

const ObservationsList = ({ observations }: ObservationsListProps) => {
  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtreeri
          </Button>
          <div className="border rounded-md flex divide-x">
            <Button variant="ghost" size="sm" className="rounded-r-none">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-l-none">
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Kokku: {observations.length} vaatlust
        </div>
      </div>
      
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
              <CardDescription>{observation.subject} • {observation.date}</CardDescription>
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
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Tagasiside antud
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Tagasiside puudub
                    </span>
                  )}
                </div>
                <Link to={`/observations/${observation.id}`}>
                  <Button variant="outline" size="sm">Vaata</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ObservationsList;
