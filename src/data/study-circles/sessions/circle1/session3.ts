
import React from 'react';
import { SessionContent } from '../types';

const session3: SessionContent = {
  id: "c1s3",
  title: "Õpimotivatsioon ja õpikeskkond",
  circleName: "Mis on õppimine?",
  session: 3,
  content: React.createElement(React.Fragment, null,
    React.createElement('h2', null, "Õpimotivatsioon ja õpikeskkond"),
    React.createElement('p', null,
      "Motivatsioon on õppimise mootor. Ilma motivatsioonita on raske alustada, püsida ja lõpetada õppimisprotsessi. Õpikeskkond mängib motivatsiooni kujunemisel ja säilitamisel keskset rolli ning õpetajatel on võimalus kujundada keskkonda, mis toetab ja suurendab õpilaste motivatsiooni."
    ),
    
    React.createElement('h3', null, "Motivatsiooni tüübid hariduses"),
    
    React.createElement('p', null,
      "Traditsiooniliselt eristatakse kahte põhilist motivatsiooni tüüpi:"
    ),
    
    React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('strong', null, "Sisemine motivatsioon"), " (intrinsic motivation) – õppimine huvi, naudingu või isikliku rahulolu pärast. Näiteks õpilane, kes loeb raamatut, sest ta naudib lugemist."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Väline motivatsioon"), " (extrinsic motivation) – õppimine väliste tegurite, nagu hinnete, kiituse või karistuse vältimise pärast. Näiteks õpilane, kes õpib kontrolltööks, et saada hea hinne."
      )
    ),
    
    React.createElement('p', null,
      "Kuigi sisemine motivatsioon on tavaliselt seotud sügavama ja püsivama õppimisega, on ka välimise motivatsiooni erinevad vormid. Ryan ja Deci enesemääratlemise teooria kohaselt jaguneb väline motivatsioon omakorda:"
    ),
    
    React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('strong', null, "Väline regulatsioon"), " – käitumine on motiveeritud täielikult väliste tegurite poolt, nagu tasu või karistus."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Pealesurutud regulatsioon"), " – käitumine on motiveeritud väliste ootuste internaliseerimisest, näiteks süütunde vältimiseks."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Omaksvõetud regulatsioon"), " – käitumine on motiveeritud selle väärtuse või kasulikkuse teadvustamisest."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Integreeritud regulatsioon"), " – käitumine on motiveeritud selle kooskõlast isiklike väärtuste ja identiteediga."
      )
    ),
    
    React.createElement('p', null,
      "Ideaalis liiguvad õpilased välisest regulatsioonist integreeritud regulatsiooni ja sisemise motivatsiooni suunas."
    ),
    
    React.createElement('h3', null, "Motivatsiooni mõjutavad tegurid õpikeskkonnas"),
    
    React.createElement('p', null,
      "Enesemääratlemise teooria kohaselt on kolm põhivajadust, mis peavad olema rahuldatud, et soodustada sisemist motivatsiooni:"
    ),
    
    React.createElement('ol', null,
      React.createElement('li', null,
        React.createElement('strong', null, "Autonoomia"), " – vajadus tunda, et oled oma tegevuste ja valikute juht, mitte kellegi teise kontrolli all."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Kompetentsus"), " – vajadus tunda, et saad hakkama väljakutsetega ja oskad kasutada oma oskusi efektiivselt."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Seotus"), " – vajadus tunda sidet ja kuuluvust teiste inimestega, samuti tunda, et sinu tegevused on olulised ja väärtuslikud."
      )
    ),
    
    React.createElement('h3', null, "Õpikeskkonna kujundamine motivatsiooni toetamiseks"),
    
    React.createElement('p', null, "Õpetajad saavad kujundada õpikeskkonda, mis toetab neid kolme põhivajadust ja soodustab sisemist motivatsiooni:"),
    
    React.createElement('h4', null, "Autonoomia toetamine:"),
    
    React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('strong', null, "Valikuvõimaluste pakkumine"), " – Võimaluse andmine õpilastele valida õppimismeetodeid, hindamisviise või projekte."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Selgituste pakkumine"), " – Selgitage, miks mingi tegevus või õppesisu on oluline, aidates õpilastel näha selle väärtust."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Negatiivse keele vältimine"), " – Ärge kasutage kontrollivat keelt, nagu \"sa pead\" või \"sa oled kohustatud\"."
      )
    ),
    
    React.createElement('h4', null, "Kompetentsuse toetamine:"),
    
    React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('strong', null, "Optimaalsete väljakutsete pakkumine"), " – Ülesanded peaksid olema piisavalt väljakutsuvad, kuid mitte liiga rasked."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Konstruktiivse tagasiside andmine"), " – Tagasiside peaks keskenduma protsessile, mitte isikule, ja pakkuma konkreetseid soovitusi parandamiseks."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Edu tunnistamine ja tähistamine"), " – Tehke õpilaste edusammud nähtavaks ja tähistage neid."
      )
    ),
    
    React.createElement('h4', null, "Seotuse toetamine:"),
    
    React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('strong', null, "Kuuluvustunde loomine"), " – Looge klassikogukond, kus kõik tunnevad end kaasatuna ja väärtustatuna."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Koostöö soodustamine"), " – Kasutage rühmatöid ja vastastikust õpetamist, mis tugevdavad sidemeid."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Õpitava seostamine reaalse eluga"), " – Näidake, kuidas õpitav on seotud õpilaste eluga väljaspool kooli."
      )
    ),
    
    React.createElement('h3', null, "Praktilised strateegiad motiveeriva õpikeskkonna loomiseks"),
    
    React.createElement('ol', null,
      React.createElement('li', null,
        React.createElement('strong', null, "Isiklikud eesmärgid"), " – Aidake õpilastel seada isiklikke õpieesmärke, mis on konkreetsed, mõõdetavad ja saavutatavad."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Huvipõhine õpe"), " – Lõimige õppesse õpilaste huvid ja küsimused, andes neile võimaluse uurida teemasid, mis neid köidavad."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Tähendusrikas hindamine"), " – Kasutage hindamismeetodeid, mis keskenduvad õppimisele ja arengule, mitte ainult lõpptulemusele."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Modelleerimine"), " – Näidake oma entusiasmi ja huvi õpitava vastu, modelleerides sisemist motivatsiooni."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Õpistiilide arvestamine"), " – Pakkuge mitmekesiseid õppemeetodeid, mis sobivad erinevate õpistiilide ja -eelistustega."
      ),
      React.createElement('li', null,
        React.createElement('strong', null, "Positiivne õhkkond"), " – Looge klassiruumis õhkkond, mis on turvaline, toetav ja positiivne, vähendades ärevust ja stressi."
      )
    ),
    
    React.createElement('p', null,
      "Õpimotivatsiooni toetav keskkond ei teki iseenesest, vaid on teadliku planeerimise ja kujundamise tulemus. Mõistes, mis motiveerib õpilasi ja kuidas õpikeskkond mõjutab nende motivatsiooni, saavad õpetajad luua tingimused, mis soodustavad sügavat ja püsivat õppimist."
    )
  ),
};

export default session3;
