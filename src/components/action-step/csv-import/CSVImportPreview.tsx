
import React from 'react';
import { ActionStepDetailsCollection } from '@/services/actionStepDetails/types';
import { Card, CardContent } from '@/components/ui/card';
import PreviewEmptyState from './PreviewEmptyState';
import PreviewHeader from './PreviewHeader';
import PreviewTable from './PreviewTable';

interface CSVImportPreviewProps {
  parsedData: ActionStepDetailsCollection | null;
}

const CSVImportPreview: React.FC<CSVImportPreviewProps> = ({ parsedData }) => {
  if (!parsedData || Object.keys(parsedData).length === 0) {
    return <PreviewEmptyState />;
  }

  // Get up to 5 entries to display as preview
  const previewEntries = Object.entries(parsedData).slice(0, 5);
  const totalEntries = Object.keys(parsedData).length;
  
  return (
    <Card>
      <PreviewHeader totalEntries={totalEntries} shownEntries={5} />
      <CardContent className="p-0">
        <PreviewTable entries={previewEntries} />
      </CardContent>
    </Card>
  );
};

export default CSVImportPreview;
