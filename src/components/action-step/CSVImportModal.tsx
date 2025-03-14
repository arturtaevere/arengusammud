
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CSVImportService } from '@/services/csvImportService';
import { toast } from '@/components/ui/use-toast';
import { ActionStepDetailsCollection } from '@/services/actionStepDetails/types';
import CSVFileInput from './csv-import/CSVFileInput';
import CSVImportInstructions from './csv-import/CSVImportInstructions';
import CSVImportConfirmDialog from './csv-import/CSVImportConfirmDialog';

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
  
  const handleFileChange = (selectedFile: File | null, errorMessage: string | null) => {
    setFile(selectedFile);
    setError(errorMessage);
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
            <CSVFileInput 
              file={file}
              error={error}
              isUploading={isUploading}
              onFileChange={handleFileChange}
              onImport={handleImport}
            />
            
            <CSVImportInstructions />
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
      
      <CSVImportConfirmDialog 
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        parsedData={parsedData}
        onConfirm={confirmImport}
      />
    </>
  );
};

export default CSVImportModal;
