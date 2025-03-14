
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionStepsEmptyStateProps {
  onResetFilters: () => void;
}

const ActionStepsEmptyState = ({ onResetFilters }: ActionStepsEmptyStateProps) => {
  return (
    <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-100">
      <Search className="h-12 w-12 mx-auto text-slate-400 mb-2" />
      <h3 className="text-lg font-medium mb-1">Ühtegi arengusammu ei leitud</h3>
      <p className="text-muted-foreground mb-4">
        Proovi muuta otsingut või filtreerimist, et näha rohkem tulemusi.
      </p>
      <Button 
        variant="outline" 
        onClick={onResetFilters}
      >
        Tühista filtrid
      </Button>
    </div>
  );
};

export default ActionStepsEmptyState;
