
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ActionStepSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ActionStepSearch = ({ value, onChange }: ActionStepSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Otsi arengusamme..."
        className="pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ActionStepSearch;
