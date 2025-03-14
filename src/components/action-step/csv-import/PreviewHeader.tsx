
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PreviewHeaderProps {
  totalEntries: number;
  shownEntries: number;
  showAll?: boolean;
  onToggleShowAll?: () => void;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ 
  totalEntries, 
  shownEntries, 
  showAll = false, 
  onToggleShowAll 
}) => {
  const showingMoreMessage = totalEntries > shownEntries && !showAll
    ? `Näidatakse ${shownEntries} kirjet ${totalEntries} kirjest` 
    : '';
  
  return (
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="text-lg">Andmete eelvaade</CardTitle>
          {showingMoreMessage && (
            <CardDescription>{showingMoreMessage}</CardDescription>
          )}
          {showAll && (
            <CardDescription>Näidatakse kõik {totalEntries} kirjet</CardDescription>
          )}
        </div>
        
        {totalEntries > shownEntries && onToggleShowAll && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onToggleShowAll}
          >
            {showAll ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Näita vähem
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Näita kõiki
              </>
            )}
          </Button>
        )}
      </div>
    </CardHeader>
  );
};

export default PreviewHeader;
