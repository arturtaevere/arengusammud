
import { ActionStep } from './types';

export const category3Steps: ActionStep[] = [
  {
    id: "step3",
    title: "Kasuta selgeid õpieesmärke",
    description: "Sõnasta iga tunni alguses selged õpieesmärgid, mida soovid tunni jooksul saavutada.",
    category: "3", // Maps to "Tundide ja õppimise kavandamine õpieesmärkidest lähtuvalt"
    difficulty: "intermediate",
    timeEstimate: "10-15 minutit iga tunni kohta",
    resources: [
      {
        title: "Efektiivsete õpieesmärkide seadmine",
        url: "https://example.com/learning-objectives",
      },
    ],
  },
];
