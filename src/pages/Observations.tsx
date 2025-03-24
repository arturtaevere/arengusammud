
import React from 'react';
import Navbar from '@/components/Navbar';
import { useObservations } from '@/hooks/useObservations';
import ObservationsListView from '@/components/observations/ObservationsListView';
import ObservationFormContainer from '@/components/observations/ObservationFormContainer';

const Observations = () => {
  const {
    user,
    showForm,
    observations,
    isLoading,
    handleNewObservation,
    handleSubmitForm,
    handleFeedbackGiven,
    handleGenerateSampleData
  } = useObservations();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        {showForm ? (
          <ObservationFormContainer onSubmit={handleSubmitForm} />
        ) : (
          <ObservationsListView
            isLoading={isLoading}
            observations={observations}
            user={user}
            onNewObservation={handleNewObservation}
            onFeedbackGiven={handleFeedbackGiven}
            onGenerateSampleData={handleGenerateSampleData}
          />
        )}
      </div>
    </div>
  );
};

export default Observations;
