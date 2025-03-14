
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Check } from 'lucide-react';
import { ActionStepDetailsCollection } from '@/services/actionStepDetails/types';
import CSVImportPreview from './CSVImportPreview';

interface CSVImportConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parsedData: ActionStepDetailsCollection | null;
  onConfirm: () => void;
}

const CSVImportConfirmDialog: React.FC<CSVImportConfirmDialogProps> = ({
  open,
  onOpenChange,
  parsedData,
  onConfirm
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Kinnita import</AlertDialogTitle>
          <AlertDialogDescription>
            {parsedData && `Failist leiti ${Object.keys(parsedData).length} arengusammu. Vaata üle andmed ja kinnita import.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4 flex-1 overflow-auto">
          <CSVImportPreview parsedData={parsedData} />
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Tühista</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            <Check className="mr-2 h-4 w-4" />
            Kinnita import
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CSVImportConfirmDialog;
