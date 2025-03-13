
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, Calendar, Target, ClipboardList } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ObservationFormValues } from './types';

interface GeneralInfoSectionProps {
  form: UseFormReturn<ObservationFormValues>;
  teachersInSchool: { id: string, name: string, developmentGoal?: string, actionStep?: string }[];
}

const GeneralInfoSection = ({ form, teachersInSchool }: GeneralInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Üldandmed</CardTitle>
        <CardDescription>
          Tunnivaatluse põhiandmed
        </CardDescription>
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
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Vali õpetaja" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teachersInSchool.map(teacher => (
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
              <FormDescription>
                Õpetaja pikaajaline arengueesmärk täidetakse automaatselt vastavalt valitud õpetajale
              </FormDescription>
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
                  placeholder="Õpetaja ja juhendaja valitud arengusamm..." 
                  className="min-h-[100px] bg-gray-50"
                  {...field}
                  readOnly
                />
              </FormControl>
              <FormDescription>
                Arengusamm, mille õpetaja ja juhendaja on eelnevalt valinud, täidetakse automaatselt
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default GeneralInfoSection;
