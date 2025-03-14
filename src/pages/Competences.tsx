
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CompetenceList from '@/components/competences/CompetenceList';
import { 
  convertToCompetencesPageFormat, 
  convertActionStepsToCompetencesPageFormat 
} from '@/components/observation/adapters/competencyFormatAdapters';
import { CSVImportService } from '@/services/csvImport';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { FileUpIcon, RefreshCw, Trash2 } from 'lucide-react';
import CSVImportModal from '@/components/action-step/CSVImportModal';
import { clearImportedData } from '@/services/csvImport/storage';

export default function Competences() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [competencesWithCounts, setCompetencesWithCounts] = useState(convertToCompetencesPageFormat());
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [actionSteps, setActionSteps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);

  // Load both standard and imported action steps when the component mounts
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    try {
      // Check if there's any imported data
      const importedData = CSVImportService.getImportedData();
      console.log('Imported data from storage:', importedData);
      console.log('Imported data count:', Object.keys(importedData).length, 'items');
      
      // Get all action steps, including imported ones
      const allActionSteps = convertActionStepsToCompetencesPageFormat();
      console.log('All action steps after conversion:', allActionSteps);
      console.log('All action steps count:', allActionSteps.length);
      
      if (allActionSteps.length === 0) {
        console.log('No action steps found! Check imported data.');
        if (Object.keys(importedData).length === 0) {
          toast({
            title: "Ei leitud arengusamme",
            description: "Palun impordi arengusammud CSV failist",
            variant: "destructive"
          });
        }
      }
      
      setActionSteps(allActionSteps);
      
      // Update competence counts based on action steps
      const updatedCompetences = competencesWithCounts.map(comp => {
        // Make sure we're using the same category ID format when filtering
        const categorySteps = allActionSteps.filter(step => {
          const matches = step.category === comp.id;
          if (matches) {
            console.log(`Found a step for category ${comp.id}:`, step.title);
          }
          return matches;
        });
        
        console.log(`Steps for category ${comp.id}:`, categorySteps.length);
        
        return {
          ...comp,
          count: categorySteps.length
        };
      });
      
      setCompetencesWithCounts(updatedCompetences);
    } catch (error) {
      console.error('Error loading competences data:', error);
      toast({
        title: "Viga andmete laadimisel",
        description: "Ei õnnestunud arengusammude andmeid laadida. Palun proovi lehte värskendada.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const toggleStepsExpansion = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleImportSuccess = () => {
    // Reload data after successful import
    loadData();
    toast({
      title: "Arengusammud imporditud",
      description: "Arengusammud on edukalt imporditud ja nähtavad kategooriates.",
    });
  };

  const handleRefreshData = () => {
    loadData();
    toast({
      title: "Andmed värskendatud",
      description: "Arengusammude andmed on värskendatud.",
    });
  };
  
  const handleClearData = () => {
    if (window.confirm('Kas oled kindel, et soovid kõik imporditud arengusammud kustutada?')) {
      clearImportedData();
      loadData();
      toast({
        title: "Andmed kustutatud",
        description: "Imporditud arengusammud on edukalt kustutatud.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Õpieesmärgid</h1>
            <p className="text-muted-foreground">
              Siit leiad erinevatesse kategooriatesse jaotatud arengusammud, mis aitavad õpetamisoskusi arendada.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleRefreshData}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Värskenda
            </Button>
            
            <Button 
              onClick={() => setShowImportModal(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileUpIcon className="h-4 w-4" />
              Impordi CSV
            </Button>
            
            {actionSteps.length > 0 && (
              <Button 
                onClick={handleClearData}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Kustuta imporditud
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Laadin andmeid...</p>
            </div>
          </div>
        ) : actionSteps.length === 0 ? (
          <div className="bg-muted p-8 rounded-lg text-center">
            <p className="text-muted-foreground mb-4">Ühtegi arengusammu pole leitud.</p>
            <p className="text-sm">Klõpsa "Impordi CSV" nupul ja impordi arengusammud CSV failist.</p>
          </div>
        ) : (
          <CompetenceList 
            competences={competencesWithCounts}
            actionSteps={actionSteps}
            expandedCategory={expandedCategory}
            expandedSteps={expandedSteps}
            onToggleCategory={toggleCategory}
            onToggleStepsExpansion={toggleStepsExpansion}
          />
        )}
      </main>
      
      <CSVImportModal 
        open={showImportModal}
        onOpenChange={setShowImportModal}
        onImportSuccess={handleImportSuccess}
      />
    </div>
  );
}
