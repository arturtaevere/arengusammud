
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
                  <SelectItem value="">Kõik tasemed</SelectItem>
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
