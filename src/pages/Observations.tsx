
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Plus, Filter, List, Grid, BookOpen, MessageSquare, ClipboardCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import ObservationForm from '@/components/ObservationForm';
import { useToast } from '@/hooks/use-toast';

const Observations = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('observations');
  const [showForm, setShowForm] = useState(false);
  
  const observations = [
    {
      id: 'obs1',
      teacher: 'Maria Tamm',
      subject: 'Matemaatika',
      date: '12.05.2023',
      status: 'Vaadeldud',
      hasFeedback: true,
      competences: ['Õpikeskkonna kujundamine', 'Digipädevuste arendamine']
    },
    {
      id: 'obs2',
      teacher: 'Jaan Kask',
      subject: 'Eesti keel',
      date: '15.05.2023',
      status: 'Tagasiside ootel',
      hasFeedback: false,
      competences: ['Eneseanalüüs', 'Koostöö']
    },
    {
      id: 'obs3',
      teacher: 'Anna Lepp',
      subject: 'Loodusõpetus',
      date: '18.05.2023',
      status: 'Lõpetatud',
      hasFeedback: true,
      competences: ['Õppimist toetav hindamine', 'Kaasav haridus']
    },
    {
      id: 'obs4',
      teacher: 'Peeter Kuusk',
      subject: 'Ajalugu',
      date: '20.05.2023',
      status: 'Vaadeldud',
      hasFeedback: false,
      competences: ['Eneseanalüüs', 'Õpikeskkonna kujundamine']
    }
  ];

  const feedbacks = [
    {
      id: 'feed1',
      teacher: 'Jaan Kask',
      subject: 'Eesti keel',
      date: '16.05.2023',
      type: 'Kiitus',
      preview: 'Suurepärane õpilaste kaasamine aruteludesse...'
    },
    {
      id: 'feed2',
      teacher: 'Maria Tamm',
      subject: 'Matemaatika',
      date: '13.05.2023',
      type: 'Soovitus',
      preview: 'Soovitan proovida rohkem rühmatöid...'
    },
    {
      id: 'feed3',
      teacher: 'Anna Lepp',
      subject: 'Loodusõpetus',
      date: '19.05.2023',
      type: 'Küsimus',
      preview: 'Kuidas plaanid edaspidi diferentseerida ülesandeid?'
    }
  ];

  const handleNewObservation = () => {
    setActiveTab('observations');
    setShowForm(true);
  };

  const handleFeedbackProvided = () => {
    toast({
      title: "Tagasiside antud",
      description: "Õpetajale on saadetud tagasiside",
      variant: "success",
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Vaatlused ja tagasiside</h2>
            <p className="text-gray-600 mt-1">Õppetöö vaatlused ja tagasiside</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button onClick={handleNewObservation}>
              <Plus className="mr-2 h-4 w-4" />
              Uus vaatlus
            </Button>
            <Link to="/feedback/new">
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Anna tagasisidet
              </Button>
            </Link>
          </div>
        </div>

        {showForm ? (
          <div className="mb-8">
            <ObservationForm />
            <div className="flex justify-end mt-4">
              <Button onClick={handleFeedbackProvided} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Tagasiside antud
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="observations">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Vaatlused
              </TabsTrigger>
              <TabsTrigger value="feedback">
                <MessageSquare className="mr-2 h-4 w-4" />
                Tagasiside
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="observations">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtreeri
                  </Button>
                  <div className="border rounded-md flex divide-x">
                    <Button variant="ghost" size="sm" className="rounded-r-none">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-l-none">
                      <Grid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Kokku: {observations.length} vaatlust
                </div>
              </div>
              
              <div className="grid gap-4">
                {observations.map((observation) => (
                  <Card key={observation.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{observation.teacher}</CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          observation.status === 'Lõpetatud' 
                            ? 'bg-green-100 text-green-800' 
                            : observation.status === 'Vaadeldud' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-orange-100 text-orange-800'
                        }`}>
                          {observation.status}
                        </span>
                      </div>
                      <CardDescription>{observation.subject} • {observation.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1 text-xs">
                        {observation.competences.map((competence, i) => (
                          <span key={i} className="bg-gray-100 px-2 py-1 rounded-full">
                            {competence}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center text-xs text-gray-500">
                          {observation.hasFeedback ? (
                            <span className="flex items-center text-green-600">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              Tagasiside antud
                            </span>
                          ) : (
                            <span className="flex items-center text-gray-500">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              Tagasiside puudub
                            </span>
                          )}
                        </div>
                        <Link to={`/observations/${observation.id}`}>
                          <Button variant="outline" size="sm">Vaata</Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="feedback">
              <div className="grid gap-4">
                {feedbacks.map((feedback) => (
                  <Card key={feedback.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{feedback.teacher}</CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          feedback.type === 'Kiitus'
                            ? 'bg-green-100 text-green-800'
                            : feedback.type === 'Soovitus'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                        }`}>
                          {feedback.type}
                        </span>
                      </div>
                      <CardDescription>{feedback.subject} • {feedback.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{feedback.preview}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-end w-full">
                        <Link to={`/feedback/${feedback.id}`}>
                          <Button variant="outline" size="sm">Vaata</Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Observations;
