
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CsvUploader from './CsvUploader';
import { ActionStep } from '@/data/action-steps/types';

interface ActionStepsUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete?: (data: Partial<ActionStep>[]) => void;
}

const ActionStepsUploadDialog = ({
  open,
  onOpenChange,
  onImportComplete
}: ActionStepsUploadDialogProps) => {
  const [uploadedData, setUploadedData] = useState<Partial<ActionStep>[]>([]);

  const handleUploadComplete = (data: Partial<ActionStep>[]) => {
    setUploadedData(data);
  };

  const handleImport = () => {
    if (onImportComplete && uploadedData.length > 0) {
      onImportComplete(uploadedData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Impordi arengusamme</DialogTitle>
          <DialogDescription>
            Lae üles CSV-fail arengusammude importimiseks süsteemi
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <CsvUploader onUploadComplete={handleUploadComplete} />
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Tühista
          </Button>
          <Button 
            disabled={uploadedData.length === 0}
            onClick={handleImport}
          >
            Impordi {uploadedData.length > 0 ? `(${uploadedData.length})` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionStepsUploadDialog;
