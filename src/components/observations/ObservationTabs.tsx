
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ObservationsList from './ObservationsList';
import { Observation } from './types';
import { Card } from '@/components/ui/card';
import { UserCheck, UserCog } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getStoredObservations } from '../observation/storage';

interface ObservationTabsProps {
  observations: Observation[];
  onFeedbackGiven: (id: string) => void;
}

const ObservationTabs = ({ observations, onFeedbackGiven }: ObservationTabsProps) => {
  const { user } = useAuth();
  const [receivedFeedback, setReceivedFeedback] = useState<Observation[]>([]);
  const [conductedObservations, setConductedObservations] = useState<Observation[]>([]);
  
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
    
    setReceivedFeedback(received);
    setConductedObservations(conducted);
  }, [observations, user]);

  return (
    <Card className="p-4">
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="conducted" className="flex items-center justify-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Vaatlused, mille olen läbi viinud</span>
            <span className="sm:hidden">Läbi viidud</span>
          </TabsTrigger>
          <TabsTrigger value="received" className="flex items-center justify-center gap-2">
            <UserCog className="h-4 w-4" />
            <span className="hidden sm:inline">Tagasiside mulle</span>
            <span className="sm:hidden">Saadud</span>
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
          <ObservationsList 
            observations={receivedFeedback} 
            onFeedbackGiven={onFeedbackGiven}
            title="Tagasiside mulle minu õpipartnerilt"
            emptyMessage="Sa pole veel tagasisidet saanud"
            role="observed"
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ObservationTabs;
