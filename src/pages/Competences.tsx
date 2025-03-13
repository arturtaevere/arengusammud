
import { useState, useEffect } from 'react';
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
    count: 0, // This will be updated dynamically
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

// Import action steps data
const actionSteps = [
  {
    id: "step1",
    title: "Rakenda positiivset suhtlusviisi",
    description: "Kasuta positiivset keelt ja toetavat suhtlusviisi klassiruumis, et luua turvaline õhkkond.",
    category: "1", // Maps to "Hooliva ja arengut toetava õpikeskkonna loomine"
    difficulty: "beginner",
    timeEstimate: "15-20 minutit päevas",
    resources: [
      {
        title: "Positiivse klassikliima loomine",
        url: "https://example.com/positive-classroom",
      },
    ],
  },
  {
    id: "step2",
    title: "Loo selged klassiruumi reeglid",
    description: "Kehtesta koos õpilastega selged reeglid, mis aitavad luua stabiilsuse ja turvatunde.",
    category: "2", // Maps to "Kindlate ja harjumuspäraste tegevuste korraldamine klassis"
    difficulty: "beginner",
    timeEstimate: "30-45 minutit",
    resources: [
      {
        title: "Tõhusate klassireeglite loomine",
        url: "https://example.com/classroom-rules",
      },
    ],
  },
  {
    id: "step3",
    title: "Kasuta selgeid õpieesmärke",
    description: "Sõnasta iga tunni alguses selged õpieesmärgid, mida soovid tunni jooksul saavutada.",
    category: "3", // Maps to "Tundide ja õppimise kavandamine õpieesmärkidest lähtuvalt"
    difficulty: "intermediate",
    timeEstimate: "10-15 minutit iga tunni kohta",
    resources: [
      {
        title: "Efektiivsete õpieesmärkide seadmine",
        url: "https://example.com/learning-objectives",
      },
    ],
  },
  {
    id: "step4",
    title: "Rakenda aktiivõppe meetodeid",
    description: "Kasuta tunnis erinevaid aktiivõppe meetodeid, mis kaasavad õpilasi aktiivselt õppimisse.",
    category: "4", // Maps to "Kaasamõtlemise ja pingutamise soodustamine"
    difficulty: "intermediate",
    timeEstimate: "Läbivalt tunnis",
    resources: [
      {
        title: "Aktiivsed õppemeetodid",
        url: "https://example.com/active-learning",
      },
    ],
  },
  {
    id: "step5",
    title: "Loo struktureeritud iseseisvad ülesanded",
    description: "Koosta selgete juhiste ja ajaraamiga iseseisvad tööd, mis arendavad õpilaste enesejuhtimist.",
    category: "5", // Maps to "Iseseisva töö kavandamine"
    difficulty: "advanced",
    timeEstimate: "30-60 minutit ülesande kohta",
    resources: [
      {
        title: "Iseseisva töö kavandamise põhimõtted",
        url: "https://example.com/independent-work",
      },
    ],
  },
  {
    id: "step10-1",
    title: "Tõhusa õppimisviisi avamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "45-60 minutit",
    resources: [],
  },
  {
    id: "step10-2",
    title: "Emotsionaalsete pingete äratundmine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-3",
    title: "Emotsionaalsete pingete maandamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-4",
    title: "Abi küsimise õpetamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "beginner",
    timeEstimate: "20-30 minutit",
    resources: [],
  },
  {
    id: "step10-5",
    title: "Õpilastele valikute pakkumine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "beginner",
    timeEstimate: "15-30 minutit",
    resources: [],
  },
  {
    id: "step10-6",
    title: "Tunniks häälestumine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "beginner",
    timeEstimate: "10-15 minutit",
    resources: [],
  },
  {
    id: "step10-7",
    title: "Õpilaste jõupingutuste suunamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "Läbivalt tunnis",
    resources: [],
  },
  {
    id: "step10-8",
    title: "Innustavate eesmärkide seadmine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-9",
    title: "Tegevuskava loomine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "45-60 minutit",
    resources: [],
  },
  {
    id: "step10-10",
    title: "Tuleviku visualiseerimine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-11",
    title: "Küsimuste esitamine loetu kohta",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "15-30 minutit",
    resources: [],
  },
  {
    id: "step10-12",
    title: "Mõtlemise suunamine läbi võrdluste",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "20-30 minutit",
    resources: [],
  },
  {
    id: "step10-13",
    title: "Teema kokku võtmine õpilaste jaoks",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "15-20 minutit",
    resources: [],
  },
  {
    id: "step10-14",
    title: "Olulise meeldejätmine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-15",
    title: "Läbimõeldud harjutamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "Läbivalt tunnis",
    resources: [],
  },
  {
    id: "step10-16",
    title: "Tegevuskava loomine iseseisvaks tööks",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-17",
    title: "Abivahenditest järk-järgult loobumine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "Pikema aja jooksul",
    resources: [],
  },
  {
    id: "step10-18",
    title: "Õpitu kasutamine uues kontekstis",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "45-60 minutit",
    resources: [],
  },
  {
    id: "step10-19",
    title: "Enesehindamise õpetamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-20",
    title: "Enese arengu jälgimise võimaldamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "20-30 minutit + järjepidev kasutamine",
    resources: [],
  },
  {
    id: "step10-21",
    title: "Õpilaste ajakasutuse jälgimine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "15-30 minutit + järjepidev kasutamine",
    resources: [],
  },
  {
    id: "step10-22",
    title: "Enese tööde parandamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-23",
    title: "Reflekteerimise õpetamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
];

export default function Competences() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [competencesWithCounts, setCompetencesWithCounts] = useState(competences);

  // Calculate counts for each competence category
  useEffect(() => {
    const counts = actionSteps.reduce((acc, step) => {
      if (!acc[step.category]) {
        acc[step.category] = 0;
      }
      acc[step.category]++;
      return acc;
    }, {} as Record<string, number>);

    const updatedCompetences = competences.map(competence => ({
      ...competence,
      count: counts[competence.id] || 0
    }));

    setCompetencesWithCounts(updatedCompetences);
  }, []);

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
          {competencesWithCounts.map((competence) => (
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
                    {competence.count > 0 ? (
                      <div className="space-y-2">
                        {actionSteps
                          .filter(step => step.category === competence.id)
                          .slice(0, 3) // Show just a preview of 3 items
                          .map(step => (
                            <div key={step.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                              <p className="font-medium">{step.title}</p>
                              <p className="text-sm text-slate-500 mt-1">{step.description}</p>
                            </div>
                          ))}
                        {competence.count > 3 && (
                          <p className="text-center text-sm text-slate-500 mt-2">
                            + {competence.count - 3} muud arengusammu
                          </p>
                        )}
                      </div>
                    ) : (
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
                    )}
                  </CardContent>
                </CollapsibleContent>
                
                <CardFooter className="flex justify-between border-t pt-4">
                  <Badge variant="outline" className="bg-primary/5">
                    {competence.count} arengusammu
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/action-steps?category=${competence.id}`}>
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
