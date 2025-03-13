
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Users
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Mock data
  const stats = {
    actionStepsAssigned: 12,
    actionStepsCompleted: 7,
    observationsCount: 8,
    feedbackCount: 15
  };
  
  const recentObservations = [
    { id: '1', teacher: 'Jane Smith', date: '2023-05-15', subject: 'Mathematics' },
    { id: '2', teacher: 'Alex Johnson', date: '2023-05-10', subject: 'Science' },
    { id: '3', teacher: 'Maria Garcia', date: '2023-05-05', subject: 'English' },
  ];
  
  const upcomingActionSteps = [
    { id: '1', title: 'Implement Think-Pair-Share', dueDate: '2023-05-20', category: 'Student Engagement' },
    { id: '2', title: 'Use Exit Tickets for Assessment', dueDate: '2023-05-22', category: 'Assessment' },
    { id: '3', title: 'Differentiate Instruction', dueDate: '2023-05-25', category: 'Differentiation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your coaching activities and progress.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                Action Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.actionStepsAssigned}</p>
                  <p className="text-sm text-muted-foreground">Assigned</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-500">{stats.actionStepsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
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
                Observations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.observationsCount}</p>
              <p className="text-sm text-muted-foreground">Total conducted</p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/observations/new')}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Observation
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.feedbackCount}</p>
              <p className="text-sm text-muted-foreground">Pieces of feedback</p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/feedback/new')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Give Feedback
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
              <p className="text-sm text-muted-foreground">Overall improvement</p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/progress')}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Observations */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Observations</CardTitle>
                  <CardDescription>Your latest lesson observations</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/observations')}
                >
                  View All
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
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No observations recorded yet</p>
                  <Button onClick={() => navigate('/observations/new')}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Observation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Upcoming Action Steps */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Upcoming Action Steps</CardTitle>
                  <CardDescription>Next steps to implement</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/action-steps')}
                >
                  View All
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
                          Due: {step.dueDate}
                        </div>
                        <div className="flex mt-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-500 text-xs"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Mark Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No upcoming action steps</p>
                  <Button onClick={() => navigate('/action-steps')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Browse Action Steps
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Things you can do right now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center text-center"
                onClick={() => navigate('/observations/new')}
              >
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">Conduct Observation</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center text-center"
                onClick={() => navigate('/feedback/new')}
              >
                <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">Provide Feedback</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center text-center"
                onClick={() => navigate('/action-steps')}
              >
                <ClipboardList className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">Browse Action Steps</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center text-center"
                onClick={() => navigate('/teachers')}
              >
                <Users className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">Manage Teachers</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
