
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Save } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';

interface ObservationDetailHeaderProps {
  canEdit: boolean;
  isEditing: boolean;
  toggleEdit: () => void;
  saveChanges: () => void;
  navigate: NavigateFunction;
}

const ObservationDetailHeader = ({ 
  canEdit, 
  isEditing, 
  toggleEdit, 
  saveChanges,
  navigate
}: ObservationDetailHeaderProps) => {
  return (
    <div className="flex items-center mb-6 justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => navigate('/observations')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tagasi
        </Button>
        <h1 className="text-2xl font-semibold">Tunnivaatlus</h1>
      </div>
      
      {canEdit && !isEditing && (
        <Button onClick={toggleEdit} variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Muuda
        </Button>
      )}
      
      {isEditing && (
        <Button onClick={saveChanges} variant="default" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Salvesta
        </Button>
      )}
    </div>
  );
};

export default ObservationDetailHeader;
