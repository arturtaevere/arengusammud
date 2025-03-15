import React from 'react';

interface SessionContent {
  id: string;
  title: string;
  circleName: string;
  session: number;
  content: React.ReactNode;
}

// Session content for the first learning circle
const circle1Sessions: SessionContent[] = [
  {
    id: "c1s1",
    title: "Õppimise neuropsühholoogia",
    circleName: "Mis on õppimine?",
    session: 1,
    content: (
      <>
        <h2>Õppimise neuropsühholoogia</h2>
        
        <p>
          Inimaju on uskumatult keeruline organ, mis koosneb ligikaudu 86 miljardist neuronist ja veelgi 
          suuremast arvust sünaptilistest ühendustest. Just nende neuronite ja ühenduste kaudu toimub õppimine, 
          mille käigus ajus toimuvad struktuursed ja funktsionaalsed muutused.
        </p>
        
        <h3>Neuroplastilisus – aju muutumise võime</h3>
        
        <p>
          Neuroplastilisus on aju võime end ümber struktureerida kogemuste, õppimise või isegi 
          vigastuste tõttu. Kunagi arvati, et aju plastilisus on omane ainult lastele, kuid 
          tänapäeval teame, et see jätkub kogu elu vältel, kuigi erineva intensiivsusega.
        </p>
        
        <p>
          Õppimisel tekivad neuronite vahel uued ühendused – sünapsid. Mida rohkem mingit oskust 
          harjutatakse või infot korratakse, seda tugevamaks muutuvad vastavad ühendused, mis võimaldab 
          informatsiooni kiiremat töötlemist ja oskuste vilunud sooritamist.
        </p>
        
        <h3>Hipokampuse roll õppimises</h3>
        
        <p>
          Hipokampus on ajupiirkond, mis mängib keskset rolli uute mälestuste loomisel ja on seega 
          õppimisprotsessis kriitilise tähtsusega. Uuringud on näidanud, et hipokampuses toimub pidevalt 
          uute neuronite teke – protsess, mida nimetatakse neurogenesiks.
        </p>
        
        <p>
          Huvitav on see, et füüsiline aktiivsus, stressitaseme vähendamine ja rikkalik keskkond suurendavad 
          hipokampuse neuroneesi, mis omakorda parandab õppimisvõimet. See selgitab, miks kehaline aktiivsus 
          ja stressi maandamine on efektiivse õppimise seisukohalt olulised.
        </p>
        
        <h3>Neurotransmitterid õppimisprotsessis</h3>
        
        <p>
          Neurotransmitterid on keemilised ühendid, mis võimaldavad närvisignaalide ülekandmist neuronite vahel. 
          Mitmed neist mängivad õppimises olulist rolli:
        </p>
        
        <ul>
          <li>
            <strong>Dopamiin</strong> – motivatsiooni ja tasustamisega seotud neurotransmitter. Kui õpilane kogeb 
            edu või tunnustust, vabaneb dopamiin, mis soodustab positiivset suhtumist õppimisse.
          </li>
          <li>
            <strong>Norepinefriin</strong> – tähelepanu ja erksusega seotud neurotransmitter, mis aitab õpilasel 
            keskenduda.
          </li>
          <li>
            <strong>Atsetüülkoliin</strong> – mängib olulist rolli tähelepanu, õppimise ja mälu protsessides.
          </li>
        </ul>
        
        <h3>Metakognitsioon ja prefrontaalne korteks</h3>
        
        <p>
          Prefrontaalne korteks vastutab kõrgemate kognitiivsete funktsioonide eest, nagu planeerimine, 
          otsuste tegemine ja käitumise reguleerimine. See ajupiirkond on tihedalt seotud metakognitsiooniga – 
          võimega mõelda oma mõtlemisest ja õppimisest.
        </p>
        
        <p>
          Kui õpilased arendavad metakognitiivseid oskusi, kasutavad nad aktiivselt oma prefrontaalset korteksit, 
          mis aitab neil paremini oma õppimisprotsessi mõista ja juhtida. Need oskused arenevad järk-järgult ja 
          vajavad sihipärast harjutamist.
        </p>
        
        <h3>Emotsioonide mõju õppimisele</h3>
        
        <p>
          Amügdala ehk mandelkeha on emotsioonide, eriti hirmu, töötlemisega seotud ajupiirkond. 
          Kui õpilane tunneb ärevust või stressi, aktiveerub amügdala ja võib takistada prefrontaalse 
          korteksi tööd, vähendades seeläbi õppimisvõimet.
        </p>
        
        <p>
          Positiivsed emotsioonid seevastu soodustavad õppimist, aktiveerides ajupiirkondi, mis on seotud 
          tähelepanu, motivatsiooni ja mäluga. Seepärast on oluline luua positiivne ja toetav õpikeskkond, 
          mis vähendab stressi ja ärevust.
        </p>
        
        <h3>Praktilised soovitused õpetajatele</h3>
        
        <ol>
          <li>
            <strong>Korrake ja harjutage</strong> – aidake õpilastel luua tugevamaid närviühendusi läbi kordamise 
            ja harjutamise, kuid tehke seda hajutatult ja erinevates kontekstides.
          </li>
          <li>
            <strong>Looge positiivne õpikeskkond</strong> – vähendage stressi ja ärevust, soodustades positiivseid 
            emotsioone, mis toetavad õppimist.
          </li>
          <li>
            <strong>Soodustage aktiivset õppimist</strong> – aktiveerimine võimaldab luua tugevamaid närviühendusi 
            kui passiivne info vastuvõtmine.
          </li>
          <li>
            <strong>Kasutage multisensoorseid õppemeetodeid</strong> – mida rohkem meeli on õppimisprotsessi kaasatud, 
            seda rohkem ajupiirkondi aktiveeritakse ja seda efektiivsem on õppimine.
          </li>
          <li>
            <strong>Julgustage metakognitsiooni</strong> – õpetage õpilasi oma õppimisprotsessi jälgima, hindama ja 
            reguleerima.
          </li>
        </ol>
        
        <p>
          Neuroloogia ja psühholoogia teadmiste ühendamine võimaldab õpetajatel paremini mõista, kuidas õppimine 
          ajus toimub, ning rakendada seda teadmist efektiivsete õpetamismeetodite väljatöötamisel.
        </p>
      </>
    ),
  },
  {
    id: "c1s2",
    title: "Kasvav mõtteviis vs. fikseeritud mõtteviis",
    circleName: "Mis on õppimine?",
    session: 2,
    content: (
      <>
        <h2>Kasvav mõtteviis vs. fikseeritud mõtteviis</h2>
        
        <p>
          Carol Dwecki poolt välja töötatud mõtteviisi teooria on revolutsiooniline lähenemine, mis selgitab, 
          kuidas inimeste uskumused oma võimete kohta võivad mõjutada nende õppimist, motivatsiooni ja saavutusi. 
          See teooria eristab kahte peamist mõtteviisi: fikseeritud mõtteviisi (fixed mindset) ja kasvavat mõtteviisi 
          (growth mindset).
        </p>
        
        <h3>Fikseeritud mõtteviis</h3>
        
        <p>
          Fikseeritud mõtteviisiga inimesed usuvad, et nende põhiomadused, nagu intelligentsus või andekus, on 
          kaasasündinud ja muutumatud. Selle tulemusena:
        </p>
        
        <ul>
          <li>Nad kalduvad vältima väljakutseid, kartes läbikukkumist.</li>
          <li>Nad näevad pingutust kui märki puudulikest võimetest.</li>
          <li>Nad reageerivad negatiivselt tagasisidele ja kriitikale.</li>
          <li>Nad tunnevad end ohustatuna teiste inimeste edust.</li>
          <li>Nad annavad raskuste ilmnemisel kergelt alla.</li>
        </ul>
        
        <p>
          Klassiruumis väljendub fikseeritud mõtteviis õpilastes, kes ütlevad: "Ma ei ole matemaatikas hea," 
          või "Ma lihtsalt ei oska kirjutada." Sellised õpilased näevad hindeid kui otsustust oma võimete üle, 
          mitte kui tagasisidet nende praeguse soorituse kohta.
        </p>
        
        <h3>Kasvav mõtteviis</h3>
        
        <p>
          Kasvava mõtteviisiga inimesed usuvad, et nende põhiomadusi saab arendada läbi pingutuse, strateegia 
          ja teiste inimeste abi. Selle tulemusena:
        </p>
        
        <ul>
          <li>Nad otsivad väljakutseid ja näevad neid kui võimalusi õppimiseks.</li>
          <li>Nad mõistavad, et meisterlikkuse saavutamine nõuab pingutust.</li>
          <li>Nad näevad tagasisidet kui väärtuslikku infot õppimiseks ja arenguks.</li>
          <li>Nad leiavad inspiratsiooni teiste inimeste edust.</li>
          <li>Nad näevad tagasilööke kui ajutisi takistusi, mitte kui tõendeid oma võimete puudumisest.</li>
        </ul>
        
        <p>
          Klassiruumis väljendub kasvav mõtteviis õpilastes, kes ütlevad: "Ma ei ole veel seda matemaatika 
          probleemi lahendanud, aga ma õpin juurde," või "Ma harjutan oma kirjutamisoskust, et see paraneks."
        </p>
        
        <h3>Mõtteviisi mõju õppimisele</h3>
        
        <p>
          Uuringud on näidanud, et mõtteviis mõjutab oluliselt õpilaste õpitulemusi ja motivatsiooni. 
          Kasvava mõtteviisiga õpilased:
        </p>
        
        <ul>
          <li>Näitavad üles suuremat püsivust raskuste ees.</li>
          <li>Saavutavad kõrgemaid õpitulemusi, eriti pikemas perspektiivis.</li>
          <li>Arendavad tugevamat sisemist motivatsiooni.</li>
          <li>Võtavad omaks efektiivsemaid õpistrateegiaid.</li>
          <li>Suudavad paremini üle kanda oskusi ühest valdkonnast teise.</li>
        </ul>
        
        <h3>Mõtteviisi kujundamine klassiruumis</h3>
        
        <p>
          Õpetajatel on võimalik teadlikult kujundada õpilaste mõtteviisi. Siin on mõned strateegiad:
        </p>
        
        <ol>
          <li>
            <strong>Kiitke protsessi, mitte isikut</strong> – Öelge "Sa oled väga kõvasti töötanud" mitte "Sa oled 
            nii tark". Sellega rõhutate, et edu tuleb pingutusest, mitte muutumatutest omadustest.
          </li>
          <li>
            <strong>Õpetage aju plastilisusest</strong> – Selgitage õpilastele, kuidas aju muutub õppimise käigus. 
            Kui nad mõistavad, et aju saab "treenida" nagu lihast, on nad avatumad väljakutsetele.
          </li>
          <li>
            <strong>Kasutage "veel" sõna</strong> – Kui õpilane ütleb "Ma ei oska seda," lisage "...veel". See rõhutab, 
            et tegemist on õppeprotsessiga, mitte lõpliku otsusega võimete kohta.
          </li>
          <li>
            <strong>Looge turvaline keskkond vigadeks</strong> – Õpetage, et vead on õppimise loomulik osa ja väärtuslik 
            tagasiside. Tooge näiteid, kuidas teadlased, kunstnikud ja innovaatorid õpivad oma vigadest.
          </li>
          <li>
            <strong>Seadke kõrged, kuid saavutatavad ootused</strong> – Näidake, et usute oma õpilaste võimesse areneda 
            ja seadke standardid, mis nõuavad pingutust, kuid on saavutatavad.
          </li>
        </ol>
        
        <h3>Oma mõtteviisi teadvustamine õpetajana</h3>
        
        <p>
          Ka õpetajatel endil võib olla kas fikseeritud või kasvav mõtteviis. Kasvava mõtteviisiga õpetajad:
        </p>
        
        <ul>
          <li>Usuvad, et kõik õpilased võivad areneda ja õppida.</li>
          <li>Näevad väljakutseid kui võimalusi oma õpetamisoskuste arendamiseks.</li>
          <li>Otsivad tagasisidet ja on avatud uutele õpetamismeetoditele.</li>
          <li>Teevad koostööd kolleegidega eesmärgiga pidevalt areneda.</li>
        </ul>
        
        <p>
          Mõtteviisi mõistmine ja teadlik kujundamine on võimas tööriist, mis aitab õpetajatel luua keskkonna, 
          kus õpilased on motiveeritud, näitavad üles vastupidavust ja saavutavad oma täieliku potentsiaali.
        </p>
      </>
    ),
  },
  {
    id: "c1s3",
    title: "Õpimotivatsioon ja õpikeskkond",
    circleName: "Mis on õppimine?",
    session: 3,
    content: (
      <>
        <h2>Õpimotivatsioon ja õpikeskkond</h2>
        <p>
          Motivatsioon on õppimise mootor. Ilma motivatsioonita on raske alustada, 
          püsida ja lõpetada õppimisprotsessi. Õpikeskkond mängib motivatsiooni kujunemisel 
          ja säilitamisel keskset rolli ning õpetajatel on võimalus kujundada keskkonda, 
          mis toetab ja suurendab õpilaste motivatsiooni.
        </p>
        
        <h3>Motivatsiooni tüübid hariduses</h3>
        
        <p>
          Traditsiooniliselt eristatakse kahte põhilist motivatsiooni tüüpi:
        </p>
        
        <ul>
          <li>
            <strong>Sisemine motivatsioon</strong> (intrinsic motivation) – õppimine huvi, 
            naudingu või isikliku rahulolu pärast. Näiteks õpilane, kes loeb raamatut, sest 
            ta naudib lugemist.
          </li>
          <li>
            <strong>Väline motivatsioon</strong> (extrinsic motivation) – õppimine väliste 
            tegurite, nagu hinnete, kiituse või karistuse vältimise pärast. Näiteks õpilane, 
            kes õpib kontrolltööks, et saada hea hinne.
          </li>
        </ul>
        
        <p>
          Kuigi sisemine motivatsioon on tavaliselt seotud sügavama ja püsivama õppimisega, on ka 
          välimise motivatsiooni erinevad vormid. Ryan ja Deci enesemääratlemise teooria kohaselt 
          jaguneb väline motivatsioon omakorda:
        </p>
        
        <ul>
          <li>
            <strong>Väline regulatsioon</strong> – käitumine on motiveeritud täielikult väliste tegurite poolt, 
            nagu tasu või karistus.
          </li>
          <li>
            <strong>Pealesurutud regulatsioon</strong> – käitumine on motiveeritud väliste ootuste 
            internaliseerimisest, näiteks süütunde vältimiseks.
          </li>
          <li>
            <strong>Omaksvõetud regulatsioon</strong> – käitumine on motiveeritud selle väärtuse või 
            kasulikkuse teadvustamisest.
          </li>
          <li>
            <strong>Integreeritud regulatsioon</strong> – käitumine on motiveeritud selle kooskõlast 
            isiklike väärtuste ja identiteediga.
          </li>
        </ul>
        
        <p>
          Ideaalis liiguvad õpilased välisest regulatsioonist integreeritud regulatsiooni ja 
          sisemise motivatsiooni suunas.
        </p>
        
        <h3>Motivatsiooni mõjutavad tegurid õpikeskkonnas</h3>
        
        <p>
          Enesemääratlemise teooria kohaselt on kolm põhivajadust, mis peavad olema rahuldatud, 
          et soodustada sisemist motivatsiooni:
        </p>
        
        <ol>
          <li>
            <strong>Autonoomia</strong> – vajadus tunda, et oled oma tegevuste ja valikute juht, 
            mitte kellegi teise kontrolli all.
          </li>
          <li>
            <strong>Kompetentsus</strong> – vajadus tunda, et saad hakkama väljakutsetega ja oskad 
            kasutada oma oskusi efektiivselt.
          </li>
          <li>
            <strong>Seotus</strong> – vajadus tunda sidet ja kuuluvust teiste inimestega, samuti tunda, 
            et sinu tegevused on olulised ja väärtuslikud.
          </li>
        </ol>
        
        <h3>Õpikeskkonna kujundamine motivatsiooni toetamiseks</h3>
        
        <p>
          Õpetajad saavad kujundada õpikeskkonda, mis toetab neid kolme põhivajadust ja soodustab 
          sisemist motivatsiooni:
        </p>
        
        <h4>Autonoomia toetamine:</h4>
        
        <ul>
          <li>
            <strong>Valikuvõimaluste pakkumine</strong> – Võimaluse andmine õpilastele valida õppimismeetodeid, 
            hindamisviise või projekte.
          </li>
          <li>
            <strong>Selgituste pakkumine</strong> – Selgitage, miks mingi tegevus või õppesisu on oluline, aidates 
            õpilastel näha selle väärtust.
          </li>
          <li>
            <strong>Negatiivse keele vältimine</strong> – Ärge kasutage kontrollivat keelt, nagu "sa pead" või 
            "sa oled kohustatud".
          </li>
        </ul>
        
        <h4>Kompetentsuse toetamine:</h4>
        
        <ul>
          <li>
            <strong>Optimaalsete väljakutsete pakkumine</strong> – Ülesanded peaksid olema piisavalt väljakutsuvad, 
            kuid mitte liiga rasked.
          </li>
          <li>
            <strong>Konstruktiivse tagasiside andmine</strong> – Tagasiside peaks keskenduma protsessile, mitte isikule, 
            ja pakkuma konkreetseid soovitusi parandamiseks.
          </li>
          <li>
            <strong>Edu tunnistamine ja tähistamine</strong> – Tehke õpilaste edusammud nähtavaks ja tähistage neid.
          </li>
        </ul>
        
        <h4>Seotuse toetamine:</h4>
        
        <ul>
          <li>
            <strong>Kuuluvustunde loomine</strong> – Looge klassikogukond, kus kõik tunnevad end kaasatuna ja väärtustatuna.
          </li>
          <li>
            <strong>Koostöö soodustamine</strong> – Kasutage rühmatöid ja vastastikust õpetamist, mis tugevdavad sidemeid.
          </li>
          <li>
            <strong>Õpitava seostamine reaalse eluga</strong> – Näidake, kuidas õpitav on seotud õpilaste eluga väljaspool kooli.
          </li>
        </ul>
        
        <h3>Praktilised strateegiad motiveeriva õpikeskkonna loomiseks</h3>
        
        <ol>
          <li>
            <strong>Isiklikud eesmärgid</strong> – Aidake õpilastel seada isiklikke õpieesmärke, mis on konkreetsed, 
            mõõdetavad ja saavutatavad.
          </li>
          <li>
            <strong>Huvipõhine õpe</strong> – Lõimige õppesse õpilaste huvid ja küsimused, andes neile võimaluse 
            uurida teemasid, mis neid köidavad.
          </li>
          <li>
            <strong>Tähendusrikas hindamine</strong> – Kasutage hindamismeetodeid, mis keskenduvad õppimisele ja 
            arengule, mitte ainult lõpptulemusele.
          </li>
          <li>
            <strong>Modelleerimine</strong> – Näidake oma entusiasmi ja huvi õpitava vastu, modelleerides sisemist motivatsiooni.
          </li>
          <li>
            <strong>Õpistiilide arvestamine</strong> – Pakkuge mitmekesiseid õppemeetodeid, mis sobivad erinevate õpistiilide ja -eelistustega.
          </li>
          <li>
            <strong>Positiivne õhkkond</strong> – Looge klassiruumis õhkkond, mis on turvaline, toetav ja positiivne, 
            vähendades ärevust ja stressi.
          </li>
        </ol>
        
        <p>
          Õpimotivatsiooni toetav keskkond ei teki iseenesest, vaid on teadliku planeerimise ja kujundamise tulemus. 
          Mõistes, mis motiveerib õpilasi ja kuidas õpikeskkond mõjutab nende motivatsiooni, saavad õpetajad luua 
          tingimused, mis soodustavad sügavat ja püsivat õppimist.
        </p>
      </>
    ),
  },
  // Add more sessions for circle 1 as needed
];

// Session content for the second learning circle
const circle2Sessions: SessionContent[] = [
  {
    id: "c2s1",
    title: "Tõhusa õppimisviisi avamine",
    circleName: "Kuidas toetada ennastjuhtiva õppija kujunemist?",
    session: 1,
    content: (
      <>
        <h2>Tõhusa õppimisviisi avamine</h2>
        
        <p>
          Õpilase võime oma õppimist planeerida, jälgida ja hinnata on edukaks õppimiseks vajalikud ning osa õpilase metakognitiivsest regulatsioonist. Kuigi asjatundlikel õppijatel võivad need protsessid olla automaatsed, vajab enamik õppijaid ennastjuhtivaks õppijaks kujunemisel toetust. Neil on tarvis nende õpioskuste selgesõnaliseks muutmist, juhendamist ja harjutamist.
        </p>
        
        <h3>Õpilaste arusaam õppimisest</h3>
        
        <p>
          Paljud õpilased seostavad õppimist passiivse tegevusega – teksti lugemise, loengute kuulamise 
          või faktide pähetuupimisega. See arusaam ei vasta kaasaegsele teadmisele efektiivsest õppimisest. 
          Tegelikkuses on õppimine aktiivne protsess, mis hõlmab:
        </p>
        
        <ul>
          <li>Uue informatsiooni kogumist ja töötlemist</li>
          <li>Seoste loomist uue ja olemasoleva teadmise vahel</li>
          <li>Informatsiooni korrastamist ja struktureerimist</li>
          <li>Teadmiste rakendamist erinevates kontekstides</li>
          <li>Oma arusaamise pidevat testimist ja kohandamist</li>
        </ul>
        
        <h3>Planeerimise, tegutsemise ja refleksiooni tsükkel</h3>
        
        <p>
          Efektiivne õppimine järgib tsüklilist mudelit, mis koosneb kolmest põhietapist:
        </p>
        
        <h4>1. Planeerimine</h4>
        
        <p>
          Planeerimisfaasis õppija:
        </p>
        
        <ul>
          <li>Seab selged eesmärgid – mida ta soovib õppida või millise oskuse omandada</li>
          <li>Aktiveerib eelteadmised – mõtleb, mida ta teemast juba teab</li>
          <li>Valib sobivad õpistrateegiad – kuidas ta kavatseb eesmärgi saavutada</li>
          <li>Planeerib ajakasutust – millal ja kui kaua ta õpib</li>
          <li>Loob õppimiseks sobiva keskkonna – kõrvaldab segajad, valmistab ette vajalikud materjalid</li>
        </ul>
        
        <h4>2. Tegutsemine</h4>
        
        <p>
          Tegutsemisfaasis õppija:
        </p>
        
        <ul>
          <li>Rakendab valitud strateegiaid – loeb, kirjutab, harjutab, uurib</li>
          <li>Jälgib oma arusaamist – märkab, kui midagi jääb ebaselgeks</li>
          <li>Kohandab oma lähenemist vastavalt vajadusele – muudab strateegiat, kui see ei toimi</li>
          <li>Keskendub aktiivsele õppimisele – esitab küsimusi, loob seoseid, struktureerib informatsiooni</li>
          <li>Harjutab ja kordab – kinnistab õpitut erinevate meetoditega</li>
        </ul>
        
        <h4>3. Refleksioon</h4>
        
        <p>
          Refleksioonifaasis õppija:
        </p>
        
        <ul>
          <li>Hindab oma õppimist – kas ja mil määral ta saavutas seatud eesmärgid</li>
          <li>Analüüsib, millised strateegiad toimisid ja millised mitte</li>
          <li>Teadvustab, mida ta õppis ja mida veel selgeks teha tuleb</li>
          <li>Mõtleb, kuidas õpitut kasutada või ülekanda teistesse kontekstidesse</li>
          <li>Teeb järeldusi tuleviku õppimise tarbeks – mida järgmine kord teisiti teha</li>
        </ul>
        
        <p>
          See tsükkel kordub pidevalt, kusjuures refleksioonifaas annab sisendit uue planeerimisfaasi jaoks, 
          luues pideva õppimise ja arengu spiraali.
        </p>
        
        <h3>Kuidas tutvustada õpilastele tõhusat õppimisviisi?</h3>
        
        <p>
          Õpetajad saavad kasutada mitmeid strateegiaid, et aidata õpilastel mõista efektiivse õppimise olemust:
        </p>
        
        <ol>
          <li>
            <strong>Mudelda oma mõtlemist</strong> – Rääkige valjusti, kuidas te õpetajana ise õpite, 
            probleeme lahendate või teksti loete. Näiteks: "Kui ma loen seda lõiku, siis kõigepealt vaatan 
            üle pealkirjad, et saada ülevaade. Seejärel mõtlen, mida ma juba tean sellest teemast..."
          </li>
          <li>
            <strong>Õpetada konkreetseid õpistrateegiaid</strong> – Tutvustage ja harjutage klassis erinevaid 
            strateegiaid, nagu mõistekaartide loomine, küsimuste esitamine, teksti märgistamine, ümbersõnastamine jne.
          </li>
          <li>
            <strong>Kasutada metafoore ja visualiseerimist</strong> – Võrrelge õppimist millegi tuttavaga, 
            näiteks maja ehitamisega (vundament, korrused, katus) või teekonna läbimisega (ettevalmistus, teekond, 
            sihtpunkt).
          </li>
          <li>
            <strong>Analüüsida edulugusid</strong> – Arutage õpilastega, kuidas kuulsad teadlased, kunstnikud või 
            sportlased on õppinud ja meisterlikkuse saavutanud.
          </li>
          <li>
            <strong>Juhitud refleksioon</strong> – Pärast õppetegevusi viige läbi juhitud refleksioon, kus õpilased 
            analüüsivad, mida ja kuidas nad õppisid.
          </li>
        </ol>
        
        <h3>Praktilised harjutused klassiruumis</h3>
        
        <ol>
          <li>
            <strong>Õppimispäevik</strong> – Õpilased peavad päevikut, kuhu nad kirjutavad eesmärgid, kasutatud 
            strateegiad ja refleksiooni õppimise kohta.
          </li>
          <li>
            <strong>"Mõtle-paari-jaga"</strong> – Õpilased mõtlevad kõigepealt individuaalselt, kuidas nad 
            lahendaksid mingi ülesande, seejärel arutavad paarides ja lõpuks jagavad oma strateegiaid kogu klassiga.
          </li>
          <li>
            <strong>Õppimise detektiivid</strong> – Õpilased jälgivad ja dokumenteerivad oma õppimisprotsessi nagu 
            detektiivid, märkides üles, millal nad õppisid kõige paremini ja miks.
          </li>
          <li>
            <strong>Strateegia-konverents</strong> – Õpilased tutvustavad üksteisele strateegiaid, mida nad kasutavad 
            erinevate õppeülesannete lahendamiseks.
          </li>
          <li>
            <strong>Enne-järele diagrammid</strong> – Õpilased joonistavad, mida nad teadsid enne õppimist ja mida nad 
            teavad pärast, visualiseerides nii oma arengut.
          </li>
        </ol>
        
        <h3>Kokkuvõte</h3>
        
        <p>
          Õpetades õpilastele, kuidas õppida, anname neile elus hakkama saamiseks ühe kõige väärtuslikuma oskuse. 
          Tõhusa õppimisviisi avamine ei ole lihtsalt üks teema teiste hulgas, vaid alusvundament, millele ehitada 
          kõik järgnevad õpingud. Kui õpilased mõistavad, et tõhusad õppijad planeerivad, tegutsevad ja reflekteerivad, 
          on nad palju paremini varustatud mis tahes õppeülesandega toimetulekuks ja elukestvaks õppeks.
        </p>
      </>
    ),
  },
  {
    id: "c2s2",
    title: "Eesmärgistamine ja õpimotivatsioon",
    circleName: "Kuidas toetada ennastjuhtiva õppija kujunemist?",
    session: 2,
    content: (
      <>
        <h2>Eesmärgistamine ja õpimotivatsioon</h2>
        
        <p>
          Selged ja mõtestatud eesmärgid on ennastjuhtiva õppimise alustala. Nad pakuvad suunda, 
          struktuuri ja motivatsiooni. Mõistmine, kuidas eesmärgid mõjutavad õpimotivatsiooni ning 
          kuidas aidata õpilastel seada efektiivseid eesmärke, on ennastjuhtiva õppija kujundamisel 
          võtmetähtsusega.
        </p>
        
        <h3>Eesmärkide mõju õpimotivatsioonile</h3>
        
        <p>
          Eesmärgid mõjutavad õpimotivatsiooni mitmel viisil:
        </p>
        
        <ul>
          <li>
            <strong>Suuna määramine</strong> – Eesmärgid suunavad tähelepanu ja pingutust olulisele, 
            aidates õppimist fokusseerida.
          </li>
          <li>
            <strong>Pingutuse aktiveerimine</strong> – Väljakutsuvad eesmärgid motiveerivad õpilasi 
            rohkem pingutama kui lihtsad ülesanded.
          </li>
          <li>
            <strong>Püsivuse suurendamine</strong> – Selged eesmärgid aitavad raskustega toime tulla ja 
            jätkata pingutamist ka siis, kui tegevus pole nauditav.
          </li>
          <li>
            <strong>Strateegilise mõtlemise arendamine</strong> – Eesmärgid suunavad õpilasi mõtlema, 
            kuidas neid saavutada, arendades nii planeerimisoskust.
          </li>
          <li>
            <strong>Edutunde võimaldamine</strong> – Eesmärkide saavutamine pakub eduelamust ja tõstab 
            enesetõhusust, mis omakorda suurendab motivatsiooni.
          </li>
        </ul>
        
        <h3>Erinevad eesmärgitüübid õppimisel</h3>
        
        <p>
          Õppimisel võib eristada mitut tüüpi eesmärke, millel on erinev mõju motivatsioonile ja õppimisele:
        </p>
        
        <ul>
          <li>
            <strong>Meisterlikkuse eesmärgid</strong> (mastery goals) – Keskenduvad kompetentsuse arendamisele, 
            uute oskuste omandamisele või olemasolevate parandamisele. Need on seotud sügava õppimise ja 
            sisemise motivatsiooniga.
          </li>
          <li>
            <strong>Soorituse eesmärgid</strong> (performance goals) – Keskenduvad oma võimekuse demonstreerimisele 
            või teistest paremini tegemisele. Need võivad tekitada pinget ja ärevust, eriti läbikukkumise kartuse 
            korral.
          </li>
          <li>
            <strong>Lähenemise eesmärgid</strong> (approach goals) – Orienteeritud millegi positiivse saavutamisele 
            (nt "Tahan saada A").
          </li>
          <li>
            <strong>Vältimise eesmärgid</strong> (avoidance goals) – Oriente
