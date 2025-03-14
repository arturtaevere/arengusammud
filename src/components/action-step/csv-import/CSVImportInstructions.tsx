
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CSVImportService } from '@/services/csvImport';

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
          <li>Toetame nii koma- kui semikooloniga eraldatud CSV formaati</li>
          <li>Toetame kahte formaati:</li>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Standardne CSV:</strong> pealkirjadega "id, title, description, ..." (inglise keeles)</li>
            <li><strong>Struktueeritud CSV:</strong> kahe veerguga "Kategooria" ja "Tekst", kus "Kategooria" näitab rea tüüpi</li>
          </ul>
          <li>Edukriteeriumid ja harjutusülesanded saab lisada:</li>
          <ul className="list-disc pl-5 space-y-1">
            <li>Eraldi ridadel, mis algavad "Edukriteerium:" või "Harjutusülesanne:"</li>
            <li>Või kasutades "Kategooria" veerus "Edukriteerium" või "Harjutusülesanne" ja "Tekst" veerus sisu</li>
          </ul>
          <li>Enne importimist kuvatakse andmete eelvaade kinnitamiseks</li>
        </ul>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription>
          <span className="block mb-2">Näpunäide: Kui imporditavaid arengusamme ei leita, kontrolli, et:</span>
          <ul className="list-disc pl-5 space-y-1">
            <li>Standardse CSV puhul: igal arengusammul on olemas <span className="font-semibold">id</span> ja <span className="font-semibold">title</span> väljad</li>
            <li>Struktureeritud CSV puhul: failil on "Kategooria" ja "Tekst" veerud ning erinevad reatüübid ("Õpieesmärk", "Sammu nimi", jne)</li>
            <li>Failil on õige kodeering (UTF-8) ja eraldajad (komad või semikoolonid)</li>
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
