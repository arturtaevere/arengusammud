
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ActionStepsHeaderProps {
  currentCategory: string;
}

const ActionStepsHeader = ({ currentCategory }: ActionStepsHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/competences">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Tagasi
          </Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-2">{currentCategory}</h1>
      <p className="text-muted-foreground">
        Sirvi ja rakenda konkreetseid arengusamme, mis aitavad sul selles valdkonnas areneda.
      </p>
    </div>
  );
};

export default ActionStepsHeader;
