
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface ActionStepsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (value: string) => void;
}

const ActionStepsFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  difficultyFilter, 
  setDifficultyFilter 
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
      
      <div className="flex gap-2">
        <div className="w-48">
          <Select
            value={difficultyFilter}
            onValueChange={setDifficultyFilter}
          >
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Tase" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Kõik tasemed</SelectItem>
              <SelectItem value="beginner">Algaja</SelectItem>
              <SelectItem value="intermediate">Keskmine</SelectItem>
              <SelectItem value="advanced">Edasijõudnu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ActionStepsFilters;
