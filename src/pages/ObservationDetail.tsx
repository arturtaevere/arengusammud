
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Calendar, Target, ClipboardList, MessageSquare, CalendarCheck } from 'lucide-react';
import { getStoredObservations, StoredObservation, updateObservation } from '@/components/observation/storage';
import { useToast } from '@/hooks/use-toast';

const ObservationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [observation, setObservation] = useState<StoredObservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedbackProvided, setFeedbackProvided] = useState(false);

  useEffect(() => {
    const loadObservation = () => {
      const observations = getStoredObservations();
      const found = observations.find(obs => obs.id === id);
      
      if (found) {
        setObservation(found);
        setFeedbackProvided(found.hasFeedback);
      }
      
      setLoading(false);
    };
    
    loadObservation();
  }, [id]);

  const handleFeedbackProvided = () => {
    if (!observation) return;
    
    const updatedObservation = {
      ...observation,
      hasFeedback: true,
      status: 'Lõpetatud'
    };
    
    updateObservation(updatedObservation);
    setObservation(updatedObservation);
    setFeedbackProvided(true);
    
    toast({
      title: "Tagasiside märgitud",
      description: "Tagasisidekohtumine on märgitud toimunuks",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto pt-24 pb-12 px-4">
          <div className="text-center">Laadin...</div>
        </div>
      </div>
    );
  }

  if (!observation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto pt-24 pb-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Vaatlust ei leitud</h2>
            <Button onClick={() => navigate('/observations')}>Tagasi vaatluste juurde</Button>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(observation.date).toLocaleDateString('et-EE');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4 max-w-4xl">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => navigate('/observations')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tagasi
          </Button>
          <h1 className="text-2xl font-semibold">Tunnivaatlus</h1>
        </div>

        <div className="space-y-6">
          {/* General Information */}
          <Card>
            <CardHeader>
              <CardTitle>Üldandmed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium flex items-center text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    Õpetaja nimi
                  </h3>
                  <p className="mt-1">{observation.teacher}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Vaatluse kuupäev
                  </h3>
                  <p className="mt-1">{formattedDate}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium flex items-center text-gray-500">
                  <Target className="h-4 w-4 mr-2" />
                  Õpetaja arengueesmärk
                </h3>
                <p className="mt-1 whitespace-pre-wrap">{observation.developmentGoal}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium flex items-center text-gray-500">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Õpetaja arengusamm
                </h3>
                <p className="mt-1 whitespace-pre-wrap">{observation.actionStep}</p>
              </div>
            </CardContent>
          </Card>

          {/* Observation Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Vaatluse märkmed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Õpetaja tegevus</h3>
                <p className="mt-1 whitespace-pre-wrap">{observation.teacherNotes}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Õpilaste tegevus</h3>
                <p className="mt-1 whitespace-pre-wrap">{observation.studentNotes}</p>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Tagasiside</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Konkreetne kiitus</h3>
                <p className="mt-1 whitespace-pre-wrap">{observation.specificPraise}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Järgmine arengusamm</h3>
                <p className="mt-1 whitespace-pre-wrap">{observation.nextActionStep}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Feedback Meeting Button */}
          <div className="flex justify-end mt-8">
            <Button 
              onClick={handleFeedbackProvided}
              disabled={feedbackProvided}
              className="gap-2"
            >
              <CalendarCheck className="h-4 w-4" />
              {feedbackProvided 
                ? "Tagasisidekohtumine toimunud" 
                : "Märgi tagasisidekohtumine toimunuks"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationDetail;
