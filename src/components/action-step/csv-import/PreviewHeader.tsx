
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PreviewHeaderProps {
  totalEntries: number;
  shownEntries: number;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ totalEntries, shownEntries }) => {
  const showingMoreMessage = totalEntries > shownEntries 
    ? `Näidatakse ${shownEntries} kirjet ${totalEntries} kirjest` 
    : '';
  
  return (
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Andmete eelvaade</CardTitle>
      {showingMoreMessage && (
        <CardDescription>{showingMoreMessage}</CardDescription>
      )}
    </CardHeader>
  );
};

export default PreviewHeader;
