
import React from 'react';
import { Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SCHOOLS } from '@/context/auth/constants';

interface FilterCardProps {
  searchTerm: string;
  filterRole: string;
  filterSchool: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onSchoolChange: (value: string) => void;
}

const FilterCard = ({ 
  searchTerm, 
  filterRole, 
  filterSchool, 
  onSearchChange, 
  onRoleChange, 
  onSchoolChange 
}: FilterCardProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Filtrid</CardTitle>
        <CardDescription>Filtreeri kasutajaid rolli ja kooli järgi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Otsi nime või e-posti järgi..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-1/3">
            <Select value={filterRole} onValueChange={onRoleChange}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Roll" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kõik rollid</SelectItem>
                <SelectItem value="juht">Juhendaja</SelectItem>
                <SelectItem value="õpetaja">Õpetaja</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/3">
            <Select value={filterSchool} onValueChange={onSchoolChange}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Kool" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kõik koolid</SelectItem>
                {SCHOOLS.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
