
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { SCHOOLS } from '@/context/auth/constants';

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

const FilterCard = ({ 
  searchTerm = '',
  filterRole = '',
  filterSchool = '',
  onSearchChange,
  onRoleChange,
  onSchoolChange,
  onFilterChange,
  onClearFilters
}: FilterCardProps) => {
  const [name, setName] = useState(searchTerm || '');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(filterRole || '');
  const [school, setSchool] = useState(filterSchool || '');

  // Apply changes if the external state changes
  useEffect(() => {
    if (searchTerm !== undefined) setName(searchTerm);
    if (filterRole !== undefined) setRole(filterRole);
    if (filterSchool !== undefined) setSchool(filterSchool);
  }, [searchTerm, filterRole, filterSchool]);

  const handleFilterChange = () => {
    const filters = {
      name,
      email,
      role,
      school,
    };
    
    // Support both old and new API
    if (onFilterChange) {
      onFilterChange(filters);
    }
    
    // Support new API
    if (onSearchChange && name !== searchTerm) {
      onSearchChange(name);
    }
    if (onRoleChange && role !== filterRole) {
      onRoleChange(role);
    }
    if (onSchoolChange && school !== filterSchool) {
      onSchoolChange(school);
    }
  };

  const handleClearFilters = () => {
    setName('');
    setEmail('');
    setRole('');
    setSchool('');
    
    // Support both APIs
    if (onClearFilters) {
      onClearFilters();
    }
    
    if (onSearchChange) {
      onSearchChange('');
    }
    if (onRoleChange) {
      onRoleChange('');
    }
    if (onSchoolChange) {
      onSchoolChange('');
    }
  };

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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (onSearchChange) {
                  onSearchChange(e.target.value);
                }
                handleFilterChange();
              }}
            />
          </div>
          <div>
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              placeholder="Filtreeri e-posti järgi"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleFilterChange();
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Roll</Label>
            <Select 
              onValueChange={(value) => {
                setRole(value);
                if (onRoleChange) {
                  onRoleChange(value);
                }
                handleFilterChange();
              }} 
              value={role}
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
              onValueChange={(value) => {
                setSchool(value);
                if (onSchoolChange) {
                  onSchoolChange(value);
                }
                handleFilterChange();
              }} 
              value={school}
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
        <Button variant="secondary" className="w-full justify-start" onClick={handleClearFilters}>
          <X className="mr-2 h-4 w-4" />
          Tühista filtrid
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
