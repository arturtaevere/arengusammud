
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { 
  AccordionItem,
  AccordionTrigger,
  AccordionContent 
} from '@/components/ui/accordion';
import { StudyCircleSession } from '@/data/study-circles/data';

interface SessionAccordionItemProps {
  session: StudyCircleSession;
}

const SessionAccordionItem = ({ session }: SessionAccordionItemProps) => {
  return (
    <AccordionItem key={session.id} value={session.id}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex flex-col items-start text-left">
          <h3 className="text-base font-medium">{session.title}</h3>
          <p className="text-sm text-muted-foreground">Sessioon {session.session}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="py-2">
          <p className="mb-4">{session.description}</p>
          <Link 
            to={`/study-circles/session/${session.id}`}
            className="flex items-center text-primary font-medium hover:underline"
          >
            Vaata sessiooni <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SessionAccordionItem;
