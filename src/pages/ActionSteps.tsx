
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { actionSteps, filterActionSteps } from "@/data/actionStepsData";
import { competences, getCompetenceTitle } from "@/data/competencesData";
import ActionStepsHeader from "@/components/action-steps/ActionStepsHeader";
import ActionStepsFilters from "@/components/action-steps/ActionStepsFilters";
import ActionStepsList from "@/components/action-steps/ActionStepsList";
import ActionStepsEmptyState from "@/components/action-steps/ActionStepsEmptyState";

const ActionSteps = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [filteredSteps, setFilteredSteps] = useState(actionSteps);
  
  // Get current category title
  const currentCategory = getCompetenceTitle(categoryFilter) || "Kõik arengusammud";

  // Apply filters
  useEffect(() => {
    const filtered = filterActionSteps(actionSteps, categoryFilter, searchTerm, difficultyFilter);
    setFilteredSteps(filtered);
  }, [categoryFilter, searchTerm, difficultyFilter]);

  // Reset filters handler
  const handleResetFilters = () => {
    setSearchTerm("");
    setDifficultyFilter("");
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <ActionStepsHeader categoryTitle={currentCategory} />
        
        <ActionStepsFilters 
          searchTerm={searchTerm}
          difficultyFilter={difficultyFilter}
          onSearchChange={setSearchTerm}
          onDifficultyChange={setDifficultyFilter}
        />
        
        {filteredSteps.length > 0 ? (
          <ActionStepsList steps={filteredSteps} />
        ) : (
          <ActionStepsEmptyState onResetFilters={handleResetFilters} />
        )}
      </main>
    </div>
  );
};

export default ActionSteps;
