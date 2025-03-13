import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckSquare, ListTodo, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This is placeholder data that will be replaced with real data later
const actionStepsDetails = {
  // First sample step with full details
  "step1": {
    title: "Rakenda positiivset suhtlusviisi",
    description: "Kasuta positiivset keelt ja toetavat suhtlusviisi klassiruumis, et luua turvaline õhkkond.",
    category: "1",
    difficulty: "beginner" as const,
    timeEstimate: "15-20 minutit päevas",
    successCriteria: [
      "Kasutan õpilastega suheldes positiivset ja julgustavat keelt.",
      "Väljendan selgelt oma ootusi positiivses võtmes.",
      "Tunnustan õpilaste pingutusi ja edusamme.",
      "Loon õpikeskkonna, kus vigadest õppimine on väärtustatud."
    ],
    practiceTask: [
      "Pane kirja 5 levinud negatiivset väljendit, mida õpetajad kasutavad, ja sõnasta need ümber positiivseks.",
      "Jälgi ühe tunni jooksul oma keelekasutust ja märgi üles, kui tihti kasutad positiivseid väljendeid.",
      "Küsi õpilastelt tagasisidet, kuidas nad tajuvad sinu suhtlemisviisi."
    ],
    examples: "Positiivse suhtlusviisi kasutamine klassiruumis on oluline, et luua turvaline ja toetav õpikeskkond. Positiivne keelekasutus aitab õpilastel tunda end väärtustatuna ja motiveerib neid rohkem pingutama.\n\nNäide 1: Selle asemel, et öelda \"Ära räägi tunnis\", võiks öelda \"Palun keskendu praegu kuulamisele, sinu mõtted on teretulnud aruteluosas\".\n\nNäide 2: Selle asemel, et öelda \"See vastus on vale\", võiks öelda \"Tänan, et jagasid oma mõtteid. Proovime koos leida täpsema lahenduse\".",
    videoUrl: "https://example.com/video1"
  },
  // Other steps with minimal details for now
  "step2": {
    title: "Loo selged klassiruumi reeglid",
    description: "Kehtesta koos õpilastega selged reeglid, mis aitavad luua stabiilsuse ja turvatunde.",
    category: "2",
    difficulty: "beginner" as const,
    timeEstimate: "30-45 minutit",
    successCriteria: [
      "Loon õpilastega koos klassireeglid, mis on selgelt sõnastatud.",
      "Reeglid on positiivselt sõnastatud, keskendudes sellele, mida teha, mitte sellele, mida mitte teha.",
      "Reeglid on nähtavad ja kõigile arusaadavad."
    ],
    practiceTask: [
      "Kavanda tund, kus õpilastega koos luuakse klassireeglid.",
      "Koosta nimekiri positiivselt sõnastatud reeglitest.",
      "Mõtle, kuidas reegleid visualiseerida, et need oleksid meeldejäävad."
    ],
    examples: "Klassiruumi reeglite loomine on oluline samm turvalise ja produktiivse õpikeskkonna loomiseks. Reeglid peaksid olema selged, konkreetsed ja positiivselt sõnastatud.",
    videoUrl: "https://example.com/video2"
  },
  // Sample steps from "Ennastjuhtiva õppija toetamine" competence
  "step10-1": {
    title: "Tõhusa õppimisviisi avamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate" as const,
    timeEstimate: "45-60 minutit",
    successCriteria: [
      "Õpilased mõistavad õppimise kolme põhietappi: planeerimine, tegutsemine, reflekteerimine.",
      "Õpilased oskavad selgitada, miks kõik kolm etappi on olulised.",
      "Õpilased tunnevad ära, millises etapis nad parasjagu on.",
      "Õpilased oskavad vastavalt etapile valida sobivaid strateegiaid."
    ],
    practiceTask: [
      "Koosta tunnikava, kus tutvustad õpilastele õppimise kolme etappi.",
      "Loo tööleht, mis aitab õpilastel oma õppimist nende etappide abil analüüsida.",
      "Kavanda tegevus, kus õpilased saavad harjutada kõigi kolme etapi läbimist."
    ],
    examples: "Õppimine on kõige tõhusam, kui see sisaldab kolme olulist etappi: planeerimine, tegutsemine ja reflekteerimine. Et õpilased saaksid ennastjuhtivaks õppijaks, on oluline, et nad mõistaksid neid etappe ja oskaksid neid teadlikult kasutada.\n\nPlaneerimine tähendab eesmärkide seadmist, vajalike ressursside kindlaksmääramist ja strateegia valimist. Tegutsemine on aktiivne õppimine, info töötlemine ja oskuste harjutamine. Reflekteerimine sisaldab õpitu analüüsimist, tugevuste ja arengukohtade määratlemist ning järgmiste sammude kavandamist.",
    videoUrl: "https://example.com/video3"
  }
  // Other competency steps would be filled in similarly
};

const ActionStepDetail = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const [stepDetails, setStepDetails] = useState<typeof actionStepsDetails[keyof typeof actionStepsDetails] | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  
  useEffect(() => {
    // In a real application, this would be an API call or data fetch
    if (stepId && actionStepsDetails[stepId]) {
      setStepDetails(actionStepsDetails[stepId]);
    }
  }, [stepId]);
  
  if (!stepDetails) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Arengusammu ei leitud</h1>
            <Button asChild>
              <Link to="/action-steps">Tagasi arengusammude juurde</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/action-steps">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Tagasi arengusammude juurde
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">{stepDetails.title}</h1>
          <p className="text-muted-foreground mb-6">{stepDetails.description}</p>
          
          <div className="mb-8">
            <Tabs defaultValue="criteria" className="w-full">
              <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                <TabsTrigger value="criteria" className="flex items-center">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Edukriteeriumid
                </TabsTrigger>
                <TabsTrigger value="practice" className="flex items-center">
                  <ListTodo className="h-4 w-4 mr-2" />
                  Harjutusülesanne
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Näited
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="criteria" className="animate-fade-in">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Edukriteeriumid</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      {stepDetails.successCriteria?.map((criterion, index) => (
                        <li key={index}>{criterion}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="practice" className="animate-fade-in">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Harjutusülesanne</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      {stepDetails.practiceTask?.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="examples" className="animate-fade-in">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Näited</h3>
                    <div className="prose max-w-none">
                      {stepDetails.examples?.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="video" className="animate-fade-in">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Video</h3>
                    {stepDetails.videoUrl ? (
                      <div className="aspect-video bg-slate-100 flex items-center justify-center rounded-lg">
                        <Video className="h-12 w-12 text-slate-400" />
                        <p className="ml-2 text-slate-500">Videoesitlus tuleb varsti...</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Video pole veel saadaval.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActionStepDetail;
