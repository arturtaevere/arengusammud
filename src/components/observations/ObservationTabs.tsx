
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
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
    <div className="mb-8">
      {activeTab === "observations" ? (
        <ObservationsList observations={observations} />
      ) : (
        <FeedbackList feedbacks={feedbacks} />
      )}
    </div>
  );
};

export default ObservationTabs;
