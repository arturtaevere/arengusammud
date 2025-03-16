
import Navbar from '@/components/Navbar';
import { useObservationDetail } from '@/hooks/useObservationDetail';
import ObservationDetailHeader from '@/components/observation-detail/ObservationDetailHeader';
import GeneralInfoCard from '@/components/observation-detail/GeneralInfoCard';
import ObservationNotesCard from '@/components/observation-detail/ObservationNotesCard';
import FeedbackCard from '@/components/observation-detail/FeedbackCard';
import FeedbackActions from '@/components/observation-detail/FeedbackActions';
import TeacherReflectionCard from '@/components/observation-detail/TeacherReflectionCard';
import { Button } from '@/components/ui/button';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto pt-24 pb-12 px-4">
          <div className="text-center">Laadin...</div>
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
            <Button onClick={() => navigate('/observations')}>Tagasi vaatluste juurde</Button>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(observation.date).toLocaleDateString('et-EE');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4 max-w-4xl">
        <ObservationDetailHeader 
          canEdit={canEdit} 
          isEditing={isEditing}
          toggleEdit={toggleEdit}
          saveChanges={saveChanges}
        />

        <div className="space-y-6">
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
