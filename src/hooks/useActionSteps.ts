
import { useState, useEffect } from 'react';

interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  resources: { title: string; url: string }[];
}

export const useActionSteps = (
  actionSteps: ActionStep[],
  categoryFilter: string,
  searchTerm: string,
  difficultyFilter: string
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
    
    // Apply difficulty filter
    if (difficultyFilter && difficultyFilter !== 'all') {
      result = result.filter(step => step.difficulty === difficultyFilter);
    }
    
    setFilteredSteps(result);
  }, [categoryFilter, searchTerm, difficultyFilter, actionSteps]);

  return { filteredSteps };
};
