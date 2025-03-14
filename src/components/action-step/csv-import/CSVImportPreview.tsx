
import React, { useState } from 'react';
import { ActionStepDetailsCollection } from '@/services/actionStepDetails/types';
import { Card, CardContent } from '@/components/ui/card';
import PreviewEmptyState from './PreviewEmptyState';
import PreviewHeader from './PreviewHeader';
import PreviewTable from './PreviewTable';

interface CSVImportPreviewProps {
  parsedData: ActionStepDetailsCollection | null;
}

const CSVImportPreview: React.FC<CSVImportPreviewProps> = ({ parsedData }) => {
  const [showAllEntries, setShowAllEntries] = useState(false);
  
  if (!parsedData || Object.keys(parsedData).length === 0) {
    return <PreviewEmptyState />;
  }

  const totalEntries = Object.keys(parsedData).length;
  const previewLimit = 5;
  
  // Get entries to display - either all or just the preview amount
  const entriesToShow = showAllEntries 
    ? Object.entries(parsedData)
    : Object.entries(parsedData).slice(0, previewLimit);
  
  const toggleShowAll = () => setShowAllEntries(!showAllEntries);
  
  return (
    <Card>
      <PreviewHeader 
        totalEntries={totalEntries} 
        shownEntries={previewLimit} 
        showAll={showAllEntries}
        onToggleShowAll={toggleShowAll}
      />
      <CardContent className="p-0">
        <PreviewTable entries={entriesToShow} />
      </CardContent>
    </Card>
  );
};

export default CSVImportPreview;
