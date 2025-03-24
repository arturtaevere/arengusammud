
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';
import GeneralInfoSection from './observation/GeneralInfoSection';
import ObservationNotesSection from './observation/ObservationNotesSection';
import { useObservationForm } from './observation/useObservationForm';
import { mockTeachers } from './observation/mockTeachers';

const ObservationForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { form, isSubmitting, onSubmit } = useObservationForm();
  const [teachersInSchool, setTeachersInSchool] = useState<Array<{ id: string, name: string, developmentGoal: string, actionStep?: string }>>([]);
  
  // Get teachers for the user's school
  useEffect(() => {
    if (user?.school) {
      console.log('User school:', user.school);
      console.log('Available schools in mockTeachers:', Object.keys(mockTeachers));
      
      if (mockTeachers[user.school as keyof typeof mockTeachers]) {
        console.log('Found teachers for school:', mockTeachers[user.school as keyof typeof mockTeachers]);
        setTeachersInSchool(mockTeachers[user.school as keyof typeof mockTeachers]);
      } else {
        console.log('No teachers found for this school');
        // If no specific teachers for this school, provide a default set
        setTeachersInSchool(mockTeachers['Arengusammud']);
      }
    } else {
      console.log('No school set for user, using default teachers');
      // Default to Arengusammud if no school is set
      setTeachersInSchool(mockTeachers['Arengusammud']);
    }
  }, [user]);
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => navigate('/observations')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tagasi
        </Button>
        <h1 className="text-2xl font-semibold">Uus tunnivaatlus</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <GeneralInfoSection form={form} teachersInSchool={teachersInSchool} />
          <ObservationNotesSection form={form} isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default ObservationForm;
