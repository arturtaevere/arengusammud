
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, AlertCircle, FileText } from 'lucide-react';

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
      if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
        onFileChange(null, 'Palun vali CSV fail (.csv laiendiga)');
        return;
      }
      
      // Check file size (max 2MB)
      if (selectedFile.size > 2 * 1024 * 1024) {
        onFileChange(null, 'Fail on liiga suur (maksimum 2MB)');
        return;
      }
      
      onFileChange(selectedFile, null);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>
        
        <Button
          onClick={onImport}
          disabled={!file || isUploading}
          className="whitespace-nowrap"
        >
          {isUploading ? 'Töötlemine...' : 'Impordi'}
          <Upload className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {file && (
        <div className="text-sm flex items-center gap-2 text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>Valitud fail: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(1)} KB)</span>
        </div>
      )}
    </div>
  );
};

export default CSVFileInput;
