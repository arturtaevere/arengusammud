
import ActionStepCard from "@/components/ActionStepCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Competence {
  id: string;
  title: string;
}

interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  resources: { title: string; url: string }[];
}

interface ActionStepsListProps {
  filteredSteps: ActionStep[];
  competences: Competence[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setDifficultyFilter: (value: string) => void;
}

const ActionStepsList = ({ 
  filteredSteps, 
  competences, 
  searchTerm, 
  setSearchTerm, 
  setDifficultyFilter 
}: ActionStepsListProps) => {
  if (filteredSteps.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-100">
        <Search className="h-12 w-12 mx-auto text-slate-400 mb-2" />
        <h3 className="text-lg font-medium mb-1">Ühtegi arengusammu ei leitud</h3>
        <p className="text-muted-foreground mb-4">
          Proovi muuta otsingut või filtreerimist, et näha rohkem tulemusi.
        </p>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchTerm("");
            setDifficultyFilter("");
          }}
        >
          Tühista filtrid
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {filteredSteps.map((step) => (
        <ActionStepCard
          key={step.id}
          id={step.id}
          title={step.title}
          description={step.description}
          category={competences.find(c => c.id === step.category)?.title || ""}
          difficulty={step.difficulty}
          timeEstimate={step.timeEstimate}
          resources={step.resources}
        />
      ))}
    </div>
  );
};

export default ActionStepsList;
