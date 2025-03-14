
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ActionStepCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  timeEstimate: string;
  resources?: { title: string; url: string }[];
  completed?: boolean;
  saved?: boolean;
  className?: string;
}

const ActionStepCard = ({
  id,
  title,
  description,
  category,
  timeEstimate,
  resources = [],
  completed = false,
  saved = false,
  className,
}: ActionStepCardProps) => {
  const [isSaved, setIsSaved] = useState(saved);

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md cursor-pointer", className)}>
      <Link to={`/action-steps/${id}`} className="block">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">
                {title}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              className={cn(
                "transition-all h-9 w-9 rounded-full",
                isSaved ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground"
              )}
              aria-label={isSaved ? "Eemalda salvestatud arengusammudest" : "Salvesta arengusamm"}
            >
              <Bookmark className={cn("h-5 w-5", isSaved ? "fill-current" : "")} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {description}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ActionStepCard;
