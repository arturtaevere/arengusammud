
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Observation } from './types';
import TabsHeader from './tabs/TabsHeader';
import ConductedTab from './tabs/ConductedTab';
import ReceivedTab from './tabs/ReceivedTab';
import { useObservationItems } from './hooks/useObservationItems';

interface ObservationTabsProps {
  observations: Observation[];
  onFeedbackGiven: (id: string) => void;
  activeTab?: string;
}

const ObservationTabs = ({ 
  observations, 
  onFeedbackGiven, 
  activeTab = 'received' 
}: ObservationTabsProps) => {
  const { 
    teacherCombinedItems,
    coachCombinedItems
  } = useObservationItems(observations);

  return (
    <Card className="p-4">
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsHeader />
        <ConductedTab items={coachCombinedItems} />
        <ReceivedTab items={teacherCombinedItems} />
      </Tabs>
    </Card>
  );
};

export default ObservationTabs;
