
import Navbar from '@/components/Navbar';
import { useObservationDetail } from '@/hooks/useObservationDetail';
import ObservationDetailHeader from '@/components/observation-detail/ObservationDetailHeader';
import GeneralInfoCard from '@/components/observation-detail/GeneralInfoCard';
import ObservationNotesCard from '@/components/observation-detail/ObservationNotesCard';
import FeedbackCard from '@/components/observation-detail/FeedbackCard';
import FeedbackActions from '@/components/observation-detail/FeedbackActions';
import TeacherReflectionCard from '@/components/observation-detail/TeacherReflectionCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ObservationDetail = () => {
  const {
    observation,
    setObservation,
    loading,
    isObserved,
    feedbackProvided,
    isEditing,
    editedObservation,
    handleFeedbackProvided,
    toggleEdit,
    handleInputChange,
    saveChanges,
    canSeeFeedback,
    canEdit,
    navigate
  } = useObservationDetail();

  console.log("ObservationDetail rendering:", { 
    isObserved, 
    feedbackProvided, 
    observationId: observation?.id,
    hasFeedback: observation?.hasFeedback
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto pt-24 pb-12 px-4">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-pulse text-primary font-medium">Laadimine...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!observation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto pt-24 pb-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Vaatlust ei leitud</h2>
            <Button onClick={() => navigate('/observations')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tagasi vaatluste juurde
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(observation.date).toLocaleDateString('et-EE');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-20 pb-12 px-4 max-w-4xl fade-in">
        {/* Removing this duplicate back button */}
        
        <ObservationDetailHeader 
          canEdit={canEdit} 
          isEditing={isEditing}
          toggleEdit={toggleEdit}
          saveChanges={saveChanges}
          navigate={navigate}
        />

        <div className="space-y-6 mt-6">
          {/* General Information */}
          <GeneralInfoCard 
            observation={observation}
            isEditing={isEditing}
            editedObservation={editedObservation}
            handleInputChange={handleInputChange}
            formattedDate={formattedDate}
          />

          {/* Observation Notes */}
          <ObservationNotesCard 
            observation={observation}
            isEditing={isEditing}
            editedObservation={editedObservation}
            handleInputChange={handleInputChange}
          />

          {/* Feedback */}
          <FeedbackCard 
            observation={observation}
            isEditing={isEditing}
            editedObservation={editedObservation}
            handleInputChange={handleInputChange}
            canSeeFeedback={canSeeFeedback}
          />
          
          {/* Teacher Reflection */}
          {observation.teacherReflection && (
            <TeacherReflectionCard 
              observation={observation}
              isObserved={isObserved}
            />
          )}
          
          {/* Feedback Actions */}
          <FeedbackActions 
            isObserved={isObserved}
            feedbackProvided={feedbackProvided}
            handleFeedbackProvided={handleFeedbackProvided}
            observation={observation}
            setObservation={setObservation}
          />
        </div>
      </div>
    </div>
  );
};

export default ObservationDetail;
