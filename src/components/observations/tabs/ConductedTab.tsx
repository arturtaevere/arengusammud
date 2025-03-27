
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import TeacherFeedbackList from '../TeacherFeedbackList';
import { CombinedFeedbackItem } from '../types';

interface ConductedTabProps {
  items: CombinedFeedbackItem[];
}

const ConductedTab = ({ items }: ConductedTabProps) => {
  return (
    <TabsContent value="conducted" className="mt-0">
      <TeacherFeedbackList 
        items={items} 
        title="Tagasiside ja vaatlused, mille mina olen läbi viinud"
        emptyMessage="Sa pole veel ühtegi vaatlust läbi viinud"
      />
    </TabsContent>
  );
};

export default ConductedTab;
