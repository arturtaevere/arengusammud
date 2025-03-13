
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ClipboardList, MessageSquare, Users } from 'lucide-react';

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kiired tegevused</CardTitle>
        <CardDescription>Tegevused, mida saad kohe teha</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center text-center"
            asChild
          >
            <Link to="/observations/new">
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <span className="text-sm font-medium">Vii läbi vaatlus</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center text-center"
            asChild
          >
            <Link to="/feedback/new">
              <MessageSquare className="h-8 w-8 mb-2 text-primary" />
              <span className="text-sm font-medium">Anna tagasisidet</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center text-center"
            asChild
          >
            <Link to="/competences">
              <ClipboardList className="h-8 w-8 mb-2 text-primary" />
              <span className="text-sm font-medium">Sirvi pädevusi</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center text-center"
            asChild
          >
            <Link to="/teachers">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <span className="text-sm font-medium">Halda õpetajaid</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
