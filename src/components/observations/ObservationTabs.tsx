
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ObservationsList from './ObservationsList';
import { Observation, CombinedFeedbackItem } from './types';
import { Card } from '@/components/ui/card';
import { UserCheck, UserCog } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getStoredObservations } from '../observation/storage';
import TeacherFeedbackList from './TeacherFeedbackList';
import { useLocation } from 'react-router-dom';

interface ObservationTabsProps {
  observations: Observation[];
  onFeedbackGiven: (id: string) => void;
}

const ObservationTabs = ({ observations, onFeedbackGiven }: ObservationTabsProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  const [defaultTab, setDefaultTab] = useState('received');
  const [receivedFeedback, setReceivedFeedback] = useState<Observation[]>([]);
  const [conductedObservations, setConductedObservations] = useState<Observation[]>([]);
  const [teacherCombinedItems, setTeacherCombinedItems] = useState<CombinedFeedbackItem[]>([]);
  const [coachCombinedItems, setCoachCombinedItems] = useState<CombinedFeedbackItem[]>([]);
  
  // Set default tab based on URL parameter
  useEffect(() => {
    if (tabParam === 'conducted') {
      setDefaultTab('conducted');
    } else if (tabParam === 'received') {
      setDefaultTab('received');
    }
  }, [tabParam]);
  
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
        // Include user_id check to make sure we only show observations created by this user
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
            coach: obs.coach || fullObsData?.coachName, // Try to use coachName if coach is undefined
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
            coach: teacherName, // The current user is the coach
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

  return (
    <Card className="p-4">
      <Tabs defaultValue={defaultTab} className="w-full">
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
          <TeacherFeedbackList 
            items={coachCombinedItems} 
            title="Tagasiside ja vaatlused, mille mina olen läbi viinud"
            emptyMessage="Sa pole veel ühtegi vaatlust läbi viinud"
          />
        </TabsContent>
        
        <TabsContent value="received" className="mt-0">
          <TeacherFeedbackList 
            items={teacherCombinedItems}
            title="Tagasiside minule ja minu refleksioonid" 
            emptyMessage="Sa pole veel tagasisidet ega refleksioone lisanud"
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ObservationTabs;
