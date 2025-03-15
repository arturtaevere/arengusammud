
import React from 'react';
import { SessionContent } from '../types';

const session1: SessionContent = {
  id: "c2s1",
  title: "Tõhusa õppimisviisi avamine",
  circleName: "Kuidas toetada ennastjuhtiva õppija kujunemist?",
  session: 1,
  content: React.createElement(React.Fragment, null,
    React.createElement('p', null,
      "Õpilase võime oma õppimist planeerida, jälgida ja hinnata on edukaks õppimiseks vajalikud ning osa õpilase metakognitiivsest regulatsioonist. Kuigi asjatundlikel õppijatel võivad need protsessid olla automaatsed, vajab enamik õppijaid ennastjuhtivaks õppijaks kujunemisel toetust. Neil on tarvis nende õpioskuste selgesõnaliseks muutmist, juhendamist ja harjutamist."
    ),
    
    React.createElement('p', null,
      "Küsides enne ülesande lahendamist, tegevuse ajal ja pärast seda endalt küsimusi, saavad õpilased teha mõtestatud otsuseid. Planeerimine julgustab õpilast mõtlema õppimise eesmärkide üle ja kaaluma, kuidas ülesandele läheneda, milliseid asjakohaseid eelteadmisi kasutada ning kuidas oma jõupingutusi jaotada. Ülesande täitmisel jälgib õpilane, kuidas tal läheb ja teeb oma valikutes vajaduse korral muudatusi. Pärast ülesannet reflekteerimine võimaldab hinnata, kui tõhus oli planeerimine ja selle elluviimine ning mida järgmiseks korraks endaga kaasa võtta."
    ),
    
    React.createElement('h3', { className: "text-xl font-semibold mt-6 mb-4" }, "Näited"),
    
    React.createElement('p', null,
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
      React.createElement('li', null, "\"Millistele küsimustele vastuseid ostin?\""),
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
      React.createElement('li', null, "\"Milliseid läätsi ja muid vahendeid on mul katse jaoks vaja?\;"),
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
    
    React.createElement('p', { className: "mt-8 text-sm text-muted-foreground italic" }, 
      "Kasutatud materjal: Metacognition and Self-Regulated Learning, Guidance Report, EEF, 2021 link"
    )
  ),
};

export default session1;
