
import React from 'react';
import { ActionStepDetailsCollection } from '@/services/actionStepDetails/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface CSVImportPreviewProps {
  parsedData: ActionStepDetailsCollection | null;
}

const CSVImportPreview: React.FC<CSVImportPreviewProps> = ({ parsedData }) => {
  if (!parsedData || Object.keys(parsedData).length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Andmete eelvaade pole saadaval</AlertDescription>
      </Alert>
    );
  }

  // Get up to 5 entries to display as preview
  const previewEntries = Object.entries(parsedData).slice(0, 5);
  const totalEntries = Object.keys(parsedData).length;
  const showingMoreMessage = totalEntries > 5 ? `Näidatakse 5 kirjet ${totalEntries} kirjest` : '';
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Andmete eelvaade</CardTitle>
        {showingMoreMessage && (
          <CardDescription>{showingMoreMessage}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Pealkiri</TableHead>
                <TableHead>Kategooria</TableHead>
                <TableHead>Raskusaste</TableHead>
                <TableHead>Edukriteeriumid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewEntries.map(([id, data]) => (
                <TableRow key={id}>
                  <TableCell className="font-mono">{id}</TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.category}</TableCell>
                  <TableCell>
                    <Badge variant={
                      data.difficulty === 'beginner' ? 'default' : 
                      data.difficulty === 'intermediate' ? 'secondary' : 
                      'outline'
                    }>
                      {data.difficulty === 'beginner' ? 'Algaja' : 
                       data.difficulty === 'intermediate' ? 'Keskmine' : 
                       'Edasijõudnu'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {data.successCriteria.length} kriteerium(it)
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CSVImportPreview;
