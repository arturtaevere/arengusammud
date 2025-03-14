
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CSVImportService } from '@/services/csvImportService';

const CSVImportInstructions: React.FC = () => {
  const handleDownloadSample = () => {
    const sampleCSV = CSVImportService.getSampleCSV();
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arengusammud-naidis.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        <p className="font-medium mb-2">CSV faili nõuded:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Esimene rida peab sisaldama väljade pealkirju</li>
          <li>Vajalikud väljad: <span className="font-semibold">id, title</span></li>
          <li>Soovituslikud väljad: description, category, difficulty, timeEstimate, reason, examples, videoUrl</li>
          <li>Edukriteeriumid ja harjutusülesanded saab lisada eraldi ridadel:</li>
          <ul className="list-disc pl-5 space-y-1">
            <li>Edukriteeriumid: igal real "Edukriteerium:" või "Edukriteerium;" millele järgneb kriteerium</li>
            <li>Harjutusülesanded: igal real "Harjutusülesanne:" või "Harjutusülesanne;" millele järgneb ülesanne</li>
          </ul>
          <li>Enne importimist kuvatakse andmete eelvaade kinnitamiseks</li>
        </ul>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription>
          <span className="block mb-2">Näpunäide: Kui imporditavaid arengusamme ei leita, kontrolli, et:</span>
          <ul className="list-disc pl-5 space-y-1">
            <li>Igal arengusammul on olemas <span className="font-semibold">id</span> ja <span className="font-semibold">title</span> väljad</li>
            <li>CSV failis on korrektsed komadega eraldatud väärtused (väärtused, mis sisaldavad koma, peavad olema jutumärkides)</li>
            <li>Väljade pealkirjad on CSV esimesel real</li>
          </ul>
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleDownloadSample}
        >
          <Download className="mr-2 h-4 w-4" />
          Laadi alla näidisfail
        </Button>
      </div>
    </div>
  );
};

export default CSVImportInstructions;
