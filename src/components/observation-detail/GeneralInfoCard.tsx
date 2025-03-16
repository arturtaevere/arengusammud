
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Calendar, Target, ClipboardList, UserPlus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { StoredObservation } from '@/components/observation/storage';

interface GeneralInfoCardProps {
  observation: StoredObservation;
  isEditing: boolean;
  editedObservation: Partial<StoredObservation>;
  handleInputChange: (field: keyof StoredObservation, value: string) => void;
  formattedDate: string;
}

const GeneralInfoCard = ({
  observation,
  isEditing,
  editedObservation,
  handleInputChange,
  formattedDate
}: GeneralInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Üldandmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium flex items-center text-gray-500">
              <User className="h-4 w-4 mr-2" />
              Õpetaja nimi
            </h3>
            <p className="mt-1">{observation.teacher}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              Vaatluse kuupäev
            </h3>
            <p className="mt-1">{formattedDate}</p>
          </div>
        </div>
        
        {/* Coach Name */}
        <div>
          <h3 className="text-sm font-medium flex items-center text-gray-500">
            <UserPlus className="h-4 w-4 mr-2" />
            Õpipartneri nimi
          </h3>
          <p className="mt-1">{observation.coachName || 'Määramata'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium flex items-center text-gray-500">
            <Target className="h-4 w-4 mr-2" />
            Õpetaja arengueesmärk
          </h3>
          {isEditing ? (
            <Textarea
              value={editedObservation.developmentGoal || ''}
              onChange={(e) => handleInputChange('developmentGoal', e.target.value)}
              className="mt-1"
            />
          ) : (
            <p className="mt-1 whitespace-pre-wrap">{observation.developmentGoal}</p>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium flex items-center text-gray-500">
            <ClipboardList className="h-4 w-4 mr-2" />
            Õpetaja arengusamm
          </h3>
          {isEditing ? (
            <Textarea
              value={editedObservation.actionStep || ''}
              onChange={(e) => handleInputChange('actionStep', e.target.value)}
              className="mt-1"
            />
          ) : (
            <p className="mt-1 whitespace-pre-wrap">{observation.actionStep}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralInfoCard;
