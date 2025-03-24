
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ObservationForm from '@/components/ObservationForm';
import { useToast } from '@/hooks/use-toast';
import ObservationHeader from '@/components/observations/ObservationHeader';
import ObservationTabs from '@/components/observations/ObservationTabs';
import { getStoredObservations, updateObservation, StoredObservation, generateSampleObservations } from '@/components/observation/storage';
import { Observation } from '@/components/observations/types';
import { useAuth } from '@/context/AuthContext';

const Observations = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if we should show the form based on URL
  useEffect(() => {
    // If the URL contains "new", show the form automatically
    if (location.pathname.includes('/new')) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [location]);
  
  // Load observations from Supabase on component mount
  useEffect(() => {
    loadObservations();
  }, []);

  const loadObservations = async () => {
    setIsLoading(true);
    try {
      const storedObservations = await getStoredObservations();
      
      // Map stored observations to the format expected by the UI
      const formattedObservations = storedObservations.map(obs => ({
        id: obs.id,
        teacher: obs.teacher,
        subject: obs.subject || 'Tund',
        date: new Date(obs.date).toLocaleDateString('et-EE'),
        status: obs.status,
        hasFeedback: obs.hasFeedback,
        competences: obs.competences || [],
        coachName: obs.coachName
      }));
      
      setObservations(formattedObservations);
    } catch (error) {
      console.error('Error loading observations:', error);
      toast({
        title: "Viga",
        description: "Vaatluste laadimine ebaõnnestus",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewObservation = () => {
    setShowForm(true);
  };

  const handleSubmitForm = () => {
    toast({
      title: "Vaatlus salvestatud",
      description: "Tunnivaatlus on edukalt salvestatud",
      variant: "default",
    });
    setShowForm(false);
    
    // Reload observations to refresh the list
    loadObservations();
  };

  const handleFeedbackGiven = async (id: string) => {
    try {
      // Get the observation from Supabase
      const storedObservations = await getStoredObservations();
      const storedObs = storedObservations.find(obs => obs.id === id);
      
      if (storedObs) {
        const updatedObs: StoredObservation = {
          ...storedObs,
          hasFeedback: true,
          status: 'Lõpetatud'
        };
        
        // Update in Supabase
        await updateObservation(updatedObs);
        
        // Update the UI state
        setObservations(prevObservations => 
          prevObservations.map(obs => 
            obs.id === id 
              ? { ...obs, hasFeedback: true, status: 'Lõpetatud' } 
              : obs
          )
        );
        
        toast({
          title: "Tagasiside antud",
          description: "Õpetajale on saadetud tagasiside",
        });
      }
    } catch (error) {
      console.error('Error updating feedback status:', error);
      toast({
        title: "Viga",
        description: "Tagasiside märkimine ebaõnnestus",
        variant: "destructive",
      });
    }
  };

  const handleGenerateSampleData = async () => {
    if (user) {
      setIsLoading(true);
      try {
        const teacherName = user.name || user.email?.split('@')[0] || 'Õpetaja';
        await generateSampleObservations(teacherName);
        await loadObservations();
        
        toast({
          title: "Näidisandmed lisatud",
          description: "Testkasutamiseks on lisatud vaatlused koos tagasisidega",
        });
      } catch (error) {
        console.error('Error generating sample data:', error);
        toast({
          title: "Viga",
          description: "Näidisandmete lisamine ebaõnnestus",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        {!showForm && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Õpipartnerlus</h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleNewObservation}>
                <Plus className="mr-2 h-4 w-4" />
                Uus vaatlus
              </Button>
              <Button 
                variant="outline" 
                onClick={handleGenerateSampleData}
                disabled={isLoading}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isLoading ? "Laadimine..." : "Lisa näidisvaatlused"}
              </Button>
            </div>
          </div>
        )}

        {showForm ? (
          <div className="mb-8">
            <ObservationForm onSubmit={handleSubmitForm} />
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-muted-foreground">Vaatluste laadimine...</p>
              </div>
            ) : (
              <ObservationTabs 
                observations={observations} 
                onFeedbackGiven={handleFeedbackGiven} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Observations;
