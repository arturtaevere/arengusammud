
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getStoredObservations } from '@/components/observation/storage';
import { Observation, CombinedFeedbackItem } from '../types';

interface UseObservationItemsResult {
  receivedFeedback: Observation[];
  conductedObservations: Observation[];
  teacherCombinedItems: CombinedFeedbackItem[];
  coachCombinedItems: CombinedFeedbackItem[];
}

export const useObservationItems = (observations: Observation[]): UseObservationItemsResult => {
  const { user } = useAuth();
  const [receivedFeedback, setReceivedFeedback] = useState<Observation[]>([]);
  const [conductedObservations, setConductedObservations] = useState<Observation[]>([]);
  const [teacherCombinedItems, setTeacherCombinedItems] = useState<CombinedFeedbackItem[]>([]);
  const [coachCombinedItems, setCoachCombinedItems] = useState<CombinedFeedbackItem[]>([]);
  
  useEffect(() => {
    // Asynchronously load stored observations
    const loadStoredObservations = async () => {
      try {
        // Get all stored observations
        const storedObservations = await getStoredObservations();
        console.log('Loaded stored observations:', storedObservations);
        
        if (!Array.isArray(storedObservations)) {
          console.error('storedObservations is not an array:', storedObservations);
          return;
        }
        
        if (!user) {
          console.log('No user logged in, cannot filter observations');
          return;
        }
        
        // Use user's name or email as fallback to match with teacher field
        const teacherName = user?.name || user?.email?.split('@')[0] || '';
        console.log('Current user name for matching:', teacherName);
        
        // The observations where the current user is the teacher
        const received = observations.filter(obs => 
          obs.teacher.toLowerCase().includes(teacherName.toLowerCase()) && 
          obs.status === 'Lõpetatud' && 
          obs.hasFeedback
        );
        
        // The observations that the current user conducted (i.e., as the coach)
        const conducted = observations.filter(obs => {
          const isCoach = !obs.teacher.toLowerCase().includes(teacherName.toLowerCase());
          console.log(`Observation ${obs.id} created by ${obs.teacher}, isCoach: ${isCoach}`);
          return isCoach;
        });
        
        console.log('Filtered received observations:', received);
        console.log('Filtered conducted observations:', conducted);
        
        // Get teacher reflections
        const reflections = storedObservations.filter(obs => 
          obs.teacher.toLowerCase().includes(teacherName.toLowerCase()) && 
          obs.teacherReflection !== undefined
        );
        
        setReceivedFeedback(received);
        setConductedObservations(conducted);
        
        // Create combined items for the teacher view (Mina õpetajana)
        const teacherFeedbackItems: CombinedFeedbackItem[] = received.map(obs => {
          // Find the full observation data to get the action step
          const fullObsData = storedObservations.find(storedObs => storedObs.id === obs.id);
          
          return {
            id: obs.id,
            teacher: obs.teacher,
            subject: obs.subject,
            date: obs.date,
            type: 'feedback',
            status: obs.status,
            hasFeedback: obs.hasFeedback,
            competences: obs.competences,
            coach: obs.coach || fullObsData?.coachName,
            actionStep: fullObsData?.actionStep,
            createdAt: obs.date
          };
        });
        
        const teacherReflectionItems: CombinedFeedbackItem[] = reflections.map(obs => ({
          id: `${obs.id}-reflection`,
          teacher: obs.teacher,
          subject: obs.subject,
          date: obs.teacherReflection?.submittedAt || obs.date,
          type: 'reflection',
          teacherReflection: obs.teacherReflection,
          createdAt: obs.teacherReflection?.submittedAt || obs.date
        }));
        
        // Create combined items for the coach view (Mina õpipartnerina)
        const coachFeedbackItems: CombinedFeedbackItem[] = conducted.map(obs => {
          // Find the full observation data to get the action step
          const fullObsData = storedObservations.find(storedObs => storedObs.id === obs.id);
          
          return {
            id: obs.id,
            teacher: obs.teacher,
            subject: obs.subject,
            date: obs.date,
            type: 'feedback',
            status: obs.status,
            hasFeedback: obs.hasFeedback,
            competences: obs.competences,
            coach: teacherName,
            actionStep: fullObsData?.actionStep,
            createdAt: obs.date
          };
        });
        
        // Helper function to validate date strings
        const isValidDate = (dateString: string) => {
          const date = new Date(dateString);
          return !isNaN(date.getTime());
        };
        
        // Combine and sort all items for teacher view by date (newest first)
        const allTeacherItems = [...teacherFeedbackItems, ...teacherReflectionItems].sort((a, b) => {
          // Validate dates before comparing
          const dateA = isValidDate(a.createdAt) ? new Date(a.createdAt).getTime() : 0;
          const dateB = isValidDate(b.createdAt) ? new Date(b.createdAt).getTime() : 0;
          
          return dateB - dateA;
        });
        
        // Combine and sort all items for coach view by date (newest first)
        const allCoachItems = [...coachFeedbackItems].sort((a, b) => {
          // Validate dates before comparing
          const dateA = isValidDate(a.createdAt) ? new Date(a.createdAt).getTime() : 0;
          const dateB = isValidDate(b.createdAt) ? new Date(b.createdAt).getTime() : 0;
          
          return dateB - dateA;
        });
        
        // Log the combined items to debug
        console.log('Combined items for teacher view:', allTeacherItems);
        console.log('Combined items for coach view:', allCoachItems);
        
        setTeacherCombinedItems(allTeacherItems);
        setCoachCombinedItems(allCoachItems);
      } catch (error) {
        console.error('Error loading stored observations:', error);
      }
    };
    
    loadStoredObservations();
  }, [observations, user]);

  return {
    receivedFeedback,
    conductedObservations,
    teacherCombinedItems,
    coachCombinedItems
  };
};
