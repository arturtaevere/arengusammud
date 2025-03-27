
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ObservationsHeaderProps {
  onNewObservation: () => void;
  onGenerateSampleData: () => void;
  isLoading: boolean;
}

const ObservationsHeader = ({ 
  onNewObservation, 
  onGenerateSampleData, 
  isLoading 
}: ObservationsHeaderProps) => {
  return (
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
  );
};

export default ObservationsHeader;
