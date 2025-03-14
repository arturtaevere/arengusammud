
import { ActionStep } from './types';

export const category1Steps: ActionStep[] = [
  {
    id: "step1",
    title: "Rakenda positiivset suhtlusviisi",
    description: "Kasuta positiivset keelt ja toetavat suhtlusviisi klassiruumis, et luua turvaline õhkkond.",
    category: "1", // Maps to "Hooliva ja arengut toetava õpikeskkonna loomine"
    difficulty: "beginner",
    timeEstimate: "15-20 minutit päevas",
    resources: [
      {
        title: "Positiivse klassikliima loomine",
        url: "https://example.com/positive-classroom",
      },
    ],
  },
];
