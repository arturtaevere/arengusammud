
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, File, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { parseActionStepsCsv } from '@/utils/csv-parser';

interface CsvUploaderProps {
  onUploadComplete?: (data: any) => void;
}

const CsvUploader = ({ onUploadComplete }: CsvUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's a CSV file
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Palun valige CSV fail');
      return;
    }

    setFileName(file.name);
    setIsUploading(true);
    setError(null);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Read and parse the file
      const text = await file.text();
      const parsedData = parseActionStepsCsv(text);
      
      // Finish progress bar
      clearInterval(progressInterval);
      setProgress(100);
      
      // Success notification
      toast({
        title: "Laadimine õnnestus",
        description: `${parsedData.length} arengusammu imporditud edukalt.`,
      });

      // Call the callback with parsed data
      if (onUploadComplete) {
        onUploadComplete(parsedData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Viga faili töötlemisel');
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 1000);
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
      
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept=".csv"
          id="csv-upload"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('csv-upload')?.click()}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <File className="mr-2 h-4 w-4 animate-pulse" />
              Laadimine...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Lae üles CSV
            </>
          )}
        </Button>
      </div>
      
      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Töötlen faili: {fileName}
          </p>
        </div>
      )}
      
      {fileName && !isUploading && (
        <div className="flex items-center text-sm text-muted-foreground">
          <Check className="h-4 w-4 mr-2 text-green-500" />
          <span className="truncate">{fileName}</span>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground">
        <p>CSV fail peab sisaldama järgnevat struktuuri:</p>
        <p className="font-mono text-xs mt-1">
          Õpieesmärk;Kategooria<br />
          Sammu nimi;Nimi<br />
          Sammu kirjeldus;Kirjeldus<br />
          Edukriteerium;Kriteerium 1<br />
          Edukriteerium;Kriteerium 2<br />
          ...
        </p>
      </div>
    </div>
  );
};

export default CsvUploader;
