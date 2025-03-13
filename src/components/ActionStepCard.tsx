
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ActionStepCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
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
  difficulty,
  timeEstimate,
  resources = [],
  completed = false,
  saved = false,
  className,
}: ActionStepCardProps) => {
  const [isSaved, setIsSaved] = useState(saved);

  // Get difficulty badge color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Translate difficulty
  const translateDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'algaja';
      case 'intermediate':
        return 'keskmine';
      case 'advanced':
        return 'edasijõudnu';
      default:
        return difficulty;
    }
  };

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
