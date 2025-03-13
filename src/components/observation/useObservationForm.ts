
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  ObservationFormValues, 
  observationFormSchema, 
  getLastObservedTeacher, 
  saveLastObservedTeacher,
  getTeacherDevelopmentGoal
} from './types';

export const useObservationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Default values for the form
  const lastTeacher = getLastObservedTeacher();
  const defaultValues: Partial<ObservationFormValues> = {
    date: new Date().toISOString().split('T')[0],
    teacherName: lastTeacher || "",
    developmentGoal: lastTeacher ? getTeacherDevelopmentGoal(lastTeacher) : "",
  };
  
  // Form setup
  const form = useForm<ObservationFormValues>({
    resolver: zodResolver(observationFormSchema),
    defaultValues,
  });
  
  // Watch for teacher name changes to update the development goal
  const teacherName = form.watch('teacherName');
  
  useEffect(() => {
    if (teacherName) {
      const developmentGoal = getTeacherDevelopmentGoal(teacherName);
      form.setValue('developmentGoal', developmentGoal);
    }
  }, [teacherName, form]);
  
  // Form submission handler
  const onSubmit = async (data: ObservationFormValues) => {
    setIsSubmitting(true);
    
    // Save the selected teacher for next time
    saveLastObservedTeacher(data.teacherName);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Observation data:', data);
    
    toast({
      title: "Vaatlus salvestatud",
      description: "Tunnivaatlus on edukalt salvestatud.",
    });
    
    setIsSubmitting(false);
    navigate('/observations');
  };
  
  return {
    form,
    isSubmitting,
    onSubmit,
  };
};
