
import { useState, useEffect } from 'react';

type FilterState = {
  name: string;
  email: string;
  role: string;
  school: string;
};

type FilterProps = {
  searchTerm?: string;
  filterRole?: string;
  filterSchool?: string;
  onSearchChange?: (value: string) => void;
  onRoleChange?: (value: string) => void;
  onSchoolChange?: (value: string) => void;
  onFilterChange?: (filters: FilterState) => void;
  onClearFilters?: () => void;
};

export const useFilters = ({
  searchTerm = '',
  filterRole = '',
  filterSchool = '',
  onSearchChange,
  onRoleChange,
  onSchoolChange,
  onFilterChange,
  onClearFilters
}: FilterProps) => {
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

  const handleNameChange = (value: string) => {
    setName(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
    handleFilterChange();
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    handleFilterChange();
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    if (onRoleChange) {
      onRoleChange(value);
    }
    handleFilterChange();
  };

  const handleSchoolChange = (value: string) => {
    setSchool(value);
    if (onSchoolChange) {
      onSchoolChange(value);
    }
    handleFilterChange();
  };

  return {
    filters: { name, email, role, school },
    handlers: {
      handleNameChange,
      handleEmailChange,
      handleRoleChange,
      handleSchoolChange,
      handleClearFilters
    }
  };
};
