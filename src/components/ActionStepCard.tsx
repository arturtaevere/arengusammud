
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, CheckCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isCompleted, setIsCompleted] = useState(completed);
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
    <Card className={cn("overflow-hidden transition-all", 
      isCompleted ? "border-green-200 bg-green-50/30" : "hover:shadow-md",
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle 
              className={cn("transition-colors", 
                isCompleted ? "line-through text-muted-foreground" : ""
              )}
            >
              {title}
            </CardTitle>
            <CardDescription className="mt-1">Hinnanguline aeg: {timeEstimate}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className={cn(
              "transition-all h-9 w-9 rounded-full",
              isSaved ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground"
            )}
            aria-label={isSaved ? "Eemalda salvestatud arengusammudest" : "Salvesta arengusamm"}
          >
            <Bookmark className={cn("h-5 w-5", isSaved ? "fill-current" : "")} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {category}
          </Badge>
          <Badge variant="outline" className={cn("text-xs font-normal", getDifficultyColor())}>
            {translateDifficulty(difficulty)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className={cn("text-sm", isCompleted ? "text-muted-foreground" : "")}>
          {description}
        </p>
        
        {resources.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Materjalid</h4>
            <ul className="space-y-1">
              {resources.map((resource, index) => (
                <li key={index} className="text-sm">
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    {resource.title}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant={isCompleted ? "outline" : "default"}
          className={cn(
            "w-full transition-all",
            isCompleted ? "hover:bg-red-100 hover:text-red-700 hover:border-red-200" : ""
          )}
          onClick={() => setIsCompleted(!isCompleted)}
        >
          <CheckCircle className={cn("mr-2 h-4 w-4", isCompleted ? "text-green-500" : "")} />
          {isCompleted ? "Märgi mitte lõpetatuks" : "Märgi lõpetatuks"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActionStepCard;
