
import React from 'react';

const CSVImportInstructions: React.FC = () => {
  return (
    <div className="text-sm text-muted-foreground">
      <p className="font-medium mb-2">CSV faili nõuded:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Esimene rida peab sisaldama väljade pealkirju</li>
        <li>Vajalikud väljad: id, title, description, category</li>
        <li>Soovituslikud väljad: difficulty, timeEstimate, reason, examples, videoUrl</li>
        <li>Edukriteeriumid ja harjutusülesanded saab lisada eraldi ridadel:</li>
        <ul className="list-disc pl-5 space-y-1">
          <li>Edukriteeriumid: igal real "Edukriteerium:" või "Edukriteerium;" millele järgneb kriteerium</li>
          <li>Harjutusülesanded: igal real "Harjutusülesanne:" või "Harjutusülesanne;" millele järgneb ülesanne</li>
        </ul>
      </ul>
    </div>
  );
};

export default CSVImportInstructions;
