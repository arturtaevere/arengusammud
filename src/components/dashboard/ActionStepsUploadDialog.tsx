
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
import { AlertCircle } from 'lucide-react';
import { ActionStep } from '@/data/action-steps/types';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = (data: Partial<ActionStep>[]) => {
    if (data.length === 0) {
      setError("Ühtegi arengusammu ei leitud. Palun kontrollige CSV faili formaati.");
      return;
    }
    setError(null);
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
            Lae üles CSV-fail arengusammude importimiseks süsteemi. Iga "Õpieesmärk" alustab uut kompetentsiala ning sellele järgnevad sammud kuuluvad selle alla.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <CsvUploader onUploadComplete={handleUploadComplete} />

          {uploadedData.length > 0 && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-sm font-medium">Leitud arengusammud:</p>
              <ul className="mt-2 text-sm">
                {Object.entries(
                  uploadedData.reduce((acc, step) => {
                    const category = step.category || 'Määramata';
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, count]) => (
                  <li key={category} className="flex justify-between">
                    <span>{category}:</span>
                    <span className="font-semibold">{count} sammu</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
