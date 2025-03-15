
import React from 'react';
import { SessionContent } from '../types';

const session1: SessionContent = {
  id: "c1s1",
  title: "Õppimise neuropsühholoogia",
  circleName: "Mis on õppimine?",
  session: 1,
  content: React.createElement(React.Fragment, null,
    React.createElement('p', { className: "mb-4" },
      "Inimaju on uskumatult keeruline organ, mis koosneb ligikaudu 86 miljardist neuronist ja veelgi suuremast arvust sünaptilistest ühendustest. Just nende neuronite ja ühenduste kaudu toimub õppimine, mille käigus ajus toimuvad struktuursed ja funktsionaalsed muutused."
    ),
    
    React.createElement('p', { className: "mb-6" },
      "Küsides enne ülesande lahendamist, tegevuse ajal ja pärast seda endalt küsimusi, saavad õpilased teha mõtestatud otsuseid. Planeerimine julgustab õpilast mõtlema õppimise eesmärkide üle ja kaaluma, kuidas ülesandele läheneda, milliseid asjakohaseid eelteadmisi kasutada ning kuidas oma jõupingutusi jaotada. Ülesande täitmisel jälgib õpilane, kuidas tal läheb ja teeb oma valikutes vajaduse korral muudatusi. Pärast ülesannet reflekteerimine võimaldab hinnata, kui tõhus oli planeerimine ja selle elluviimine ning mida järgmiseks korraks endaga kaasa võtta."
    ),
    
    React.createElement('h3', { className: "text-xl font-semibold mt-6 mb-4" }, "Näited"),
    
    React.createElement('p', { className: "mb-4" },
      "Õpetaja jagab või koostab koos õpilastega võimalikud küsimused, mida tegevuse planeerimise, jälgimise ja hindamise ajal kasutada. Kuigi mõisteid \"planeerimine\", \"jälgimine\" ja \"hindamine\" saab tutvustada üldiselt, on neid parem õpetada konkreetse sisu ja ülesandega sidudes."
    ),
    
    React.createElement('h4', { className: "text-lg font-medium mt-6 mb-3" }, "Pindala ja ümbermõõdu tekstülesannete lahendamine matemaatikas"),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Planeerimine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Kas ma saan täielikult aru tekstülesande situatsioonist ja sellest, mida küsitakse?\";"),
      React.createElement('li', null, "\"Mis on teada ja mis on tundmatu?\";"),
      React.createElement('li', null, "\"Kas ma tean, millised pindala ja ümbermõõdu valemid on ülesandes kirjeldatud geomeetrilise kujundi jaoks sobilikud?\";"),
      React.createElement('li', null, "\"Mis mõõtühikutega on tegu?\".")
    ),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Jälgimine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Kas ma lahendan probleemi samm-sammult?\";"),
      React.createElement('li', null, "\"Kas olen kasutanud õigeid pindala ja ümbermõõdu valemeid?\";"),
      React.createElement('li', null, "\"Kas olen arvestanud mõõtühikuid korrektselt ja kõikides arvutustes järjepidevalt?\";"),
      React.createElement('li', null, "\"Kuidas saan kontrollida vahetulemuste õigsust?\".")
    ),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Refleksioon/hindamine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Kas minu lõplik vastus on probleemi lahendamiseks mõistlik?\";"),
      React.createElement('li', null, "\"Kas see vastab sellele, mida küsiti?\";"),
      React.createElement('li', null, "\"Kas ma olen oma lõplikus vastuses lisanud sobivad mõõtühikud?\";"),
      React.createElement('li', null, "\"Kas on alternatiivseid meetodeid või lähenemisviise, mida võiks selle probleemi lahendamiseks kasutada, ja kuidas saan neid oma lahendusega võrrelda?\".")
    ),
    
    React.createElement('h4', { className: "text-lg font-medium mt-6 mb-3" }, "Lugemine ja küsimustele vastamine"),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Planeerimine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Mida mul on täpselt vaja lugeda?\""),
      React.createElement('li', null, "\"Millised leheküljed?\""),
      React.createElement('li', null, "\"Kui palju mul on aega?\""),
      React.createElement('li', null, "\"Mis ma pean teada saama?\""),
      React.createElement('li', null, "\"Millistele küsimustele vastuseid otsin?\""),
      React.createElement('li', null, "\"Mida ma juba teema kohta tean?\"")
    ),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Jälgimine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Kas ma saan aru, mida ma loen?\""),
      React.createElement('li', null, "\"Mida need sõnad tähendavad?\""),
      React.createElement('li', null, "\"Kas siin on vastused kirjas?\""),
      React.createElement('li', null, "\"Kas ma pean midagi uuesti lugema, et paremini aru saada?\""),
      React.createElement('li', null, "\"Mis on olulised sõnad, millele joon alla tõmmata?\""),
      React.createElement('li', null, "\"Mis on oluline vihikusse kirjutada?\"")
    ),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Refleksioon:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Kas ma leidsin vajalikud vastused?\""),
      React.createElement('li', null, "\"Kas ma sain aru, mis ma tegema pean?\""),
      React.createElement('li', null, "\"Kas ma oskan oma sõnadega öelda, mida ma lugesin?\""),
      React.createElement('li', null, "\"Kas ma oskan öelda, mis oli kõige olulisem?\"")
    ),
    
    React.createElement('h4', { className: "text-lg font-medium mt-6 mb-3" }, "Skulptuuride tegemine kunstiõpetuses"),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Planeerimine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Milliseid materjale ja tööriistu ma selle skulptuuri tegemiseks vajan?\";"),
      React.createElement('li', null, "\"Kas ma olen samalaadse skulptuuri varem loonud? Mis oli tookord lihtne? Mis oli keeruline?\";"),
      React.createElement('li', null, "\"Milliseid teadmisi saan koguda skulptuuridest, mida olen varem uurinud või vaadelnud?\";"),
      React.createElement('li', null, "\"Kust ma skulptuuriga alustan ja milline vaatenurk või perspektiiv näitab kõige paremini minu kavandatud kunstilist väljendust?\";"),
      React.createElement('li', null, "\"Kas vajan mingeid juhendeid või mõõte, et säilitada oma skulptuuris proportsioon ja tasakaal?\".")
    ),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Jälgimine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Kas võiksin katsetada erinevaid skulptuuritehnikaid, et minu töö oleks visuaalselt atraktiivsem?\";"),
      React.createElement('li', null, "\"Kas mu skulptuuri eri elemendid on proportsioonis ja kas üldine kompositsioon on hästi tasakaalus?\";"),
      React.createElement('li', null, "\"Millised selle teose osad on keerulised ja kuidas neid tõhusalt lahendada?\".")
    ),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Refleksioon/hindamine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Kui hästi ma oma kunstilist nägemust valmis skulptuuris tabasin?\";"),
      React.createElement('li', null, "\"Kas minu kasutatud skulptuuritehnikad aitasid positiivselt kaasa teose üldisele esteetikale?\";"),
      React.createElement('li', null, "\"Kas valitud vaatenurk andis skulptuuri kaudu soovitud emotsioone või sõnumeid tõhusalt edasi?\".")
    ),
    
    React.createElement('h4', { className: "text-lg font-medium mt-6 mb-3" }, "Laboratoorne töö läätsede tüüpide kohta füüsikas"),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Planeerimine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Millist konkreetset teavet või teadmisi soovin saada sellest katsest erinevat tüüpi läätsedega?\";"),
      React.createElement('li', null, "\"Milliseid läätsi ja muid vahendeid on mul katse jaoks vaja?\";"),
      React.createElement('li', null, "\"Milliseid muutujaid mõõdan ja kuidas saan kontrollida muid tegureid?\";"),
      React.createElement('li', null, "\"Milliseid samme katses järgin ning kuidas tagan järjepidevuse ja täpsuse?\".")
    ),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Jälgimine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Kas kogun andmeid täpselt ja järjepidevalt?\";"),
      React.createElement('li', null, "\"Milliseid muutusi märkan?\".")
    ),
    
    React.createElement('p', { className: "font-medium mb-2" }, "Hindamine:"),
    React.createElement('ul', { className: "list-disc pl-6 mb-4 space-y-1" },
      React.createElement('li', null, "\"Millised tulemused andmetest ilmnevad ja kuidas on need seotud erinevate läätsede omadustega?\";"),
      React.createElement('li', null, "\"Kas oli midagi, mis võis katsetulemusi mõjutada?\";"),
      React.createElement('li', null, "\"Milliseid järeldusi saan teha erinevate läätsede optiliste omaduste kohta?\".")
    ),
    
    React.createElement('p', { className: "mt-8 text-sm text-muted-foreground" }, 
      React.createElement('strong', null, "Kasutatud materjal:"),
      " Metacognition and Self-Regulated Learning, Guidance Report, EEF, 2021 ",
      React.createElement('a', { 
        href: "https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/metacognition", 
        target: "_blank", 
        rel: "noopener noreferrer",
        className: "text-primary hover:underline"
      }, "link")
    ),
    
    React.createElement('h3', { className: "text-xl font-semibold mt-8 mb-4" }, "Neuroplastilisus – aju muutumise võime"),
    
    React.createElement('p', { className: "mb-4" },
      "Neuroplastilisus on aju võime end ümber struktureerida kogemuste, õppimise või isegi vigastuste tõttu. Kunagi arvati, et aju plastilisus on omane ainult lastele, kuid tänapäeval teame, et see jätkub kogu elu vältel, kuigi erineva intensiivsusega."
    ),
    
    React.createElement('p', { className: "mb-6" },
      "Õppimisel tekivad neuronite vahel uued ühendused – sünapsid. Mida rohkem mingit oskust harjutatakse või infot korratakse, seda tugevamaks muutuvad vastavad ühendused, mis võimaldab informatsiooni kiiremat töötlemist ja oskuste vilunud sooritamist."
    ),
    
    React.createElement('h3', { className: "text-xl font-semibold mt-8 mb-4" }, "Hipokampuse roll õppimises"),
    
    React.createElement('p', { className: "mb-4" },
      "Hipokampus on ajupiirkond, mis mängib keskset rolli uute mälestuste loomisel ja on seega õppimisprotsessis kriitilise tähtsusega. Uuringud on näidanud, et hipokampuses toimub pidevalt uute neuronite teke – protsess, mida nimetatakse neurogenesiks."
    ),
    
    React.createElement('p', { className: "mb-6" },
      "Huvitav on see, et füüsiline aktiivsus, stressitaseme vähendamine ja rikkalik keskkond suurendavad hipokampuse neuroneesi, mis omakorda parandab õppimisvõimet. See selgitab, miks kehaline aktiivsus ja stressi maandamine on efektiivse õppimise seisukohalt olulised."
    ),
    
    React.createElement('h3', { className: "text-xl font-semibold mt-8 mb-4" }, "Neurotransmitterid õppimisprotsessis"),
    
    React.createElement('p', { className: "mb-4" },
      "Neurotransmitterid on keemilised ühendid, mis võimaldavad närvisignaalide ülekandmist neuronite vahel. Mitmed neist mängivad õppimises olulist rolli:"
    ),
    
    React.createElement('ul', { className: "list-disc pl-6 mb-6 space-y-2" },
      React.createElement('li', null,
        React.createElement('strong', null, "Dopamiin"), " – motivatsiooni ja tasustamisega seotud neurotransmitter. Kui õpilane kogeb edu või tunnustust, vabaneb dopamiin, mis soodustab positiivset suhtumist õppimisse."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Norepinefriin"), " – tähelepanu ja erksusega seotud neurotransmitter, mis aitab õpilasel keskenduda."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Atsetüülkoliin"), " – mängib olulist rolli tähelepanu, õppimise ja mälu protsessides."
      )
    ),
    
    React.createElement('h3', { className: "text-xl font-semibold mt-8 mb-4" }, "Metakognitsioon ja prefrontaalne korteks"),
    
    React.createElement('p', { className: "mb-4" },
      "Prefrontaalne korteks vastutab kõrgemate kognitiivsete funktsioonide eest, nagu planeerimine, otsuste tegemine ja käitumise reguleerimine. See ajupiirkond on tihedalt seotud metakognitsiooniga – võimega mõelda oma mõtlemisest ja õppimisest."
    ),
    
    React.createElement('p', { className: "mb-6" },
      "Kui õpilased arendavad metakognitiivseid oskusi, kasutavad nad aktiivselt oma prefrontaalset korteksit, mis aitab neil paremini oma õppimisprotsessi mõista ja juhtida. Need oskused arenevad järk-järgult ja vajavad sihipärast harjutamist."
    ),
    
    React.createElement('h3', { className: "text-xl font-semibold mt-8 mb-4" }, "Emotsioonide mõju õppimisele"),
    
    React.createElement('p', { className: "mb-4" },
      "Amügdala ehk mandelkeha on emotsioonide, eriti hirmu, töötlemisega seotud ajupiirkond. Kui õpilane tunneb ärevust või stressi, aktiveerub amügdala ja võib takistada prefrontaalse korteksi tööd, vähendades seeläbi õppimisvõimet."
    ),
    
    React.createElement('p', { className: "mb-6" },
      "Positiivsed emotsioonid seevastu soodustavad õppimist, aktiveerides ajupiirkondi, mis on seotud tähelepanu, motivatsiooni ja mäluga. Seepärast on oluline luua positiivne ja toetav õpikeskkond, mis vähendab stressi ja ärevust."
    ),
    
    React.createElement('h3', { className: "text-xl font-semibold mt-8 mb-4" }, "Praktilised soovitused õpetajatele"),
    
    React.createElement('ol', { className: "list-decimal pl-6 mb-6 space-y-2" },
      React.createElement('li', null,
        React.createElement('strong', null, "Korrake ja harjutage"), " – aidake õpilastel luua tugevamaid närviühendusi läbi kordamise ja harjutamise, kuid tehke seda hajutatult ja erinevates kontekstides."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Looge positiivne õpikeskkond"), " – vähendage stressi ja ärevust, soodustades positiivseid emotsioone, mis toetavad õppimist."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Soodustage aktiivset õppimist"), " – aktiveerimine võimaldab luua tugevamaid närviühendusi kui passiivne info vastuvõtmine."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Kasutage multisensoorseid õppemeetodeid"), " – mida rohkem meeli on õppimisprotsessi kaasatud, seda rohkem ajupiirkondi aktiveeritakse ja seda efektiivsem on õppimine."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Julgustage metakognitsiooni"), " – õpetage õpilasi oma õppimisprotsessi jälgima, hindama ja reguleerima."
      )
    ),
    
    React.createElement('p', { className: "mb-4" },
      "Neuroloogia ja psühholoogia teadmiste ühendamine võimaldab õpetajatel paremini mõista, kuidas õppimine ajus toimub, ning rakendada seda teadmist efektiivsete õpetamismeetodite väljatöötamisel."
    )
  ),
};

export default session1;

