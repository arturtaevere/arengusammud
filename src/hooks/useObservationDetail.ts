
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

  return {
    observation,
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
