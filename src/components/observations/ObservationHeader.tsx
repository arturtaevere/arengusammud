
import React from 'react';

interface ObservationHeaderProps {
  onNewObservation: () => void;
}

const ObservationHeader = ({ onNewObservation }: ObservationHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Õpipartnerlus</h1>
      </div>
    </div>
  );
};

export default ObservationHeader;
