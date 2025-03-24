
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ObservationTabs from '@/components/observations/ObservationTabs';
import { Observation } from '@/components/observations/types';

interface ObservationsListViewProps {
  isLoading: boolean;
  observations: Observation[];
  user: any;
  onNewObservation: () => void;
  onFeedbackGiven: (id: string) => void;
  onGenerateSampleData: () => void;
}

const ObservationsListView = ({
  isLoading,
  observations,
  user,
  onNewObservation,
  onFeedbackGiven,
  onGenerateSampleData
}: ObservationsListViewProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Õpipartnerlus</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={onNewObservation}>
            <Plus className="mr-2 h-4 w-4" />
            Uus vaatlus
          </Button>
          <Button 
            variant="outline" 
            onClick={onGenerateSampleData}
            disabled={isLoading}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isLoading ? "Laadimine..." : "Lisa näidisvaatlused"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Vaatluste laadimine...</p>
        </div>
      ) : user ? (
        observations.length > 0 ? (
          <ObservationTabs 
            observations={observations} 
            onFeedbackGiven={onFeedbackGiven} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-4">Sul pole veel vaatlusi läbi viidud</p>
            <Button onClick={onNewObservation}>
              <Plus className="mr-2 h-4 w-4" />
              Lisa oma esimene vaatlus
            </Button>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Vaatluste nägemiseks pead olema sisse logitud</p>
        </div>
      )}
    </>
  );
};

export default ObservationsListView;
