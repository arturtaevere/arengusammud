
import { useState, useEffect } from 'react';
import { ActionStep } from '@/data/action-steps/types';

export const useActionSteps = (
  actionSteps: ActionStep[],
  categoryFilter: string,
  searchTerm: string
) => {
  const [filteredSteps, setFilteredSteps] = useState<ActionStep[]>(actionSteps);

  useEffect(() => {
    let result = actionSteps;
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(step => step.category === categoryFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        step => 
          step.title.toLowerCase().includes(lowercaseSearchTerm) || 
          step.description.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    setFilteredSteps(result);
  }, [categoryFilter, searchTerm, actionSteps]);

  return { filteredSteps };
};
