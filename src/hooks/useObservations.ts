
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { 
  getStoredObservations, 
  updateObservation, 
  StoredObservation, 
  generateSampleObservations 
} from '@/components/observation/storage';
import { Observation } from '@/components/observations/types';

export const useObservations = () => {
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
  
  // Load observations from Supabase on component mount and when showing form changes
  useEffect(() => {
    loadObservations();
  }, [showForm, user]);

  const loadObservations = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        console.log('No user logged in, skipping observations loading');
        setObservations([]);
        setIsLoading(false);
        return;
      }
      
      console.log('Loading observations for user:', user.id);
      const storedObservations = await getStoredObservations();
      console.log('Loaded observations from storage:', storedObservations);
      
      if (!Array.isArray(storedObservations)) {
        console.error('Observations is not an array:', storedObservations);
        setObservations([]);
        return;
      }
      
      // Map stored observations to the format expected by the UI
      const formattedObservations = storedObservations.map(obs => ({
        id: obs.id,
        teacher: obs.teacher,
        subject: obs.subject || 'Tund',
        date: new Date(obs.date).toLocaleDateString('et-EE'),
        status: obs.status,
        hasFeedback: obs.hasFeedback,
        competences: obs.competences || [],
        coach: obs.coachName
      }));
      
      console.log('Formatted observations for UI:', formattedObservations);
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
    if (!user) {
      toast({
        title: "Viga",
        description: "Pead olema sisse logitud, et tagasisidet märkida",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Get the observation from Supabase
      const storedObservations = await getStoredObservations();
      const storedObs = storedObservations.find(obs => obs.id === id);
      
      if (storedObs) {
        const updatedObs: StoredObservation = {
          ...storedObs,
          hasFeedback: true,
          status: 'Lõpetatud',
          user_id: user.id // Make sure user_id is set
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

  return {
    user,
    showForm,
    observations,
    isLoading,
    handleNewObservation,
    handleSubmitForm,
    handleFeedbackGiven,
    handleGenerateSampleData
  };
};
