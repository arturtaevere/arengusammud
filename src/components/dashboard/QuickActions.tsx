
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Book, FileUp, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { ActionStep } from '@/data/action-steps/types';
import ActionStepsUploadDialog from './ActionStepsUploadDialog';

const QuickActions = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  const handleImportComplete = (data: Partial<ActionStep>[]) => {
    // Here you would typically save this data to your backend
    // For now we'll just show a success message
    toast({
      title: "Import successful",
      description: `${data.length} action steps have been imported successfully.`,
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Kiired tegevused</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button asChild className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <Link to="/observations/new">
            <Plus className="h-8 w-8 mb-2" />
            <span>Uus vaatlus</span>
          </Link>
        </Button>
        
        <Button asChild className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <Link to="/feedback/new">
            <Book className="h-8 w-8 mb-2" />
            <span>Anna tagasisidet</span>
          </Link>
        </Button>
        
        <Button 
          className="h-auto py-6 flex flex-col items-center justify-center" 
          variant="outline"
          onClick={() => setUploadDialogOpen(true)}
        >
          <FileUp className="h-8 w-8 mb-2" />
          <span>Lae üles CSV</span>
        </Button>
        
        <Button asChild className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <Link to="/progress">
            <BarChart2 className="h-8 w-8 mb-2" />
            <span>Vaata progressi</span>
          </Link>
        </Button>
      </div>
      
      <ActionStepsUploadDialog 
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onImportComplete={handleImportComplete}
      />
    </div>
  );
};

export default QuickActions;
