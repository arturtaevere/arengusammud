
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import TeacherFeedbackList from '../TeacherFeedbackList';
import { CombinedFeedbackItem } from '../types';

interface ReceivedTabProps {
  items: CombinedFeedbackItem[];
}

const ReceivedTab = ({ items }: ReceivedTabProps) => {
  return (
    <TabsContent value="received" className="mt-0">
      <TeacherFeedbackList 
        items={items}
        title="Tagasiside minule ja minu refleksioonid" 
        emptyMessage="Sa pole veel tagasisidet ega refleksioone lisanud"
      />
    </TabsContent>
  );
};

export default ReceivedTab;
