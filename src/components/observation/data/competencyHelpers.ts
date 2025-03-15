
import { competencies } from './competenciesData';
import { actionSteps } from '@/data/actionStepsData';

// Helper function to get all action steps as a flat array
export const getAllActionSteps = () => {
  // Map action steps from data module to competencies
  const mappedSteps = actionSteps.map(step => {
    // Find the corresponding competency 
    const competencyId = `comp${step.category}`;
    const competency = competencies.find(comp => comp.id === competencyId);
    
    return {
      ...step,
      competencyId: competencyId,
      competencyName: competency ? competency.name : 'Unknown Competency'
    };
  });
  
  console.log(`Mapped ${mappedSteps.length} action steps to competencies`);
  return mappedSteps;
};

// Helper function to get action step by id
export const getActionStepById = (id: string) => {
  // First check in mapped action steps
  const step = actionSteps.find(step => step.id === id);
  if (step) {
    const competencyId = `comp${step.category}`;
    const competency = competencies.find(comp => comp.id === competencyId);
    
    return {
      ...step,
      competencyId: competencyId,
      competencyName: competency ? competency.name : 'Unknown Competency'
    };
  }
  
  // If not found, check the hardcoded steps
  for (const comp of competencies) {
    const step = comp.actionSteps.find(step => step.id === id);
    if (step) {
      return {
        ...step,
        competencyId: comp.id,
        competencyName: comp.name
      };
    }
  }
  
  return null;
};

// Helper to get competency by id
export const getCompetencyById = (id: string) => {
  return competencies.find(comp => comp.id === id) || null;
};

// Map the action step IDs from the URL parameter to the actual action step IDs in the data
export const getActionStepDetailById = (urlId: string) => {
  console.log("getActionStepDetailById called with:", urlId);
  
  // Check if this is one of the hardcoded IDs
  if (urlId === 'step1' || urlId === 'step2' || urlId === 'step3' || urlId === 'step10-1') {
    console.log("Recognized as hardcoded step ID:", urlId);
    return urlId;
  }
  
  // For the competencies data format, map the URL ID (like "as19") to
  // the correct action step in the competencies data
  const allSteps = getAllActionSteps();
  const matchingStep = allSteps.find(step => step.id === urlId);
  
  if (matchingStep) {
    console.log("Found matching step in competencies data:", matchingStep.id);
    return urlId;
  }
  
  // Handle mapping between URL IDs and data IDs
  if (urlId === 'as19') {
    return 'step10-1'; // Map as19 to step10-1 which is "Tõhusa õppimisviisi avamine"
  }
  
  console.log("No matching step found for:", urlId);
  return null;
};

// Helper to enrich competencies with their action steps
export const getEnrichedCompetencies = () => {
  // Create a deep copy of the competencies
  const enriched = JSON.parse(JSON.stringify(competencies));
  
  // Group action steps by their competency category
  actionSteps.forEach(step => {
    const competencyId = `comp${step.category}`;
    const competencyIndex = enriched.findIndex(comp => comp.id === competencyId);
    
    if (competencyIndex !== -1) {
      if (!enriched[competencyIndex].actionSteps) {
        enriched[competencyIndex].actionSteps = [];
      }
      
      // Only add the step if it doesn't already exist
      if (!enriched[competencyIndex].actionSteps.some(s => s.id === step.id)) {
        enriched[competencyIndex].actionSteps.push({
          id: step.id,
          title: step.title,
          description: step.description
        });
      }
    }
  });
  
  return enriched;
};
