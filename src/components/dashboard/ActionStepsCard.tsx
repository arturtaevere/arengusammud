
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ClipboardList, Clock, Plus } from 'lucide-react';

interface ActionStep {
  id: string;
  title: string;
  dueDate: string;
  category: string;
}

interface ActionStepsCardProps {
  actionSteps: ActionStep[];
}

const ActionStepsCard = ({ actionSteps }: ActionStepsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Tulevased arengusammud</CardTitle>
            <CardDescription>Järgmised rakendatavad sammud</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to="/action-steps">Vaata kõiki</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {actionSteps.length > 0 ? (
          <div className="space-y-4">
            {actionSteps.map((step) => (
              <div 
                key={step.id}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="rounded-full bg-primary/10 p-2 mr-4">
                  <ClipboardList className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-1">
                      {step.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm flex items-center text-amber-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Tähtaeg: {step.dueDate}
                  </div>
                  <div className="flex mt-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-green-500 text-xs"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Märgi lõpetatuks
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Pole ühtegi tulevast arengusammu</p>
            <Button asChild>
              <Link to="/action-steps">
                <Plus className="mr-2 h-4 w-4" />
                Sirvi arengusamme
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionStepsCard;
