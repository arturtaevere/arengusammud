
import { ActionStep } from './types';

// Steps for categories 1-2 (classroom environment and routines)
export const classroomEnvironmentSteps: ActionStep[] = [
  {
    id: "step1",
    title: "Loo turvaline ja toetav keskkond",
    description: "Kujunda klassis vaimne ja emotsionaalne keskkond, kus õpilased tunnevad end turvaliselt ja väärtustatuna.",
    category: "1", // Maps to "Hooliva ja arengut toetava õpikeskkonna loomine"
    difficulty: "beginner",
    resources: [
      {
        title: "Turvalise õpikeskkonna loomine",
        url: "https://example.com/safe-environment",
      },
    ],
  },
  {
    id: "step2",
    title: "Kehtesta selged rutiinid ja reeglid",
    description: "Loo klassis selged ja järjepidevad rutiinid, mis toetavad õpilaste emotsionaalset ja akadeemilist arengut.",
    category: "2", // Maps to "Kindlate ja harjumuspäraste tegevuste korraldamine klassis"
    difficulty: "beginner",
    resources: [
      {
        title: "Efektiivsed klassiruumi rutiinid",
        url: "https://example.com/classroom-routines",
      },
    ],
  },
];
