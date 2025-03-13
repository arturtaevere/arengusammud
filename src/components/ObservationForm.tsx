
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, User, Calendar, Target, ClipboardList, MessageSquare, ThumbsUp, Lightbulb, ArrowRight } from 'lucide-react';

// Form validation schema
const observationFormSchema = z.object({
  teacherName: z.string().min(2, { message: "Õpetaja nimi on kohustuslik" }),
  date: z.string().min(1, { message: "Kuupäev on kohustuslik" }),
  developmentGoal: z.string().min(10, { message: "Arengueesmärk peab olema vähemalt 10 tähemärki" }),
  actionStep: z.string().min(10, { message: "Arengusamm peab olema vähemalt 10 tähemärki" }),
  teacherNotes: z.string().min(10, { message: "Õpetaja tegevuse märkmed peavad olema vähemalt 10 tähemärki" }),
  studentNotes: z.string().min(10, { message: "Õpilaste tegevuse märkmed peavad olema vähemalt 10 tähemärki" }),
  specificPraise: z.string().min(10, { message: "Kiitus peab olema vähemalt 10 tähemärki" }),
  improvementAreas: z.string().min(10, { message: "Parendusettepanekud peavad olema vähemalt 10 tähemärki" }),
  nextActionStep: z.string().min(10, { message: "Järgmine arengusamm peab olema vähemalt 10 tähemärki" }),
});

type ObservationFormValues = z.infer<typeof observationFormSchema>;

// Mock data for teachers
const mockTeachers = {
  'Arengusammud': [
    { id: 't1', name: 'Mari Maasikas' },
    { id: 't2', name: 'Jaan Kask' },
    { id: 't3', name: 'Anna Lepp' },
    { id: 't4', name: 'Peeter Kuusk' },
  ],
  'Järveküla Kool': [
    { id: 't5', name: 'Tiina Tamm' },
    { id: 't6', name: 'Mart Metsa' },
    { id: 't7', name: 'Kati Karu' },
  ],
  'Kilingi-Nõmme Gümnaasium': [
    { id: 't8', name: 'Siim Siil' },
    { id: 't9', name: 'Liisa Lill' },
    { id: 't10', name: 'Tõnu Tõru' },
  ]
};

// Function to get last observed teacher from localStorage
const getLastObservedTeacher = (): string | null => {
  return localStorage.getItem('lastObservedTeacher');
};

// Function to save observed teacher to localStorage
const saveLastObservedTeacher = (teacherName: string): void => {
  localStorage.setItem('lastObservedTeacher', teacherName);
};

const ObservationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teachersInSchool, setTeachersInSchool] = useState<{ id: string, name: string }[]>([]);
  
  // Get teachers for the user's school
  useEffect(() => {
    if (user?.school && mockTeachers[user.school as keyof typeof mockTeachers]) {
      setTeachersInSchool(mockTeachers[user.school as keyof typeof mockTeachers]);
    }
  }, [user]);
  
  // Default values for the form
  const lastTeacher = getLastObservedTeacher();
  const defaultValues: Partial<ObservationFormValues> = {
    date: new Date().toISOString().split('T')[0],
    teacherName: lastTeacher || "",
  };
  
  // Form setup
  const form = useForm<ObservationFormValues>({
    resolver: zodResolver(observationFormSchema),
    defaultValues,
  });
  
  // Form submission handler
  const onSubmit = async (data: ObservationFormValues) => {
    setIsSubmitting(true);
    
    // Save the selected teacher for next time
    saveLastObservedTeacher(data.teacherName);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Observation data:', data);
    
    toast({
      title: "Vaatlus salvestatud",
      description: "Tunnivaatlus on edukalt salvestatud.",
    });
    
    setIsSubmitting(false);
    navigate('/observations');
  };
  
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
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Kirjeldage õpetaja pikaajalist arengueesmärki
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
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Kirjeldage arengusammu, mille õpetaja ja juhendaja on eelnevalt valinud
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tunnivaatluse märkmed</CardTitle>
              <CardDescription>
                Dokumenteerige tunni jooksul märgatud tegevused
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="teacherNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Tunnivaatluse märkmed: mida õpetaja tegi
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Kirjeldage õpetaja tegevusi tunni jooksul..." 
                          className="min-h-[200px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="studentNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Tunnivaatluse märkmed: mida õpilased tegid
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Kirjeldage õpilaste tegevusi tunni jooksul..." 
                          className="min-h-[200px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator className="my-6" />
              
              <FormField
                control={form.control}
                name="specificPraise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Konkreetne kiitus
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Millega sai õpetaja hästi hakkama..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Tooge välja konkreetsed näited õpetaja tugevustest
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="improvementAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Mida saaks veel paremini teha
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Millised on arenemisvõimalused..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Kirjeldage konstruktiivselt, mida saaks paremini teha
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nextActionStep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Järgmine võimalik arengusamm
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Milline võiks olla järgmine arengusamm..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Pakkuge välja konkreetne järgmine arengusamm õpetajale
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/observations')}
              >
                Tühista
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Salvestamine..." : "Salvesta vaatlus"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ObservationForm;
