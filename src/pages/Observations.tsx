
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Check, ClipboardCheck, MessageSquare } from 'lucide-react';
import ObservationForm from '@/components/ObservationForm';
import { useToast } from '@/hooks/use-toast';
import ObservationHeader from '@/components/observations/ObservationHeader';
import ObservationTabs from '@/components/observations/ObservationTabs';

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
      variant: "default",
    });
    setShowForm(false);
  };

  // Add toggle buttons for switching between observations and feedback
  const handleToggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        <ObservationHeader onNewObservation={handleNewObservation} />

        {!showForm && (
          <div className="flex gap-4 mb-4">
            <Button 
              variant={activeTab === "observations" ? "default" : "outline"} 
              onClick={() => handleToggleTab("observations")}
              className="mb-2"
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Vaatlused
            </Button>
            <Button 
              variant={activeTab === "feedback" ? "default" : "outline"} 
              onClick={() => handleToggleTab("feedback")}
              className="mb-2"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Tagasiside
            </Button>
          </div>
        )}

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
          <ObservationTabs 
            observations={observations} 
            feedbacks={feedbacks} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        )}
      </div>
    </div>
  );
};

export default Observations;
