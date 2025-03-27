
import React from 'react';
import ObservationTabs from './ObservationTabs';
import ObservationForm from '@/components/ObservationForm';
import { Observation } from './types';

interface ObservationsContentProps {
  showForm: boolean;
  observations: Observation[];
  isLoading: boolean;
  activeTab: string;
  onFormSubmit: () => void;
  onFeedbackGiven: (id: string) => void;
}

const ObservationsContent = ({
  showForm,
  observations,
  isLoading,
  activeTab,
  onFormSubmit,
  onFeedbackGiven
}: ObservationsContentProps) => {
  if (showForm) {
    return (
      <div className="mb-8">
        <ObservationForm onSubmit={onFormSubmit} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Vaatluste laadimine...</p>
      </div>
    );
  }

  return (
    <ObservationTabs 
      observations={observations} 
      onFeedbackGiven={onFeedbackGiven}
      activeTab={activeTab}
    />
  );
};

export default ObservationsContent;
