
import { ActionStep } from './types';

// Steps for categories 1-2 (classroom environment & routines)
export const classroomEnvironmentSteps: ActionStep[] = [
  {
    id: "step1",
    title: "Rakenda positiivset suhtlusviisi",
    description: "Kasuta positiivset keelt ja toetavat suhtlusviisi klassiruumis, et luua turvaline õhkkond.",
    category: "1", // Maps to "Hooliva ja arengut toetava õpikeskkonna loomine"
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
    timeEstimate: "30-45 minutit",
    resources: [
      {
        title: "Tõhusate klassireeglite loomine",
        url: "https://example.com/classroom-rules",
      },
    ],
  },
];
