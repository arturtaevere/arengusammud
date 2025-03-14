
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, AlertCircle } from 'lucide-react';

interface CSVFileInputProps {
  file: File | null;
  error: string | null;
  isUploading: boolean;
  onFileChange: (file: File | null, error: string | null) => void;
  onImport: () => void;
}

const CSVFileInput: React.FC<CSVFileInputProps> = ({
  file,
  error,
  isUploading,
  onFileChange,
  onImport
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if it's a CSV file
      if (!selectedFile.name.endsWith('.csv')) {
        onFileChange(null, 'Palun vali CSV fail');
        return;
      }
      
      onFileChange(selectedFile, null);
    }
  };

  return (
    <>
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
          onClick={onImport}
          disabled={!file || isUploading}
        >
          {isUploading ? 'Töötlemine...' : 'Impordi'}
          <Upload className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default CSVFileInput;
