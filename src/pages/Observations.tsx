
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Check, Plus } from 'lucide-react';
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
  const [showForm, setShowForm] = useState(false);
  const [observations, setObservations] = useState<Observation[]>([]);
  
  // Load observations from localStorage on component mount
  useEffect(() => {
    loadObservations();
  }, []);

  const loadObservations = () => {
    const storedObservations = getStoredObservations();
    
    // Map stored observations to the format expected by the UI
    const formattedObservations = storedObservations.map(obs => ({
      id: obs.id,
      teacher: obs.teacher,
      subject: obs.subject || 'Tund',
      date: new Date(obs.date).toLocaleDateString('et-EE'),
      status: obs.status,
      hasFeedback: obs.hasFeedback,
      competences: obs.competences || []
    }));
    
    setObservations(formattedObservations);
  };

  const handleNewObservation = () => {
    setShowForm(true);
  };

  const handleSubmitForm = () => {
    // This is a placeholder for future functionality
    toast({
      title: "Vaatlus salvestatud",
      description: "Tunnivaatlus on edukalt salvestatud",
      variant: "default",
    });
    setShowForm(false);
    
    // Reload observations to refresh the list
    loadObservations();
  };

  const handleFeedbackGiven = (id: string) => {
    // Update both the UI state and the persisted data
    setObservations(prevObservations => 
      prevObservations.map(obs => 
        obs.id === id 
          ? { ...obs, hasFeedback: true, status: 'Lõpetatud' } 
          : obs
      )
    );
    
    // Update in localStorage
    const storedObs = getStoredObservations().find(obs => obs.id === id);
    if (storedObs) {
      const updatedObs: StoredObservation = {
        ...storedObs,
        hasFeedback: true,
        status: 'Lõpetatud'
      };
      updateObservation(updatedObs);
    }
  };

  const handleGenerateSampleData = () => {
    if (user) {
      const teacherName = user.name || user.email?.split('@')[0] || 'Õpetaja';
      generateSampleObservations(teacherName);
      loadObservations();
      
      toast({
        title: "Näidisandmed lisatud",
        description: "Testkasutamiseks on lisatud vaatlused koos tagasisidega",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
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
            >
              <Plus className="mr-2 h-4 w-4" />
              Lisa näidisvaatlused
            </Button>
          </div>
        </div>

        {showForm ? (
          <div className="mb-8">
            <ObservationForm />
            <div className="flex justify-end mt-4">
              <Button onClick={handleSubmitForm} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Salvesta vaatlus
              </Button>
            </div>
          </div>
        ) : (
          <ObservationTabs 
            observations={observations} 
            onFeedbackGiven={handleFeedbackGiven} 
          />
        )}
      </div>
    </div>
  );
};

export default Observations;
