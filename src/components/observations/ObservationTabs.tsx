
import React from 'react';
import ObservationsList from './ObservationsList';
import { Observation, Feedback } from './types';

interface ObservationTabsProps {
  observations: Observation[];
  feedbacks: Feedback[];
  onFeedbackGiven: (id: string) => void;
}

const ObservationTabs = ({ observations, onFeedbackGiven }: ObservationTabsProps) => {
  return (
    <div className="mb-8">
      <ObservationsList 
        observations={observations} 
        onFeedbackGiven={onFeedbackGiven} 
      />
    </div>
  );
};

export default ObservationTabs;
