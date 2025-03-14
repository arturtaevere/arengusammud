
import { ActionStep } from '../types';

// Steps related to classroom rules and structure
export const classroomRulesSteps: ActionStep[] = [
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
];
