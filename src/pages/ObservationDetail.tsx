
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Calendar, Target, ClipboardList, MessageSquare, CalendarCheck, Edit, Save } from 'lucide-react';
import { getStoredObservations, StoredObservation, updateObservation } from '@/components/observation/storage';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Textarea } from '@/components/ui/textarea';

const ObservationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [observation, setObservation] = useState<StoredObservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedbackProvided, setFeedbackProvided] = useState(false);
  const [isObserved, setIsObserved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedObservation, setEditedObservation] = useState<Partial<StoredObservation>>({});

  useEffect(() => {
    const loadObservation = () => {
      const observations = getStoredObservations();
      const found = observations.find(obs => obs.id === id);
      
      if (found) {
        setObservation(found);
        setEditedObservation(found);
        setFeedbackProvided(found.hasFeedback);
        
        // Check if current user is the observed teacher
        const teacherName = user?.name || user?.email?.split('@')[0] || '';
        const isUserObserved = found.teacher.toLowerCase().includes(teacherName.toLowerCase());
        setIsObserved(isUserObserved);
      }
      
      setLoading(false);
    };
    
    loadObservation();
  }, [id, user]);

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

  // Handle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Update form fields when editing
  const handleInputChange = (field: keyof StoredObservation, value: string) => {
    setEditedObservation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save edited observation
  const saveChanges = () => {
    if (!observation || !editedObservation) return;
    
    const updatedObservation = {
      ...observation,
      ...editedObservation
    };
    
    updateObservation(updatedObservation);
    setObservation(updatedObservation);
    setIsEditing(false);
    
    toast({
      title: "Muudatused salvestatud",
      description: "Vaatluse andmed on edukalt uuendatud",
    });
  };

  // Determine if user should see feedback details
  const canSeeFeedback = () => {
    if (!observation) return false;
    
    // Coach can always see feedback
    if (!isObserved) return true;
    
    // Teacher can only see feedback if it's been provided
    return isObserved && observation.hasFeedback;
  };

  // Determine if user can edit the observation
  const canEdit = () => {
    if (!observation) return false;
    
    // Only coach can edit
    return !isObserved && !feedbackProvided;
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
        <div className="flex items-center mb-6 justify-between">
          <div className="flex items-center">
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
          
          {canEdit() && !isEditing && (
            <Button onClick={toggleEdit} variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Muuda
            </Button>
          )}
          
          {isEditing && (
            <Button onClick={saveChanges} variant="default" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Salvesta
            </Button>
          )}
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
                {isEditing ? (
                  <Textarea
                    value={editedObservation.developmentGoal || ''}
                    onChange={(e) => handleInputChange('developmentGoal', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 whitespace-pre-wrap">{observation.developmentGoal}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium flex items-center text-gray-500">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Õpetaja arengusamm
                </h3>
                {isEditing ? (
                  <Textarea
                    value={editedObservation.actionStep || ''}
                    onChange={(e) => handleInputChange('actionStep', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 whitespace-pre-wrap">{observation.actionStep}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Observation Notes - visible to everyone */}
          <Card>
            <CardHeader>
              <CardTitle>Vaatluse märkmed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Õpetaja tegevus</h3>
                {isEditing ? (
                  <Textarea
                    value={editedObservation.teacherNotes || ''}
                    onChange={(e) => handleInputChange('teacherNotes', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 whitespace-pre-wrap">{observation.teacherNotes}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Õpilaste tegevus</h3>
                {isEditing ? (
                  <Textarea
                    value={editedObservation.studentNotes || ''}
                    onChange={(e) => handleInputChange('studentNotes', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 whitespace-pre-wrap">{observation.studentNotes}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Feedback - only visible to coaches or teachers with feedback provided */}
          {canSeeFeedback() && (
            <Card>
              <CardHeader>
                <CardTitle>Tagasiside</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Konkreetne kiitus</h3>
                  {isEditing ? (
                    <Textarea
                      value={editedObservation.specificPraise || ''}
                      onChange={(e) => handleInputChange('specificPraise', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 whitespace-pre-wrap">{observation.specificPraise}</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Järgmine arengusamm</h3>
                  {isEditing ? (
                    <Textarea
                      value={editedObservation.nextActionStep || ''}
                      onChange={(e) => handleInputChange('nextActionStep', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 whitespace-pre-wrap">{observation.nextActionStep}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Feedback Meeting Button - only visible to coaches */}
          {!isObserved && (
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
          )}
          
          {/* Message for teachers when feedback is not yet provided */}
          {isObserved && !observation.hasFeedback && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-blue-800">
                  Tagasiside kuvatakse siin pärast seda, kui õpipartner on märkinud tagasisidekohtumise toimunuks.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObservationDetail;
