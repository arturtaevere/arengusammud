
import { ActionStep } from './types';

// Steps for categories 1-2 (classroom environment & routines)
export const classroomEnvironmentSteps: ActionStep[] = [
  {
    id: "step2",
    title: "Loo selged klassiruumi reeglid",
    description: "Kehtesta koos õpilastega selged reeglid, mis aitavad luua stabiilsuse ja turvatunde.",
    category: "2", // Maps to "Kindlate ja harjumuspäraste tegevuste korraldamine klassis"
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
    description: "Annan märku",
    category: "1", // Maps to "Hooliva ja arengut toetava õpikeskkonna loomine"
    timeEstimate: "20-30 minutit",
    resources: [
      {
        title: "Lugupidav suhtumine: suhtun austusega erineva tausta",
        url: "",
      },
      {
        title: "Kaasamine: loon kõigile õpilastele võimalusi klassiaruteludes",
        url: "",
      },
      {
        title: "Tunnustamine: märkan ja tõstan esile iga õpilase andeid",
        url: "",
      },
      {
        title: "Lugupidav keel ja käitumine: kasutan viisakat keelt ja käitumist kõigi õpilaste suhtes",
        url: "",
      },
    ],
    practiceTasks: [
      "Vaadake klassi nimekirja",
      "Arutage",
      "Mõelge läbi taktikad",
      "Pakkuge variante",
      "Vaadake kavandatu üle ja täpsustage seda kriteeriumide alusel",
      "Mängige mõned situatsioonid läbi. Näiteks: tunni alguses siseneb klassiruumi käratsev õpilane ja räägib valjuhäälselt oma sõpradega. Ta naerab"
    ],
  },
];
