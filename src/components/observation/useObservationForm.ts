
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { observationFormSchema, ObservationFormValues } from './schemas';
import { generateObservationId, saveObservation } from './storage';
import { useAuth } from '@/context/AuthContext';

export const useObservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<ObservationFormValues>({
    resolver: zodResolver(observationFormSchema),
    defaultValues: {
      teacherName: '',
      date: new Date().toISOString().split('T')[0],
      coachName: user?.name || '', // Default to current user's name
      developmentGoal: '',
      actionStep: '',
      teacherNotes: '',
      studentNotes: '',
      specificPraise: '',
      nextActionStep: '',
    }
  });
  
  const onSubmit = async (values: ObservationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create observation object
      const newObservation = {
        id: generateObservationId(),
        teacher: values.teacherName,
        subject: 'Tund', // Default subject
        date: values.date,
        status: 'Vaadeldud',
        hasFeedback: false,
        coachName: values.coachName,
        competences: [],
        teacherNotes: values.teacherNotes,
        studentNotes: values.studentNotes,
        specificPraise: values.specificPraise,
        developmentGoal: values.developmentGoal,
        actionStep: values.actionStep,
        nextActionStep: values.nextActionStep,
        createdAt: new Date().toISOString(),
      };
      
      // Save to local storage
      saveObservation(newObservation);
      
      // Show success message
      toast({
        title: "Vaatlus salvestatud",
        description: "Tunnivaatlus on edukalt salvestatud",
      });
      
      // Redirect to observations list
      navigate('/observations');
    } catch (error) {
      console.error('Error saving observation:', error);
      toast({
        title: "Viga",
        description: "Tunnivaatluse salvestamine ebaõnnestus",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    form,
    isSubmitting,
    onSubmit,
  };
};
