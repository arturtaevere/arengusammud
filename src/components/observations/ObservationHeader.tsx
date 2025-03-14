
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ObservationHeaderProps {
  onNewObservation: () => void;
}

const ObservationHeader = ({ onNewObservation }: ObservationHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold">Vaatlused ja tagasiside</h2>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Button onClick={onNewObservation}>
          <Plus className="mr-2 h-4 w-4" />
          Uus vaatlus
        </Button>
      </div>
    </div>
  );
};

export default ObservationHeader;

