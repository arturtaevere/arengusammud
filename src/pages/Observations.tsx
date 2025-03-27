
import React from 'react';
import Navbar from '@/components/Navbar';
import ObservationsHeader from '@/components/observations/ObservationsHeader';
import ObservationsContent from '@/components/observations/ObservationsContent';
import { useObservationsPage } from '@/components/observations/hooks/useObservationsPage';

const Observations = () => {
  const {
    showForm,
    observations,
    isLoading,
    activeTab,
    handleNewObservation,
    handleSubmitForm,
    handleFeedbackGiven,
    handleGenerateSampleData
  } = useObservationsPage();

  return (
    <div className="min-h-screen bg-orange-light/10">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        {!showForm && (
          <ObservationsHeader
            onNewObservation={handleNewObservation}
            onGenerateSampleData={handleGenerateSampleData}
            isLoading={isLoading}
          />
        )}

        <ObservationsContent
          showForm={showForm}
          observations={observations}
          isLoading={isLoading}
          activeTab={activeTab}
          onFormSubmit={handleSubmitForm}
          onFeedbackGiven={handleFeedbackGiven}
        />
      </div>
    </div>
  );
};

export default Observations;
