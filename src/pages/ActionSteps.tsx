
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { actionSteps, competences } from "@/data/actionStepsData";
import { useActionSteps } from "@/hooks/useActionSteps";
import ActionStepsHeader from "@/components/action-steps/ActionStepsHeader";
import ActionStepsFilters from "@/components/action-steps/ActionStepsFilters";
import ActionStepsList from "@/components/action-steps/ActionStepsList";

// Define local interface for type safety
interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  resources: { title: string; url: string }[];
}

const ActionSteps = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  
  // Get current category title
  const currentCategory = competences.find(c => c.id === categoryFilter)?.title || "Kõik arengusammud";

  // Use custom hook to filter action steps
  const { filteredSteps } = useActionSteps(
    actionSteps as ActionStep[], 
    categoryFilter, 
    searchTerm, 
    difficultyFilter
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <ActionStepsHeader currentCategory={currentCategory} />
        
        <ActionStepsFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
        />
        
        <ActionStepsList 
          filteredSteps={filteredSteps}
          competences={competences}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setDifficultyFilter={setDifficultyFilter}
        />
      </main>
    </div>
  );
};

export default ActionSteps;
