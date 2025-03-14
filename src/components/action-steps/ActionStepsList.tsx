
import ActionStepCard from "@/components/ActionStepCard";
import { ActionStep } from "@/data/actionStepsData";
import { getCompetenceTitle } from "@/data/competencesData";

interface ActionStepsListProps {
  steps: ActionStep[];
}

const ActionStepsList = ({ steps }: ActionStepsListProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {steps.map((step) => (
        <ActionStepCard
          key={step.id}
          id={step.id}
          title={step.title}
          description={step.description}
          category={getCompetenceTitle(step.category)}
          difficulty={step.difficulty}
          timeEstimate={step.timeEstimate}
          resources={step.resources}
        />
      ))}
    </div>
  );
};

export default ActionStepsList;
