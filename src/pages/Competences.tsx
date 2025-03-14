
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CompetenceList from '@/components/competences/CompetenceList';
import { 
  convertToCompetencesPageFormat, 
  convertActionStepsToCompetencesPageFormat 
} from '@/components/observation/competencyAdapter';
import { CSVImportService } from '@/services/csvImport';
import { toast } from '@/components/ui/use-toast';

export default function Competences() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [competencesWithCounts, setCompetencesWithCounts] = useState(convertToCompetencesPageFormat());
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [actionSteps, setActionSteps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load both standard and imported action steps when the component mounts
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      try {
        // Check if there's any imported data
        const importedData = CSVImportService.getImportedData();
        console.log('Imported data from storage:', Object.keys(importedData).length, 'items');
        
        // Get all action steps, including imported ones
        const allActionSteps = convertActionStepsToCompetencesPageFormat();
        console.log('All action steps count:', allActionSteps.length);
        
        if (allActionSteps.length === 0) {
          console.log('No action steps found! Check imported data.');
          toast({
            title: "Ei leitud arengusamme",
            description: "Palun impordi arengusammud CSV failist",
            variant: "destructive"
          });
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
    
    loadData();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Õpieesmärgid</h1>
          <p className="text-muted-foreground">
            Siit leiad erinevatesse kategooriatesse jaotatud arengusammud, mis aitavad õpetamisoskusi arendada.
          </p>
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
            <p className="text-sm">Mine arengusammu detailvaatesse ja importi arengusammud CSV failist.</p>
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
    </div>
  );
}
