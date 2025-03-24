
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ObservationsList from './ObservationsList';
import { Observation, CombinedFeedbackItem } from './types';
import { Card } from '@/components/ui/card';
import { UserCheck, UserCog } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getStoredObservations } from '../observation/storage';
import TeacherFeedbackList from './TeacherFeedbackList';

interface ObservationTabsProps {
  observations: Observation[];
  onFeedbackGiven: (id: string) => void;
}

const ObservationTabs = ({ observations, onFeedbackGiven }: ObservationTabsProps) => {
  const { user } = useAuth();
  const [receivedFeedback, setReceivedFeedback] = useState<Observation[]>([]);
  const [conductedObservations, setConductedObservations] = useState<Observation[]>([]);
  const [combinedItems, setCombinedItems] = useState<CombinedFeedbackItem[]>([]);
  
  useEffect(() => {
    // For demonstration purposes, let's simulate observations where the current user is the teacher
    // Normally this would be filtered by a proper backend
    const storedObservations = getStoredObservations();
    
    // Use user's name or email as fallback to match with teacher field
    const teacherName = user?.name || user?.email?.split('@')[0] || '';
    
    const received = observations.filter(obs => 
      obs.teacher.toLowerCase().includes(teacherName.toLowerCase()) && 
      obs.status === 'Lõpetatud' && 
      obs.hasFeedback
    );
    
    // The observations that the current user conducted (i.e., not where they are the teacher)
    const conducted = observations.filter(obs => 
      !obs.teacher.toLowerCase().includes(teacherName.toLowerCase())
    );
    
    // Get teacher reflections
    const reflections = storedObservations.filter(obs => 
      obs.teacher.toLowerCase().includes(teacherName.toLowerCase()) && 
      obs.teacherReflection !== undefined
    );
    
    setReceivedFeedback(received);
    setConductedObservations(conducted);
    
    // Create combined items for the teacher view
    const feedbackItems: CombinedFeedbackItem[] = received.map(obs => {
      // Find the full observation data to get the action step
      const fullObsData = storedObservations.find(storedObs => storedObs.id === obs.id);
      
      // Make sure we're explicitly logging this to debug
      console.log('Coach for observation:', obs.id, obs.coach, fullObsData?.coachName);
      
      return {
        id: obs.id,
        teacher: obs.teacher,
        subject: obs.subject,
        date: obs.date,
        type: 'feedback',
        status: obs.status,
        hasFeedback: obs.hasFeedback,
        competences: obs.competences,
        coach: obs.coach || fullObsData?.coachName, // Try to use coachName if coach is undefined
        actionStep: fullObsData?.actionStep,
        createdAt: obs.date
      };
    });
    
    const reflectionItems: CombinedFeedbackItem[] = reflections.map(obs => ({
      id: `${obs.id}-reflection`,
      teacher: obs.teacher,
      subject: obs.subject,
      date: obs.teacherReflection?.submittedAt || obs.date,
      type: 'reflection',
      teacherReflection: obs.teacherReflection,
      createdAt: obs.teacherReflection?.submittedAt || obs.date
    }));
    
    // Helper function to validate date strings
    const isValidDate = (dateString: string) => {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    };
    
    // Combine and sort all items by date (newest first)
    // Ensure we're only sorting with valid dates
    const allItems = [...feedbackItems, ...reflectionItems].sort((a, b) => {
      // Validate dates before comparing
      const dateA = isValidDate(a.createdAt) ? new Date(a.createdAt).getTime() : 0;
      const dateB = isValidDate(b.createdAt) ? new Date(b.createdAt).getTime() : 0;
      
      return dateB - dateA;
    });
    
    // Log the combined items to debug
    console.log('Combined items for teacher view:', allItems);
    
    setCombinedItems(allItems);
  }, [observations, user]);

  return (
    <Card className="p-4">
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="conducted" className="flex items-center justify-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Mina õpipartnerina</span>
            <span className="sm:hidden">Õpipartner</span>
          </TabsTrigger>
          <TabsTrigger value="received" className="flex items-center justify-center gap-2">
            <UserCog className="h-4 w-4" />
            <span className="hidden sm:inline">Mina õpetajana</span>
            <span className="sm:hidden">Õpetaja</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="conducted" className="mt-0">
          <ObservationsList 
            observations={conductedObservations} 
            onFeedbackGiven={onFeedbackGiven}
            title="Vaatlused ja tagasisidekohtumised, mille mina olen läbi viinud"
            emptyMessage="Sa pole veel ühtegi vaatlust läbi viinud"
            role="observer"
          />
        </TabsContent>
        
        <TabsContent value="received" className="mt-0">
          <TeacherFeedbackList items={combinedItems} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ObservationTabs;
