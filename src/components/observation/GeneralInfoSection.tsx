
import { useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, Calendar, Target, ClipboardList, UserPlus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';
import { useAuth } from '@/context/AuthContext';
import { getTeacherDevelopmentGoal, getTeacherActionStep } from './mockTeachers';

interface GeneralInfoSectionProps {
  form: UseFormReturn<ObservationFormValues>;
  teachersInSchool: { id: string, name: string, developmentGoal?: string, actionStep?: string }[];
}

const GeneralInfoSection = ({ form, teachersInSchool }: GeneralInfoSectionProps) => {
  const { user } = useAuth();
  
  // Update development goal and action step when teacher changes
  useEffect(() => {
    const teacherName = form.watch('teacherName');
    if (teacherName) {
      const developmentGoal = getTeacherDevelopmentGoal(teacherName);
      const actionStep = getTeacherActionStep(teacherName);
      
      form.setValue('developmentGoal', developmentGoal);
      form.setValue('actionStep', actionStep);
    }
  }, [form.watch('teacherName')]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Üldandmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="teacherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Õpetaja nimi
                  </span>
                </FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    // Update development goal and action step when teacher changes
                    const developmentGoal = getTeacherDevelopmentGoal(value);
                    const actionStep = getTeacherActionStep(value);
                    form.setValue('developmentGoal', developmentGoal);
                    form.setValue('actionStep', actionStep);
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Vali õpetaja" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teachersInSchool && teachersInSchool.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.name}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Vaatluse kuupäev
                  </span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="coachName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Õpipartneri nimi
                </span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Sisesta õpipartneri nimi" 
                  {...field}
                  defaultValue={user?.name || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="developmentGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Õpetaja arengueesmärk
                </span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Õpetaja pikaajaline arengueesmärk..." 
                  className="min-h-[100px] bg-gray-50"
                  {...field}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="actionStep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Õpetaja arengusamm
                </span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Õpetaja ja õpipartneri valitud eelmine arengusamm..." 
                  className="min-h-[100px] bg-gray-50"
                  {...field}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default GeneralInfoSection;
