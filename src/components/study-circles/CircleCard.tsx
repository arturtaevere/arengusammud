
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { 
  Accordion
} from '@/components/ui/accordion';
import { StudyCircle } from '@/data/study-circles/data';
import SessionAccordionItem from './SessionAccordionItem';

interface CircleCardProps {
  circle: StudyCircle;
}

const CircleCard = ({ circle }: CircleCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{circle.title}</CardTitle>
        <CardDescription>
          {circle.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {circle.sessions.map((session) => (
            <SessionAccordionItem 
              key={session.id} 
              session={session} 
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CircleCard;
