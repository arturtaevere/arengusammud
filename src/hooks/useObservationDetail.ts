
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStoredObservations, StoredObservation, updateObservation } from '@/components/observation/storage';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export const useObservationDetail = () => {
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
    const loadObservation = async () => {
      try {
        const observations = await getStoredObservations();
        const found = observations.find(obs => obs.id === id);
        
        if (found) {
          console.log('Loaded observation:', found);
          setObservation(found);
          setEditedObservation(found);
          setFeedbackProvided(found.hasFeedback);
          
          // Check if current user is the observed teacher
          const teacherName = user?.name || user?.email?.split('@')[0] || '';
          const isUserObserved = found.teacher.toLowerCase().includes(teacherName.toLowerCase());
          setIsObserved(isUserObserved);
          
          console.log('Setting isObserved:', isUserObserved);
          console.log('Setting feedbackProvided:', found.hasFeedback);
        } else {
          console.log('Observation not found with id:', id);
        }
      } catch (error) {
        console.error('Error loading observation:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadObservation();
  }, [id, user]);

  const handleFeedbackProvided = async () => {
    if (!observation || !user) return;
    
    console.log('handleFeedbackProvided called');
    
    const updatedObservation = {
      ...observation,
      hasFeedback: true,
      status: 'Lõpetatud',
      user_id: user.id // Ensure user_id is set
    };
    
    await updateObservation(updatedObservation);
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
  const saveChanges = async () => {
    if (!observation || !editedObservation || !user) return;
    
    const updatedObservation = {
      ...observation,
      ...editedObservation,
      user_id: user.id // Ensure user_id is set
    };
    
    await updateObservation(updatedObservation);
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

  return {
    observation,
    setObservation,
    loading,
    isObserved,
    feedbackProvided,
    isEditing,
    editedObservation,
    handleFeedbackProvided,
    toggleEdit,
    handleInputChange,
    saveChanges,
    canSeeFeedback: canSeeFeedback(),
    canEdit: canEdit(),
    navigate
  };
};
