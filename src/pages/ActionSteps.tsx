import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ActionStepCard from "@/components/ActionStepCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Define the competence categories
const competences = [
  {
    id: '1',
    title: 'Hooliva ja arengut toetava õpikeskkonna loomine',
  },
  {
    id: '2',
    title: 'Kindlate ja harjumuspäraste tegevuste korraldamine klassis',
  },
  {
    id: '3',
    title: 'Tundide ja õppimise kavandamine õpieesmärkidest lähtuvalt',
  },
  {
    id: '4',
    title: 'Kaasamõtlemise ja pingutamise soodustamine',
  },
  {
    id: '5',
    title: 'Iseseisva töö kavandamine',
  },
  {
    id: '6',
    title: 'Õppesisu meeldejääv edasiandmine õpilastele',
  },
  {
    id: '7',
    title: 'Andmete kogumine õppematerjali omandamise kohta',
  },
  {
    id: '8',
    title: 'Tagasiside andmine õpilastele',
  },
  {
    id: '9',
    title: 'Õpilaste kaasamine hindamisprotsessi',
  },
  {
    id: '10',
    title: 'Ennastjuhtiva õppija toetamine',
  },
];

// This is placeholder data, will be replaced with real data later
const actionSteps = [
  {
    id: "step1",
    title: "Rakenda positiivset suhtlusviisi",
    description: "Kasuta positiivset keelt ja toetavat suhtlusviisi klassiruumis, et luua turvaline õhkkond.",
    category: "1", // Maps to "Hooliva ja arengut toetava õpikeskkonna loomine"
    difficulty: "beginner" as const,
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
    difficulty: "beginner" as const,
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
    difficulty: "intermediate" as const,
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
    difficulty: "intermediate" as const,
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
    difficulty: "advanced" as const,
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
    description: "Tutvusta õpilastele erinevaid efektiivseid õppimismeetodeid ja -strateegiaid.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "45-60 minutit",
    resources: [
      {
        title: "Tõhusad õppimisstrateegiad",
        url: "https://example.com/learning-strategies",
      },
    ],
  },
  {
    id: "step10-2",
    title: "Emotsionaalsete pingete äratundmine",
    description: "Õpeta õpilasi ära tundma emotsionaalseid pingeid, mis võivad õppimist takistada.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-3",
    title: "Emotsionaalsete pingete maandamine",
    description: "Tutvusta õpilastele tehnikaid, mis aitavad emotsionaalseid pingeid leevendada.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-4",
    title: "Abi küsimise õpetamine",
    description: "Õpeta õpilasi abi küsima, kui nad on õppimisel tupikusse jõudnud.",
    category: "10",
    difficulty: "beginner" as const,
    timeEstimate: "20-30 minutit",
    resources: [],
  },
  {
    id: "step10-5",
    title: "Õpilastele valikute pakkumine",
    description: "Paku õpilastele valikuvõimalusi, et arendada nende otsustusoskust ja iseseisvust.",
    category: "10",
    difficulty: "beginner" as const,
    timeEstimate: "15-30 minutit",
    resources: [],
  },
  {
    id: "step10-6",
    title: "Tunniks häälestumine",
    description: "Õpeta õpilastele, kuidas end vaimselt tunniks ette valmistada.",
    category: "10",
    difficulty: "beginner" as const,
    timeEstimate: "10-15 minutit",
    resources: [],
  },
  {
    id: "step10-7",
    title: "Õpilaste jõupingutuste suunamine",
    description: "Aita õpilastel oma jõupingutusi efektiivselt suunata õpieesmärkide saavutamiseks.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "Läbivalt tunnis",
    resources: [],
  },
  {
    id: "step10-8",
    title: "Innustavate eesmärkide seadmine",
    description: "Õpeta õpilasi seadma motiveerivaid ja saavutatavaid õpieesmärke.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-9",
    title: "Tegevuskava loomine",
    description: "Juhenda õpilasi looma konkreetseid tegevuskavasid eesmärkide saavutamiseks.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "45-60 minutit",
    resources: [],
  },
  {
    id: "step10-10",
    title: "Tuleviku visualiseerimine",
    description: "Õpeta õpilasi visualiseerima oma edu ja eesmärkide saavutamist.",
    category: "10",
    difficulty: "advanced" as const,
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-11",
    title: "Küsimuste esitamine loetu kohta",
    description: "Õpeta õpilasi esitama täpsustavaid ja analüütilisi küsimusi loetu kohta.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "15-30 minutit",
    resources: [],
  },
  {
    id: "step10-12",
    title: "Mõtlemise suunamine läbi võrdluste",
    description: "Juhenda õpilasi kasutama võrdlusi sügavama mõistmise saavutamiseks.",
    category: "10",
    difficulty: "advanced" as const,
    timeEstimate: "20-30 minutit",
    resources: [],
  },
  {
    id: "step10-13",
    title: "Teema kokku võtmine õpilaste jaoks",
    description: "Õpeta õpilastele teemasid iseseisvalt kokku võtma ja olulisimat välja tooma.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "15-20 minutit",
    resources: [],
  },
  {
    id: "step10-14",
    title: "Olulise meeldejätmine",
    description: "Tutvusta õpilastele mnemotehnilisi võtteid ja olulise info meeldejätmise strateegiaid.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-15",
    title: "Läbimõeldud harjutamine",
    description: "Õpeta õpilasi teadlikult ja eesmärgipäraselt harjutama.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "Läbivalt tunnis",
    resources: [],
  },
  {
    id: "step10-16",
    title: "Tegevuskava loomine iseseisvaks tööks",
    description: "Juhenda õpilasi looma iseseisvaks tööks struktuuri ja ajakava.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-17",
    title: "Abivahenditest järk-järgult loobumine",
    description: "Õpeta õpilastele järk-järgult vähem toetuma välistele abivahenditele.",
    category: "10",
    difficulty: "advanced" as const,
    timeEstimate: "Pikema aja jooksul",
    resources: [],
  },
  {
    id: "step10-18",
    title: "Õpitu kasutamine uues kontekstis",
    description: "Juhenda õpilaste rakendama õpitud teadmisi ja oskusi uutes olukordades.",
    category: "10",
    difficulty: "advanced" as const,
    timeEstimate: "45-60 minutit",
    resources: [],
  },
  {
    id: "step10-19",
    title: "Enesehindamise õpetamine",
    description: "Õpeta õpilasi oma tööd ja arengut objektiivselt hindama.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-20",
    title: "Enese arengu jälgimise võimaldamine",
    description: "Paku õpilastele vahendeid ja strateegiaid oma arengu jälgimiseks.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "20-30 minutit + järjepidev kasutamine",
    resources: [],
  },
  {
    id: "step10-21",
    title: "Õpilaste ajakasutuse jälgimine",
    description: "Õpeta õpilastele oma ajakasutust jälgima ja analüüsima.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "15-30 minutit + järjepidev kasutamine",
    resources: [],
  },
  {
    id: "step10-22",
    title: "Enese tööde parandamine",
    description: "Juhenda õpilaste ise oma töödes vigu leidma ja parandama.",
    category: "10",
    difficulty: "advanced" as const,
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-23",
    title: "Reflekteerimise õpetamine",
    description: "Õpeta õpilasi reflekteerima oma õppimisprotsessi ja arengut.",
    category: "10",
    difficulty: "advanced" as const,
    timeEstimate: "30-45 minutit",
    resources: [],
  },
];

const ActionSteps = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [filteredSteps, setFilteredSteps] = useState(actionSteps);
  
  // Get current category title
  const currentCategory = competences.find(c => c.id === categoryFilter)?.title || "Kõik arengusammud";

  // Apply filters
  useEffect(() => {
    let result = actionSteps;
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(step => step.category === categoryFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        step => 
          step.title.toLowerCase().includes(lowercaseSearchTerm) || 
          step.description.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter) {
      result = result.filter(step => step.difficulty === difficultyFilter);
    }
    
    setFilteredSteps(result);
  }, [categoryFilter, searchTerm, difficultyFilter]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link to="/competences">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Tagasi
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-2">{currentCategory}</h1>
          <p className="text-muted-foreground">
            Sirvi ja rakenda konkreetseid arengusamme, mis aitavad sul selles valdkonnas areneda.
          </p>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Otsi arengusamme..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-48">
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Tase" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Kõik tasemed</SelectItem>
                  <SelectItem value="beginner">Algaja</SelectItem>
                  <SelectItem value="intermediate">Keskmine</SelectItem>
                  <SelectItem value="advanced">Edasijõudnu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Action Steps Grid */}
        {filteredSteps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSteps.map((step) => (
              <ActionStepCard
                key={step.id}
                id={step.id}
                title={step.title}
                description={step.description}
                category={competences.find(c => c.id === step.category)?.title || ""}
                difficulty={step.difficulty}
                timeEstimate={step.timeEstimate}
                resources={step.resources}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-100">
            <Search className="h-12 w-12 mx-auto text-slate-400 mb-2" />
            <h3 className="text-lg font-medium mb-1">Ühtegi arengusammu ei leitud</h3>
            <p className="text-muted-foreground mb-4">
              Proovi muuta otsingut või filtreerimist, et näha rohkem tulemusi.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setDifficultyFilter("");
              }}
            >
              Tühista filtrid
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ActionSteps;
