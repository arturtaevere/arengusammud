import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { 
  ClipboardList, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  Plus,
  CheckCircle,
  Clock,
  Users,
  CheckSquare,
  Target,
  GraduationCap,
  Book,
  Layers,
  Activity,
  ClipboardCheck,
  Lightbulb
} from 'lucide-react';

const competences = [
  {
    id: '1',
    title: 'Hooliva ja arengut toetava õpikeskkonna loomine',
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    id: '2',
    title: 'Kindlate ja harjumuspäraste tegevuste korraldamine klassis',
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: '3',
    title: 'Tundide ja õppimise kavandamine õpieesmärkidest lähtuvalt',
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: '4',
    title: 'Kaasamõtlemise ja pingutamise soodustamine',
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    id: '5',
    title: 'Iseseisva töö kavandamine',
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
  {
    id: '6',
    title: 'Õppesisu meeldejääv edasiandmine õpilastele',
    icon: <Book className="h-5 w-5" />,
  },
  {
    id: '7',
    title: 'Andmete kogumine õppematerjali omandamise kohta',
    icon: <Activity className="h-5 w-5" />,
  },
  {
    id: '8',
    title: 'Tagasiside andmine õpilastele',
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    id: '9',
    title: 'Õpilaste kaasamine hindamisprotsessi',
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: '10',
    title: 'Ennastjuhtiva õppija toetamine',
    icon: <GraduationCap className="h-5 w-5" />,
  },
];

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const stats = {
    actionStepsAssigned: 12,
    actionStepsCompleted: 7,
    observationsCount: 8,
    feedbackCount: 15
  };
  
  const recentObservations = [
    { id: '1', teacher: 'Jane Smith', date: '2023-05-15', subject: 'Matemaatika' },
    { id: '2', teacher: 'Alex Johnson', date: '2023-05-10', subject: 'Loodusõpetus' },
    { id: '3', teacher: 'Maria Garcia', date: '2023-05-05', subject: 'Eesti keel' },
  ];
  
  const upcomingActionSteps = [
    { id: '1', title: 'Rakenda mõtle-paarilisega-jaga meetodit', dueDate: '2023-05-20', category: 'Õpilaste kaasamine' },
    { id: '2', title: 'Kasuta väljumispileteid hindamiseks', dueDate: '2023-05-22', category: 'Hindamine' },
    { id: '3', title: 'Diferentseeri õpetamist', dueDate: '2023-05-25', category: 'Diferentseerimine' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tere tulemast tagasi, {user?.name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground">
            Siin on ülevaade sinu juhendamistegevustest ja progressist.
          </p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Õpieesmärgid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {competences.map((competence) => (
              <Link key={competence.id} to={`/action-steps?category=${competence.id}`}>
                <Card className="h-full hover:shadow-md transition-all border-l-4 border-l-primary">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-3 bg-primary/10 p-2 rounded-md">
                      {competence.icon}
                    </div>
                    <p className="font-medium text-sm line-clamp-2">{competence.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <h2 className="text-2xl font-bold mt-6 text-center">Töölaud</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                Arengusammud
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.actionStepsAssigned}</p>
                  <p className="text-sm text-muted-foreground">Määratud</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-500">{stats.actionStepsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Lõpetatud</p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full">
                <div 
                  className="h-2 bg-primary rounded-full" 
                  style={{ width: `${(stats.actionStepsCompleted / stats.actionStepsAssigned) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Vaatlused
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.observationsCount}</p>
              <p className="text-sm text-muted-foreground">Kokku läbi viidud</p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/observations/new')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Uus vaatlus
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Tagasiside
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.feedbackCount}</p>
              <p className="text-sm text-muted-foreground">Tagasiside ühikud</p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/feedback/new')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Anna tagasisidet
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold">58%</p>
                <p className="text-sm text-green-500 mb-1">+12%</p>
              </div>
              <p className="text-sm text-muted-foreground">Üldine paranemine</p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/progress')}>
                  Vaata detaile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Hiljutised vaatlused</CardTitle>
                  <CardDescription>Sinu viimased tunnivaatlused</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/observations')}
                >
                  Vaata kõiki
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentObservations.length > 0 ? (
                <div className="space-y-4">
                  {recentObservations.map((observation) => (
                    <div 
                      key={observation.id}
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="rounded-full bg-primary/10 p-2 mr-4">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{observation.teacher}</h4>
                        <p className="text-sm text-muted-foreground">{observation.subject}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {observation.date}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary text-xs"
                          onClick={() => navigate(`/observations/${observation.id}`)}
                        >
                          Vaata detaile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Ühtegi vaatlust pole veel salvestatud</p>
                  <Button onClick={() => navigate('/observations/new')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Uus vaatlus
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tulevased arengusammud</CardTitle>
                  <CardDescription>Järgmised rakendatavad sammud</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/action-steps')}
                >
                  Vaata kõiki
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingActionSteps.length > 0 ? (
                <div className="space-y-4">
                  {upcomingActionSteps.map((step) => (
                    <div 
                      key={step.id}
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="rounded-full bg-primary/10 p-2 mr-4">
                        <ClipboardList className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-1">
                            {step.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm flex items-center text-amber-500">
                          <Clock className="h-3 w-3 mr-1" />
                          Tähtaeg: {step.dueDate}
                        </div>
                        <div className="flex mt-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-500 text-xs"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Märgi lõpetatuks
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Pole ühtegi tulevast arengusammu</p>
                  <Button onClick={() => navigate('/action-steps')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Sirvi arengusamme
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Kiired tegevused</CardTitle>
            <CardDescription>Tegevused, mida saad kohe teha</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center text-center"
                onClick={() => navigate('/observations/new')}
              >
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">Vii läbi vaatlus</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center text-center"
                onClick={() => navigate('/feedback/new')}
              >
                <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">Anna tagasisidet</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center text-center"
                onClick={() => navigate('/competences')}
              >
                <ClipboardList className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">Sirvi pädevusi</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center text-center"
                onClick={() => navigate('/teachers')}
              >
                <Users className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">Halda õpetajaid</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
