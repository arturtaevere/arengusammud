
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Folder, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Define the competence categories
const competences = [
  {
    id: '1',
    title: 'Hooliva ja arengut toetava õpikeskkonna loomine',
    description: 'Meetodid ja tegevused, mis toetavad turvalise ja hooliva õpikeskkonna loomist, kus õpilased tunnevad end väärtustatuna.',
    count: 0, // Placeholder for action steps count
  },
  {
    id: '2',
    title: 'Kindlate ja harjumuspäraste tegevuste korraldamine klassis',
    description: 'Rutiinide ja struktuuri loomine klassiruumis, mis toetab õppimist ja vähendab segavaid tegureid.',
    count: 0,
  },
  {
    id: '3',
    title: 'Tundide ja õppimise kavandamine õpieesmärkidest lähtuvalt',
    description: 'Õppetundide planeerimine nii, et need keskenduksid selgetele ja mõõdetavatele õpieesmärkidele.',
    count: 0,
  },
  {
    id: '4',
    title: 'Kaasamõtlemise ja pingutamise soodustamine',
    description: 'Meetodid, mis innustavad õpilasi aktiivselt osalema ja keerulisemate ülesannetega pingutama.',
    count: 0,
  },
  {
    id: '5',
    title: 'Iseseisva töö kavandamine',
    description: 'Tõhusate iseseisva töö võimaluste loomine, mis arendavad õpilaste enesejuhtimisoskusi.',
    count: 0,
  },
  {
    id: '6',
    title: 'Õppesisu meeldejääv edasiandmine õpilastele',
    description: 'Materjali esitlemise tehnikad, mis muudavad õppesisu arusaadavaks ja meeldejäävaks.',
    count: 0,
  },
  {
    id: '7',
    title: 'Andmete kogumine õppematerjali omandamise kohta',
    description: 'Strateegiad õpilaste edu ja väljakutsete jälgimiseks ning hindamiseks õppimise käigus.',
    count: 0,
  },
  {
    id: '8',
    title: 'Tagasiside andmine õpilastele',
    description: 'Tõhusa, konkreetse ja arendava tagasiside andmine, mis toetab õpilaste arengut.',
    count: 0,
  },
  {
    id: '9',
    title: 'Õpilaste kaasamine hindamisprotsessi',
    description: 'Meetodid, mis kaasavad õpilasi hindamisse, sealhulgas enesehindamine ja kaaslaste hindamine.',
    count: 0,
  },
  {
    id: '10',
    title: 'Ennastjuhtiva õppija toetamine',
    description: 'Strateegiad õpilaste autonoomia, vastutuse ja enesejuhtimisoskuste arendamiseks.',
    count: 0,
  },
];

export default function Competences() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pädevuste kategooriad</h1>
          <p className="text-muted-foreground">
            Siit leiad erinevatesse kategooriatesse jaotatud arengusammud, mis aitavad õpetamisoskusi arendada.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {competences.map((competence) => (
            <Collapsible
              key={competence.id}
              open={expandedCategory === competence.id}
              onOpenChange={() => toggleCategory(competence.id)}
              className="w-full"
            >
              <Card className="w-full hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <CollapsibleTrigger asChild>
                    <div className="flex justify-between items-center cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Folder className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{competence.title}</CardTitle>
                          <CardDescription className="mt-1 text-sm">{competence.description}</CardDescription>
                        </div>
                      </div>
                      <ChevronRight 
                        className={`h-5 w-5 transition-transform ${expandedCategory === competence.id ? 'rotate-90' : ''}`}
                      />
                    </div>
                  </CollapsibleTrigger>
                </CardHeader>
                
                <CollapsibleContent>
                  <CardContent className="pt-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                      <BookOpen className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                      <p className="text-slate-500 mb-4">
                        Selle kategooria alla pole veel arengusamme lisatud.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/action-steps?category=${competence.id}`}>
                          Sirvi arengusamme
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
                
                <CardFooter className="flex justify-between border-t pt-4">
                  <Badge variant="outline" className="bg-primary/5">
                    {competence.count} arengusammu
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/competences/${competence.id}`}>
                      Vaata täpsemalt <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </Collapsible>
          ))}
        </div>
      </main>
    </div>
  );
}
