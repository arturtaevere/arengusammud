
import React from 'react';
import ObservationForm from '@/components/ObservationForm';

interface ObservationFormContainerProps {
  onSubmit: () => void;
}

const ObservationFormContainer = ({ onSubmit }: ObservationFormContainerProps) => {
  return (
    <div className="mb-8">
      <ObservationForm onSubmit={onSubmit} />
    </div>
  );
};

export default ObservationFormContainer;
