
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardCheck, MessageSquare } from 'lucide-react';
import ObservationsList from './ObservationsList';
import FeedbackList from './FeedbackList';

interface Observation {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  status: string;
  hasFeedback: boolean;
  competences: string[];
}

interface Feedback {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  type: string;
  preview: string;
}

interface ObservationTabsProps {
  observations: Observation[];
  feedbacks: Feedback[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ObservationTabs = ({ observations, feedbacks, activeTab, onTabChange }: ObservationTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-8">
      <TabsList className="mb-6">
        <TabsTrigger value="observations">
          <ClipboardCheck className="mr-2 h-4 w-4" />
          Vaatlused
        </TabsTrigger>
        <TabsTrigger value="feedback">
          <MessageSquare className="mr-2 h-4 w-4" />
          Tagasiside
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="observations">
        <ObservationsList observations={observations} />
      </TabsContent>
      
      <TabsContent value="feedback">
        <FeedbackList feedbacks={feedbacks} />
      </TabsContent>
    </Tabs>
  );
};

export default ObservationTabs;
