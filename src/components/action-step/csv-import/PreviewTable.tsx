
import React from 'react';
import { ActionStepDetailsCollection } from '@/services/actionStepDetails/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PreviewTableProps {
  entries: [string, any][];
}

const PreviewTable: React.FC<PreviewTableProps> = ({ entries }) => {
  return (
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
          {entries.map(([id, data]) => (
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
  );
};

export default PreviewTable;
