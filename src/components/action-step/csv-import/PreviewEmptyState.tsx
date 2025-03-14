
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const PreviewEmptyState: React.FC = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>Andmete eelvaade pole saadaval</AlertDescription>
    </Alert>
  );
};

export default PreviewEmptyState;
