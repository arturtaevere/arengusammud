
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckSquare, ListTodo, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/VideoPlayer";
import VideoUploader from "@/components/VideoUploader";

// Create a local storage key using the step ID to store video URLs
const getVideoStorageKey = (stepId: string) => `action_step_video_${stepId}`;

const actionStepsDetails = {
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
    examples: "Õppimine on kõige tõhusam, kui see sisaldab kolme olulist etappi: planeerimine, tegutsemine ja reflekteerimine. Et õpilased saaksid ennastjuhtivaks õppijaks, on oluline, et nad mõistaksid neid etappe ja oskaksid neid teadlikult kasutada.\n\nPlaneerimine tähendab eesmärkide seadmist, vajalike ressursside kindlaksmääramist ja strateegia valimist. Tegutsemine on aktiivne õppimine, info töötlemine ja oskuste harjutamine. Reflekteerimine sisaldab õpitu analüüsimist, tugevuste ja arengukohtade määratlemist ning järgmiste sammude kavandamist.\n\nMiks see on oluline?\nÕpilase võime oma õppimist planeerida, jälgida ja hinnata on edukaks õppimiseks vajalikud ning osa õpilase metakognitiivsest regulatsioonist. Kuigi asjatundlikel õppijatel võivad need protsessid olla automaatsed, vajab enamik õppijaid ennastjuhtivaks õppijaks kujunemisel toetust. Neil on tarvis nende õpioskuste selgesõnaliseks muutmist, juhendamist ja harjutamist.\n\nKüsides enne ülesande lahendamist, tegevuse ajal ja pärast seda endalt küsimusi, saavad õpilased teha mõtestatud otsuseid. Planeerimine julgustab õpilast mõtlema õppimise eesmärkide üle ja kaaluma, kuidas ülesandele läheneda, milliseid asjakohaseid eelteadmisi kasutada ning kuidas oma jõupingutusi jaotada. Ülesande täitmisel jälgib õpilane, kuidas tal läheb ja teeb oma valikutes vajaduse korral muudatusi. Pärast ülesannet reflekteerimine võimaldab hinnata, kui tõhus oli planeerimine ja selle elluviimine ning mida järgmiseks korraks endaga kaasa võtta.\n\nNäited\nÕpetaja jagab või koostab koos õpilastega võimalikud küsimused, mida tegevuse planeerimise, jälgimise ja hindamise ajal kasutada. Kuigi mõisteid \"planeerimine\", \"jälgimine\" ja \"hindamine\" saab tutvustada üldiselt, on neid parem õpetada konkreetse sisu ja ülesandega sidudes.\n\nPindala ja ümbermõõdu tekstülesannete lahendamine matemaatikas\nPlaneerimine:\n\"Kas ma saan täielikult aru tekstülesande situatsioonist ja sellest, mida küsitakse?\";\n\"Mis on teada ja mis on tundmatu?\";\n\"Kas ma tean, millised pindala ja ümbermõõdu valemid on ülesandes kirjeldatud geomeetrilise kujundi jaoks sobilikud?\";\n\"Mis mõõtühikutega on tegu?\".\n\nJälgimine:\n\"Kas ma lahendan probleemi samm-sammult?\";\n\"Kas olen kasutanud õigeid pindala ja ümbermõõdu valemeid?\"; \n\"Kas olen arvestanud mõõtühikuid korrektselt ja kõikides arvutustes järjepidevalt?\";\n\"Kuidas saan kontrollida vahetulemuste õigsust?\".\n\nRefleksioon/hindamine:\n\"Kas minu lõplik vastus on probleemi lahendamiseks mõistlik?\";\n\"Kas see vastab sellele, mida küsiti?\";\n\"Kas ma olen oma lõplikus vastuses lisanud sobivad mõõtühikud?\";\n\"Kas on alternatiivseid meetodeid või lähenemisviise, mida võiks selle probleemi lahendamiseks kasutada, ja kuidas saan neid oma lahendusega võrrelda?\".\n\nLugemine ja küsimustele vastamine.\nPlaneerimine:\n\"Mida mul on täpselt vaja lugeda?\"\n\"Millised leheküljed?\"\n\"Kui palju mul on aega?\"\n\"Mis ma pean teada saama?\"\n\"Millistele küsimustele vastuseid ostin?\"\n\"Mida ma juba teema kohta tean?\"\n\nJälgimine:\n\"Kas ma saan aru, mida ma loen?\"\n\"Mida need sõnad tähendavad?\"\n\"Kas siin on vastused kirjas?\"\n\"Kas ma pean midagi uuesti lugema, et paremini aru saada?\"\n\"Mis on olulised sõnad, millele joon alla tõmmata?\"\n\"Mis on oluline vihikusse kirjutada?\"\n\nRefleksioon:\n\"Kas ma leidsin vajalikud vastused?\"\n\"Kas ma sain aru, mis ma tegema pean?\"\n\"Kas ma oskan oma sõnadega öelda, mida ma lugesin?\"\n\"Kas ma oskan öelda, mis oli kõige olulisem?\"\n\nSkulptuuride tegemine kunstiõpetuses\nPlaneerimine:\n\"Milliseid materjale ja tööriistu ma selle skulptuuri tegemiseks vajan?\";\n\"Kas ma olen samalaadse skulptuuri varem loonud? Mis oli tookord lihtne? Mis oli keeruline?\";\n\"Milliseid teadmisi saan koguda skulptuuridest, mida olen varem uurinud või vaadelnud?\";\n\"Kust ma skulptuuriga alustan ja milline vaatenurk või perspektiiv näitab kõige paremini minu kavandatud kunstilist väljendust?\";\n\"Kas vajan mingeid juhendeid või mõõte, et säilitada oma skulptuuris proportsioon ja tasakaal?\".\n\nJälgimine:\n\"Kas võiksin katsetada erinevaid skulptuuritehnikaid, et minu töö oleks visuaalselt atraktiivsem?\";\n\"Kas mu skulptuuri eri elemendid on proportsioonis ja kas üldine kompositsioon on hästi tasakaalus?\";\n\"Millised selle teose osad on keerulised ja kuidas neid tõhusalt lahendada?\".\n\nRefleksioon/hindamine:\n\"Kui hästi ma oma kunstilist nägemust valmis skulptuuris tabasin?\";\n\"Kas minu kasutatud skulptuuritehnikad aitasid positiivselt kaasa teose üldisele esteetikale?\";\n\"Kas valitud vaatenurk andis skulptuuri kaudu soovitud emotsioone või sõnumeid tõhusalt edasi?\".\n\nLaboratoorne töö läätsede tüüpide kohta füüsikas\nPlaneerimine:\n\"Millist konkreetset teavet või teadmisi soovin saada sellest katsest erinevat tüüpi läätsedega?\";\n\"Milliseid läätsi ja muid vahendeid on mul katse jaoks vaja?\";\n\"Milliseid muutujaid mõõdan ja kuidas saan kontrollida muid tegureid?\";\n\"Milliseid samme katses järgin ning kuidas tagan järjepidevuse ja täpsuse?\".\n\nJälgimine:\n\"Kas kogun andmeid täpselt ja järjepidevalt?\";\n\"Milliseid muutusi märkan?\".\n\nHindamine:\n\"Millised tulemused andmetest ilmnevad ja kuidas on need seotud erinevate läätsede omadustega?\";\n\"Kas oli midagi, mis võis katsetulemusi mõjutada?\";\n\"Milliseid järeldusi saan teha erinevate läätsede optiliste omaduste kohta?\".\n\nKasutatud materjal:\nMetacognition and Self-Regulated Learning, Guidance Report, EEF, 2021 link",
    videoUrl: "https://example.com/video3"
  }
};

const ActionStepDetail = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const [stepDetails, setStepDetails] = useState<typeof actionStepsDetails[keyof typeof actionStepsDetails] | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [videoUrl, setVideoUrl] = useState<string>("");
  
  useEffect(() => {
    if (stepId && actionStepsDetails[stepId]) {
      setStepDetails(actionStepsDetails[stepId]);
      
      // Check localStorage first, then fallback to the original video URL
      const savedVideoUrl = localStorage.getItem(getVideoStorageKey(stepId));
      
      if (savedVideoUrl) {
        setVideoUrl(savedVideoUrl);
      } else if (actionStepsDetails[stepId].videoUrl && actionStepsDetails[stepId].videoUrl !== "https://example.com/video1") {
        setVideoUrl(actionStepsDetails[stepId].videoUrl);
      }
    }
  }, [stepId]);
  
  const handleVideoUploaded = (url: string) => {
    setVideoUrl(url);
    console.log("Video URL updated:", url);
    
    // Save to localStorage when a video is uploaded or changed
    if (stepId && url) {
      localStorage.setItem(getVideoStorageKey(stepId), url);
    } else if (stepId) {
      // If URL is empty, remove the item from localStorage
      localStorage.removeItem(getVideoStorageKey(stepId));
    }
    
    if (stepDetails) {
      setStepDetails({
        ...stepDetails,
        videoUrl: url
      });
    }
  };
  
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
                    
                    {videoUrl ? (
                      <div className="space-y-4">
                        <VideoPlayer src={videoUrl} />
                        <div className="mt-4">
                          <VideoUploader 
                            onVideoUploaded={handleVideoUploaded} 
                            existingVideoUrl={videoUrl}
                            hideVideoPreview={true}
                          />
                        </div>
                      </div>
                    ) : (
                      <VideoUploader onVideoUploaded={handleVideoUploaded} />
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
