
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ActionStepsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ActionStepsFilters = ({ 
  searchTerm, 
  setSearchTerm
}: ActionStepsFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Otsi arengusamme..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ActionStepsFilters;
