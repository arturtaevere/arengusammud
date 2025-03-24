
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ObservationsList from './ObservationsList';
import { Observation } from './types';
import { Card } from '@/components/ui/card';
import { UserCheck, UserCog } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getStoredObservations, StoredObservation } from '../observation/storage';
import TeacherReflections from './TeacherReflections';

interface ObservationTabsProps {
  observations: Observation[];
  onFeedbackGiven: (id: string) => void;
}

// Create a combined type for unified display
interface CombinedFeedbackItem {
  id: string;
  teacher: string;
  subject?: string;
  date: string;
  type: 'feedback' | 'reflection';
  status?: string;
  hasFeedback?: boolean;
  competences?: string[];
  teacherReflection?: {
    reflection: string;
    submittedAt: string;
  };
  createdAt: string;
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
    const feedbackItems: CombinedFeedbackItem[] = received.map(obs => ({
      id: obs.id,
      teacher: obs.teacher,
      subject: obs.subject,
      date: obs.date,
      type: 'feedback',
      status: obs.status,
      hasFeedback: obs.hasFeedback,
      competences: obs.competences,
      createdAt: obs.date // Use date as createdAt for sorting
    }));
    
    const reflectionItems: CombinedFeedbackItem[] = reflections.map(obs => ({
      id: `${obs.id}-reflection`,
      teacher: obs.teacher,
      subject: obs.subject,
      date: obs.teacherReflection?.submittedAt || obs.date,
      type: 'reflection',
      teacherReflection: obs.teacherReflection,
      createdAt: obs.teacherReflection?.submittedAt || obs.date // Use reflection date for sorting
    }));
    
    // Combine and sort all items by date (newest first)
    const allItems = [...feedbackItems, ...reflectionItems].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
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
          {combinedItems.length > 0 ? (
            <div className="grid gap-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-medium">Tagasiside minule ja minu refleksioonid</h2>
                <div className="text-sm text-gray-500">
                  Kokku: {combinedItems.length}
                </div>
              </div>
              
              <div className="grid gap-4">
                {combinedItems.map((item) => (
                  <Card key={item.id} className="transition-all hover:shadow-md">
                    <div className="p-4 pb-2">
                      <div className="flex justify-between">
                        <div className="text-lg font-medium">
                          {item.subject || 'Tund'}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.type === 'reflection' 
                            ? 'bg-green-100 text-green-800' 
                            : item.status === 'Lõpetatud' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-orange-100 text-orange-800'
                        }`}>
                          {item.type === 'reflection' ? 'Reflektsioon' : item.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(item.date).toLocaleDateString('et-EE')}
                      </div>
                    </div>
                    
                    <div className="px-4 pb-2">
                      {item.type === 'reflection' ? (
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {item.teacherReflection?.reflection && (
                            <>
                              {item.teacherReflection.reflection.substring(0, 150)}
                              {item.teacherReflection.reflection.length > 150 ? '...' : ''}
                            </>
                          )}
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-1 text-xs">
                          {item.competences?.map((competence, i) => (
                            <span key={i} className="bg-gray-100 px-2 py-1 rounded-full">
                              {competence}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="px-4 pb-4 pt-2 flex justify-end">
                      <a 
                        href={`/observations/${item.id.replace('-reflection', '')}`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                      >
                        Vaata
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">Sa pole veel tagasisidet ega refleksioone lisanud</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ObservationTabs;
