
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SCHOOLS } from '@/context/auth/constants';
import { useFilters } from './hooks/useFilters';

type FilterCardProps = {
  searchTerm?: string;
  filterRole?: string;
  filterSchool?: string;
  onSearchChange?: (value: string) => void;
  onRoleChange?: (value: string) => void;
  onSchoolChange?: (value: string) => void;
  onFilterChange?: (filters: any) => void;
  onClearFilters?: () => void;
};

const FilterCard = (props: FilterCardProps) => {
  const { filters, handlers } = useFilters(props);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Filtreeri kasutajaid</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nimi</Label>
            <Input
              id="name"
              placeholder="Filtreeri nime järgi"
              value={filters.name}
              onChange={(e) => handlers.handleNameChange(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              placeholder="Filtreeri e-posti järgi"
              value={filters.email}
              onChange={(e) => handlers.handleEmailChange(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Roll</Label>
            <Select 
              onValueChange={handlers.handleRoleChange} 
              value={filters.role}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtreeri rolli järgi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Kõik</SelectItem>
                <SelectItem value="juht">Juht</SelectItem>
                <SelectItem value="õpetaja">Õpetaja</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="school">Kool</Label>
            <Select 
              onValueChange={handlers.handleSchoolChange} 
              value={filters.school}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtreeri kooli järgi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Kõik</SelectItem>
                {SCHOOLS.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="secondary" className="w-full justify-start" onClick={handlers.handleClearFilters}>
          <X className="mr-2 h-4 w-4" />
          Tühista filtrid
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
