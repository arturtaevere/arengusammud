
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Upload, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CSVImportService } from '@/services/csvImportService';
import { toast } from '@/components/ui/use-toast';
import { ActionStepDetailsCollection } from '@/services/actionStepDetails/types';

interface CSVImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportSuccess?: (data: ActionStepDetailsCollection) => void;
}

const CSVImportModal: React.FC<CSVImportModalProps> = ({
  open,
  onOpenChange,
  onImportSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ActionStepDetailsCollection | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if it's a CSV file
      if (!selectedFile.name.endsWith('.csv')) {
        setError('Palun vali CSV fail');
        return;
      }
      
      setFile(selectedFile);
    }
  };
  
  const handleImport = async () => {
    if (!file) {
      setError('Palun vali fail enne importimist');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Read file content
      const text = await file.text();
      
      // Parse CSV
      const parsedData = CSVImportService.parseCSVContent(text);
      
      // Check if any data was parsed
      const entryCount = Object.keys(parsedData).length;
      if (entryCount === 0) {
        setError('Failist ei leitud ühtegi kehtivat arengusammu');
        setIsUploading(false);
        return;
      }
      
      // Store parsed data for confirmation
      setParsedData(parsedData);
      setShowConfirmDialog(true);
    } catch (err) {
      console.error('CSV import failed:', err);
      setError(`Faili töötlemisel tekkis viga: ${err instanceof Error ? err.message : 'Tundmatu viga'}`);
    } finally {
      setIsUploading(false);
    }
  };
  
  const confirmImport = () => {
    if (!parsedData) return;
    
    // Save the imported data
    CSVImportService.saveImportedData(parsedData);
    
    // Notify parent component
    if (onImportSuccess) {
      onImportSuccess(parsedData);
    }
    
    // Show success toast
    toast({
      title: "Import õnnestus",
      description: `${Object.keys(parsedData).length} arengusammu imporditi edukalt`,
      duration: 5000,
    });
    
    // Close dialogs
    setShowConfirmDialog(false);
    onOpenChange(false);
    
    // Reset state
    setFile(null);
    setParsedData(null);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Impordi arengusammud CSV failist</DialogTitle>
            <DialogDescription>
              Lae üles CSV fail, mis sisaldab arengusammude andmeid.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex items-center gap-4">
              <Input 
                type="file" 
                accept=".csv" 
                onChange={handleFileChange}
                className="flex-1"
              />
              
              <Button
                onClick={handleImport}
                disabled={!file || isUploading}
              >
                {isUploading ? 'Töötlemine...' : 'Impordi'}
                <Upload className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">CSV faili nõuded:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Esimene rida peab sisaldama väljade pealkirju</li>
                <li>Vajalikud väljad: id, title, description, category</li>
                <li>Soovituslikud väljad: difficulty, timeEstimate, successCriteria, practiceTask</li>
                <li>Mitmeosaliste väljade (successCriteria, practiceTask) väärtused eralda semikooloniga (;)</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end">
            <Button 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
            >
              Tühista
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kinnita import</AlertDialogTitle>
            <AlertDialogDescription>
              {parsedData && `Failist leiti ${Object.keys(parsedData).length} arengusammu. Kas soovid need importida?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tühista</AlertDialogCancel>
            <AlertDialogAction onClick={confirmImport}>
              <Check className="mr-2 h-4 w-4" />
              Kinnita import
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CSVImportModal;
