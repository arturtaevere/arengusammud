import { ActionStep } from './types';

// Steps for categories 1-2 (classroom environment & routines)
export const classroomEnvironmentSteps: ActionStep[] = [
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
    title: "Iga õpilase väärtustamine",
    description: "Annan märku, et iga õpilane on oodatud – ükskõik, kui kiiresti ta antud aines edasi jõuab, milliseid riideid ta kannab, mis keelt ta kodus räägib, kui palju sõpru tal on jne. Õppimist toetab keskkond, kus kõigil õpilastel on emotsionaalselt turvaline olla.",
    category: "1", // Maps to "Hooliva ja arengut toetava õpikeskkonna loomine"
    timeEstimate: "20-30 minutit",
    difficulty: "beginner",
    resources: [
      {
        title: "Lugupidav suhtumine: suhtun austusega erineva tausta, identiteedi ja võimetega õpilastesse, väärtustan iga õpilase ainulaadsust",
        url: "",
      },
      {
        title: "Kaasamine: loon kõigile õpilastele võimalusi klassiaruteludes, õppimis- ja otsustusprotsessides osaleda ning oma häält kuuldavale tuua",
        url: "",
      },
      {
        title: "Tunnustamine: märkan ja tõstan esile iga õpilase andeid, tugevusi ja potentsiaali, loon kõigile võrdsed võimalused ja toe arenemiseks ning õppeedu saavutamiseks",
        url: "",
      },
      {
        title: "Lugupidav keel ja käitumine: kasutan viisakat keelt ja käitumist kõigi õpilaste suhtes, vältides halvustavaid märkusi ja stereotüüpe",
        url: "",
      },
    ],
    practiceTasks: [
      "Vaadake klassi nimekirja",
      "Arutage, millised õpetaja eelarvamused või milline õpilaste käitumine võiks õpetaja keerulisse olukorda panna",
      "Mõelge läbi taktikad, kuidas säilitada ka keerulisemates olukordades uudishimulikku vaatlejapositsiooni ning reageerida hoolivalt, hinnanguid andmata",
      "Pakkuge variante, millised klassitegevused võiksid aidata õpilaste koosmeelt ja kuuluvustunnet süvendada",
      "Vaadake kavandatu üle ja täpsustage seda kriteeriumide alusel",
      "Mängige mõned situatsioonid läbi. Näiteks: tunni alguses siseneb klassiruumi käratsev õpilane ja räägib valjuhäälselt oma sõpradega. Ta naerab, teeb nalja ega istu oma kohale. Või: õpilane teeb solvava märkuse õpetaja välimuse aadressil"
    ],
  },
  {
    id: "step4",
    title: "Õpilaste kaasamine väärtuskokkulepetesse",
    description: "Vajadusel loon oma klassiga ühised arusaamad, kuidas õppimist soodustada, suunates õpilasi neid sõnastama mitte läbi käskude-keeldude, vaid positiivsete kirjelduste.",
    category: "1",
    difficulty: "beginner",
    timeEstimate: "30-45 minutit",
    resources: [
      {
        title: "Väärtustest lähtumine: enne kokkulepete (taas)sõlmimist arutlen õpilastega, millised võiksid olla klassi (või kooli) ühised väärtused ja miks",
        url: "",
      },
      {
        title: "Konstruktiivsus: jälgin, et kokkulepped oleksid sõnastatud positiivsete ideaalidena, mitte keeldudena",
        url: "",
      },
      {
        title: "Selgus: käin väärtuskokkulepped õpilastega üksikasjalikult läbi, et nende mõte oleks kõigile üheselt arusaadav",
        url: "",
      },
    ],
    practiceTasks: [
      "Arutlege, millised olemasolevaid väärtuskokkuleppeid (näiteks kooli omasid) kasutada või kuidas jõuda koos õpilastega ühiste väärtuste sõnastamiseni",
      "Mõelge läbi, kuidas võiks väärtusi siduda konkreetse käitumisega; millised võiksid olla need mudelkäitumised, milleni klassis ideaalis jõuda; pange need näidisena kirja",
      "Otsustage, kuidas koos õpilastega nende hulgast valida, et nimekiri ei saaks liiga pikk",
      "Visandage, kuidas väärtuskokkulepete sisu õpilastele selgitada ja milliseid küsimusi võiks neile esitada veendumaks, et nad kokkuleppest õigesti aru saavad",
      "Harjutage ja kohandage selgitusi vastavalt edukriteeriumidele"
    ],
  },
  {
    id: "step5",
    title: "Heade suhete loomine",
    description: "Tunnen järjepidevalt huvi, millega õpilased tegelevad. Kuulan, millest nad räägivad. Esitan küsimusi ja tunnustan. Näiteks: \"Tere hommikust, Karl! Kas kuulsin õigesti, et tegid eelmisel nädalal korvpallis väga hea tulemuse?\"",
    category: "1",
    difficulty: "beginner",
    timeEstimate: "15-30 minutit",
    resources: [
      {
        title: "Siiras huvi: võtan päriselt aega, et õpilasi tundma õppida",
        url: "",
      },
      {
        title: "Hoolivus: näitan, et õpilaste edusammud ja mured lähevad mulle korda",
        url: "",
      },
      {
        title: "Avatud suhtlemiskeskkond: võimaldan lastel vabalt väljendada oma ideid, vaatenurki, mõtteid, lugusid ja küsimusi",
        url: "",
      },
      {
        title: "Soojus: hoian õpilasega suheldes temaga silmsidet, näitan välja emotsioone (naeratan, noogutan)",
        url: "",
      },
    ],
    practiceTasks: [
      "Valige välja klass",
      "Arutage variante, kuidas saaksite õpilasi paremini tundma õppida – kas läbi klassitegevuste, individuaalsete vestlustega vahetundides või kasutades näiteks küsitlusi",
      "Mõelge läbi, kuidas saadud infot meeles pidada ja enda jaoks hoiustada",
      "Mõelge, kuidas saadud infot kõige paremini ära kasutada, näiteks arvestades õpilaste huvialadega ülesannete koostamisel ja kirjanduse valimisel või pakkudes vajadusel mõnele õpilasele tuge",
      "Koostage ajurünnaku käigus väike nimekiri küsimustest, mida oleks lihtne aeg-ajalt esitada, et õpilaste elu, käekäigu ja heaolu kohta uurida, neid julgustada ja tunnustada",
      "Harjutage nende küsimuste esitamist"
    ],
  },
  {
    id: "step6",
    title: "Ootuspärase käitumise põhjendamine",
    description: "Loon selge seose hea käitumise ja hea õppimise vahel: \"Siseneme klassiruumi vaikselt, et saaksime võimalikult kiiresti uusi asju õppima asuda.\"",
    category: "1",
    difficulty: "beginner",
    timeEstimate: "15-30 minutit",
    resources: [
      {
        title: "Enesekindel väljendus: räägin kindla kehahoiaku ja häälega",
        url: "",
      },
      {
        title: "Täpne juhis: ütlen konkreetselt välja, millist käitumist soovin klassis näha",
        url: "",
      },
      {
        title: "Julgustamine: kasutan sõbralikku hääletooni, ärgitades eksijaid uuesti proovima",
        url: "",
      },
    ],
    practiceTasks: [
      "Avage õpilaste nimekiri",
      "Tooge näiteid selle klassi levinumatest negatiivsetest käitumismustritest",
      "Pange kirja variant, kuidas sekkuksite iga negatiivse käitumismustri puhul ning kuidas seda õpilastele põhjendaksite",
      "Vaadake koos üle ning viimistlege kirjapandud sekkumisviise",
      "Harjutage viimistletud lausete edasiandmist ning hinnake seda edukriteeriumide alusel"
    ],
  },
  {
    id: "step7",
    title: "Ootuspärase käitumise väljendamine",
    description: "Ütlen, mida näha soovin, mitte seda, mida õpilased valesti tegid. Selle asemel et öelda: \"Te ei jälgi tundi\", ütlen: \"Ma soovin, et kõigi pilgud oleksid suunatud minule\"",
    category: "1",
    difficulty: "beginner",
    timeEstimate: "15-30 minutit",
    resources: [
      {
        title: "Enesekindel väljendus: räägin kindla kehahoiaku ja häälega",
        url: "",
      },
      {
        title: "Õpilaste julgustamine: kasutan sõbralikku hääletooni, ärgitades eksijaid uuesti proovima",
        url: "",
      },
      {
        title: "Veendumine: pärast meeldetuletuse tegemist pean pausi ja vaatan klassis ringi, et näidata, et juhised puudutavad kõiki õpilasi",
        url: "",
      },
    ],
    practiceTasks: [
      "Avage õpilaste nimekiri",
      "Tooge näiteid selle klassi negatiivsetest käitumismustritest",
      "Pange kirja laused, millega sekkuda, et mainitud käitumismustreid parandada, sõnastades ära selle käitumise, mida soovite näha",
      "Vaadake koos üle ja viimistlege kirjapandud sekkumisviise",
      "Harjutage viimistletud lausete ütlemist ja hinnake neid edukriteeriumide alusel"
    ],
  },
  {
    id: "step8",
    title: "Vigade tervitamine",
    description: "Olen arvestanud, et õpilased eksivad ja võtan vead rõõmuga vastu. \"Mul on väga hea meel, et sa selle vea tegid, sest see aitab meil mõista, et ... \"",
    category: "1",
    difficulty: "intermediate",
    timeEstimate: "15-30 minutit",
    resources: [
      {
        title: "Soe suhtumine: võtan eksimused vastu sõbraliku näoilme ja hoiakuga",
        url: "",
      },
      {
        title: "Täpsuse väärtustamine: väiksegi eksimuse parandamist saan õpilastele esitleda näitena kõrgetest ootustest ning seeläbi võimalusena mõnd nähtust sügavamalt mõista",
        url: "",
      },
      {
        title: "Normaliseerimine: rõhutan oma keelekasutusega, et vigade tegemine on loomulik osa õppeprotsessist ja aitab meil targemaks saada",
        url: "",
      },
      {
        title: "Julgustamine: kasutan tagasisidet andes sõbralikku hääletooni, ärgitades eksijaid uuesti proovima",
        url: "",
      },
    ],
    practiceTasks: [
      "Avage mõne järgmise tunni kava ja otsige sealt välja õpilaste küsitlemise osa",
      "Tehke nimekiri võimalikest valedest vastustest või vääritimõistmistest, mis õpilastel tekkida võivad",
      "Mõelge läbi, kuidas igale valele vastusele või väärarusaamale vastata, nii et kõlama jääks ka see, et vigade tegemine on normaalne osa õppeprotsessist ja aitab meid edasi",
      "Vaadake üle, kas kavandatud vastused klapivad edukriteeriumides sõnastatuga ning vajadusel viimistlege neid",
      "Harjutage viimistletud lausete ütlemist ning hinnake neid edukriteeriumide alusel"
    ],
  },
  {
    id: "step9",
    title: "Parastavatele õpilastele reageerimine",
    description: "Sekkun kohe ja kindlakäeliselt, kui mõned õpilased teiste vastuste üle naeravad: \"Kõik eksivad aeg-ajalt ja me oleme sel puhul alati toetavad, sest eksimise kaudu me õpimegi\"",
    category: "1",
    difficulty: "intermediate",
    timeEstimate: "15-30 minutit",
    resources: [
      {
        title: "Kiirus: reageerin mittetoetavale kommentaarile kohe ja suunan õpilaste tähelepanu tagasi ülesande lahendamisele",
        url: "",
      },
      {
        title: "Täpsus: kasutan lühikest ja tabavat meeldetuletust, et käitumist parandada",
        url: "",
      },
      {
        title: "Põhjendatus: loon seose parastava käitumise ja terve klassi arengu vahel",
        url: "",
      },
      {
        title: "Võrdne kohtlemine: jälgin, et sama ootus õpilastele kehtiks igas tunnis, et see muutuks üleüldiseks normiks",
        url: "",
      },
    ],
    practiceTasks: [
      "Avage mõne järgmise tunni kava ja otsige sealt välja õpilaste küsitlemise osa",
      "Tehke nimekiri oma ootustest, kuidas õpilased võiksid käituda, kui nad tunnis vastavad või kaaslaste vastuseid kuulavad",
      "Mõelge läbi, kuidas vastata õpilasele, kes ei täida ootusi. Jälgige, et vastus seostaks tema käitumist ja selle mõju õppimisele",
      "Vaadake üle, kas kavandatud vastused klapivad edukriteeriumidega ning vajadusel viimistlege neid",
      "Harjutage viimistletud lausete ütlemist ning hinnake neid edukriteeriumide alusel"
    ],
  },
  {
    id: "step10",
    title: "Õige paigutumine klassiruumis",
    description: "Otsin klassis seismiseks sellise koha, kust näen võimalikult suurt osa ruumist ning kus viibin nende õpilaste läheduses, kelle puhul on tõenäolisem, et nad võivad ülesande lahendamisest kõrvale kalduda. Annan õpilastele selgelt mõista, et jälgin nende tegevust",
    category: "1",
    difficulty: "beginner",
    timeEstimate: "Läbivalt tunnis",
    resources: [
      {
        title: "Kehakeele kasutamine: annan õpilastele näoilme ja kehahoiakuga märku, et jälgin nende tegevust",
        url: "",
      },
      {
        title: "Kindlad märguanded: kasutan selgeid mitterverbaalseid žeste, et mõte kohale jõuaks",
        url: "",
      },
      {
        title: "Nähtavus: valin klassiruumis sellise koha, kust näen õpilasi kõige paremini",
        url: "",
      },
    ],
    practiceTasks: [
      "Vaadake üle eelseisva tunni õpilaste paigutus ning leidke üles kohad klassiruumis, kus võib kõige rohkem tekkida probleeme nõuete järgmisega",
      "Kavandage õpetaja liikumistee nendesse kohtadesse, kus võib probleeme tekkida, et ennetada ülesandest kõrvale kalduvat käitumist",
      "Harjutage seda liikumisteed, õigesse kohta paigutumist ja õpilaste jälgimist vastavalt edukriteeriumidele"
    ],
  },
  {
    id: "step10-1",
    title: "Tõhusa õppimisviisi avamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad",
    category: "1",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [
      {
        title: "Järjepidevus: viitan sellele mudelile võimalikult sageli",
        url: "",
      },
      {
        title: "Seoste loomine: avan mudeli toimimist läbi selle, mida õpilased juba ise teevad või mida nad on näinud teisi tegemas",
        url: "",
      },
      {
        title: "Näidete toomine: avan mudelit läbi näidete ja lasen näiteid tuua ka õpilastel",
        url: "",
      },
    ],
    practiceTasks: [
      "Mõelge edukate õppijate peale, kellega kokku puutute. Mõelge, mis on need asjad, mida nad teevad, mis aitavad neil hästi õppida. Pange need tähelepanekud kirja",
      "Sobitage edukate õppijate õpistrateegiad mudelisse \"Planeeri, tegutse ja reflekteeri\". Vajadusel täiendage mõnda neist kolmest etapist veel mõnede tähelepanekute või lisategevustega",
      "Kavandage, kuidas efektiivse õppimise mudelit nende näidete abil klassile tutvustada ja hinnake tutvustust edukriteeriumide alusel"
    ],
  },
  {
    id: "step11",
    title: "Hea käitumise eraviisiline tunnustamine",
    description: "Tunnustan vaikselt õpilase üht konkreetset positiivset sammu tunnis, et seda kinnistada: \"Jaak, ma märkasin, et võtsid kohe õpiku välja\"; väldin üldsõnalist kiitmist: \"Väga tubli, Jaak\"",
    category: "1",
    difficulty: "beginner",
    timeEstimate: "Läbivalt tunnis",
    resources: [
      {
        title: "Täpsus: nimetan konkreetse teo, millega õpilane hästi hakkama sai – õpilasele peaks olema selge, mille eest teda tunnustatakse",
        url: "",
      },
      {
        title: "Soe väljendus: tunnustan siiralt ja sooja hääletooniga õppimise seisukohast olulist käitumist",
        url: "",
      },
      {
        title: "Kiirus: annan tagasiside edasi mitte rohkem kui viie sekundiga",
        url: "",
      },
      {
        title: "Isiklikkus: tunnustan õpilast vaikselt ja eraviisiliselt",
        url: "",
      },
    ],
    practiceTasks: [
      "Valige välja mõni klass, kellele õpetaja tundi annab",
      "Leidke sealt õpilased, kelle puhul võiks häid käitumisharjumusi julgustada",
      "Valmistage ette laused, mille abil kinnistada üht kuni kolme selle klassi arengule mõjusaimat käitumisviisi. Näiteks: \"Pille, märkasin, et tunniga alustamine läks sujuvamalt, sest sa vaatasid ja kuulasid mind tähelepanelikult, aitäh!\" \"Mati, märkasin, et sul oli tunni alguses meeles tahvlile vaadata ja juhendile vastavad töövahendid välja võtta, aitäh!\"",
      "Harjutage klassis ringi kõndimist ja käigu pealt nende lausete kasutamist",
      "Hinnake nende lausete väljendamist edukriteeriumide alusel"
    ],
  },
  {
    id: "step12",
    title: "Segavale käitumisele eraviisiline reageerimine",
    description: "Vestlen vaikselt õpilastega, kes tundi segavad, et parandada nende käitumist ja ennetada probleemi eskaleerumist. Näiteks: kükitan õpilase juurde, kui iseseisev ülesanne on kätte antud, ja ütlen talle poolihääli: \"Anna, kui mina klassi ees räägin, pead sa olema vaikselt, et paremini aru saada, mida järgmisena tunnis teha\"",
    category: "1",
    difficulty: "intermediate",
    timeEstimate: "Läbivalt tunnis",
    resources: [
      {
        title: "Täpne väljendus: annan õpilasele selgelt mõista, mida ta tegi valesti ja mida ta peaks edaspidi teisiti tegema",
        url: "",
      },
      {
        title: "Usk õpilasse: sisendan vestlusega õpilasse, et ta on võimeline paremini käituma: \"Ma tean, et sa suudad vaikselt kuulata, kui keegi teine räägib\"",
        url: "",
      },
      {
        title: "Põhjendatus: loon seose hea käitumisviisi ja eduka õppimise vahel",
        url: "",
      },
      {
        title: "Tasakaalukus: kasutan õpilasega rääkides rahulikku hääletooni, sõbralikku ilmet ja hinnanguvaba keelt",
        url: "",
      },
    ],
    practiceTasks: [
      "Avage õpilaste nimekiri",
      "Tehke nimekiri levinumatest käitumisviisidest, mis vajaksid selle klassi puhul parandamist (näiteks: ei istuta tunnis sirge seljaga)",
      "Valmistage ette laused, mida võiksite eraviisiliselt öelda, et parandada üht kuni kolme levinud käitumisviga selle klassi õpilaste juures",
      "Vaadake üle, kas kavandatud laused klapivad edukriteeriumidega ning vajadusel viimistlege neid",
      "Harjutage viimistletud lausete ütlemist ja hinnake neid edukriteeriumide alusel"
    ],
  },
  {
    id: "step13",
    title: "Ootuspärase käitumise sõnastamine",
    description: "Väljendan oma ootusi õpilastele läbi hea käitumise esiletõstmise, mitte läbi halva käitumise kritiseerimise. Näiteks selle asemel et öelda: \"Mitu korda ma pean teile ütlema, et ootan vaikust?\", kasutan väljendust: \"Pastapliiatsid lauale, pilgud siia\"",
    category: "1",
    difficulty: "beginner",
    timeEstimate: "Läbivalt tunnis",
    resources: [
      {
        title: "Konkreetsus: veendun, et õpilased saavad täpselt aru, millist käitumisviisi esile tõstetakse",
        url: "",
      },
      {
        title: "Konstruktiivsus: toon välja, millist käitumist soovin näha: \"Mari on juba teise küsimuse juures\"",
        url: "",
      },
      {
        title: "Lühidus: väljendan ennast võimalikult väheste sõnadega",
        url: "",
      },
      {
        title: "Tasakaalukus: kasutan õpilastega suheldes rahulikku hääletooni, sõbralikku ilmet ja hinnanguvaba keelt",
        url: "",
      },
    ],
    practiceTasks: [
      "Valige välja mõni eelseisev tund",
      "Pange kirja kolm kuni viis fraasi, mis pööravad mõne negatiivse käitumismustri innustavaks üleskutseks",
      "Vaadake üle, kas kavandatud laused klapivad edukriteeriumidega ning vajadusel viimistlege neid",
      "Harjutage viimistletud lausete ütlemist ja hinnake neid edukriteeriumide alusel"
    ],
  },
  {
    id: "step14",
    title: "Emotsionaalsete pingete äratundmine",
    description: "Aitan õpilastel ära tunda emotsionaalseid pingeid, paludes neil märku anda, kui nad kogevad tugevaid tundeid (näiteks ärevus, murelikkus, kurbus, igavus jm). On oluline, et õpilased teadvustaksid emotsioone, mis võivad nende õppimist mõjutada",
    category: "1",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [
      {
        title: "Näitlikustamine: kasutan tunni aega, et tuua näiteid emotsionaalselt keerukatest olukordadest (näiteks: pettumus kehva hinde pärast, suur pinge enne kontrolltööd)",
        url: "",
      },
      {
        title: "Aktsepteerimine: kui õpilased oma emotsioone jagavad, kuulan nad ära ilma hinnangut andmata",
        url: "",
      },
      {
        title: "Kaasamine: lasen õpilastel tunni ajal arutleda selle üle, milliseid tugevaid emotsioone nad kogevad ja millal",
        url: "",
      },
    ],
    practiceTasks: [
      "Mõelge, millised ülesanded (või kodused olukorrad) võiksid eeloleva tunni õpilastes tugevamaid emotsioone tekitada",
      "Mõelge läbi, kuidas reageerida igale võimalikule tugevale emotsioonile, mis võib klassiruumis tekkida",
      "Harjutage ühe emotsiooni näitel koos õpipartneriga sellele õigesti reageerimist. Hinnake õpetaja reageerimist edukriteeriumide alusel"
    ],
  },
  {
    id: "step15",
    title: "Emotsionaalsete pingete maandamine",
    description: "Aitan õpilastel emotsionaalse pingega toime tulla, õpetades neile, milliseid strateegiaid kasutada ja millal seda teha. (Näiteks: olukorra ümberhindamine, kaaslastelt toe saamine, tähelepanu suunamine)",
    category: "1",
    difficulty: "advanced",
    timeEstimate: "30-45 minutit",
    resources: [
      {
        title: "Näitlikustamine: kasutan tunni aega, et tuua näiteid emotsionaalselt keerukatest olukordadest ning eri viisidest, kuidas emotsioonile võib reageerida",
        url: "",
      },
      {
        title: "Kaasamine: lasen õpilastel tunni ajal paaris või väikestes rühmades arutleda selle üle, milliseid emotsioone nad kogevad ja kuidas neile reageerivad ning seejärel viin arutelu läbi kogu klassiga",
        url: "",
      },
    ],
    practiceTasks: [
      "Mõelge läbi, milliseid emotsioonidega toimetulemise viise võiks õpilastele tutvustada (näiteks: olukorra ümberhindamine, kaaslaste toe saamine, tähelepanu suunamine)",
      "Mõelge, milliste sekkumistega saaks õpilasi emotsionaalselt laetud hetkedel aidata. Näiteks: \"Mulle tundub, et te olete selle ülesande lahendamise pärast üsna mures. Mida te saaksite praegu teha, et maha rahuneda?\" või \"On täiesti mõistetav, et olete sellise tulemuse pärast pettunud. Aga kuidas saaks sellest tundest eemalduda, et jälle õppimisele keskenduda?\"",
      "Võtke ette kolm emotsionaalset olukorda ja harjutage, kuidas neid lahendada. Andke tagasisidet vastavalt edukriteeriumidele"
    ],
  },
  {
    id: "step16",
    title: "Abi küsimise õpetamine",
    description: "Õpetan õpilasi õigel hetkel abi küsima, selgitades neile, millal see on asjakohane. Näiteks: \"Proovi alati kõigepealt ise, kasuta eelnevalt õpitut ja harjutatut. Kui oled teinud kõik, mis oskad, ja tõepoolest ei tule ülesande või tegevusega toime, alles siis küsi abi kaaslaselt või minult\". Oluline on seejuures anda mõista, et ka edukad õpilased küsivad abi, kui nad seda vajavad",
    category: "1",
    difficulty: "intermediate",
    timeEstimate: "15-30 minutit",
    resources: [
      {
        title: "Näitlikustamine: toon näiteid selle kohta, millal abi küsimine on asjakohane",
        url: "",
      },
      {
        title: "Mõõdukus: mõnikord on kasulikum anda õpilastele vihjeid, selle asemel et neile õige vastus ette öelda",
        url: "",
      },
      {
        title: "Kaasamine: lasen õpilastel omavahel arutleda abi küsimise üle ning ühtlasi võimaluse üle pöörduda abi saamiseks kaasõpilaste poole, kui õpetaja ei saa sel hetkel abistada",
        url: "",
      },
    ],
    practiceTasks: [
      "Tuletage meelde mõned viimasel ajal antud ülesanded, mille korral õpilased on kas abi küsinud või ei ole abi küsinud, kuigi seda vajasid",
      "Valmistage nende abil ette näited, mille abil õpilastele selgitada, millistes olukordades on abi küsimine asjakohane ja millistes mitte",
      "Harjutage abi küsimise tava tutvustamist õpilastele, jälgides, et see klapiks edukriteeriumidega"
    ],
  },
  {
    id: "step17",
    title: "Õpilastele valikute pakkumine",
    description: "Võimaldan õpilastel teha õppimise käigus valikuid, kuidas õppematerjali omandada või kuidas õpitut väljendada. Näiteks: õpilane võib valida ise koha, kus lahendada keskendumist nõudvat ülesannet; õpilane võib valida suurema peatüki raames, millist teemat uurida; õpilane võib valida, kuidas teha teemast kaaslaste jaoks kokkuvõtet (plakat, kõne, referaat vms). Pakun õpilastele selliseid valikuid, mis on neile jõukohased ja arendavad",
    category: "1",
    difficulty: "advanced",
    timeEstimate: "30-45 minutit",
    resources: [
      {
        title: "Arengust lähtumine: pakun õpilastele valikuid, mis vastavad nende huvidele, vajadustele ja tugevustele",
        url: "",
      },
      {
        title: "Jõukohasus: pakun õpilastele valikuid, mida nad on pädevad tegema",
        url: "",
      },
      {
        title: "Järjepidevus: pakun valikuid nii õppimise korraldamisel, ülesannete lahendamisel, teadmiste rakendamisel kui ka õpitust arusaamise näitamiseks",
        url: "",
      },
      {
        title: "Läbiv toetus: juhendan teadlike otsuste tegemist, andes selleks kätte vajaliku teabe, näitlikustades otsuse tegemise protsessi ning julgustades kriitilist mõtlemist",
        url: "",
      },
    ],
    practiceTasks: [
      "Valige välja mõni klass, kellele õpetaja tundi annab",
      "Käige läbi valdkonnad, kus õpilased saaksid teha valikuid ja edendada autonoomiat, arvestades õpieesmärke (näiteks: eri õ
