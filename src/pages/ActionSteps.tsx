import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { actionSteps, competences } from "@/data/actionStepsData";
import { useActionSteps } from "@/hooks/useActionSteps";
import ActionStepsHeader from "@/components/action-steps/ActionStepsHeader";
import ActionStepsFilters from "@/components/action-steps/ActionStepsFilters";
import ActionStepsList from "@/components/action-steps/ActionStepsList";
import { ActionStep } from "@/data/action-steps/types";

const ActionSteps = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const currentCategory = competences.find(c => c.id === categoryFilter)?.title || "Kõik arengusammud";

  const { filteredSteps } = useActionSteps(
    actionSteps as ActionStep[], 
    categoryFilter, 
    searchTerm
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <ActionStepsHeader currentCategory={currentCategory} />
        
        <ActionStepsFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        <ActionStepsList 
          filteredSteps={filteredSteps}
          competences={competences}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </main>
    </div>
  );
};

export default ActionSteps;
