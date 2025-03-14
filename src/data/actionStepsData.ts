// This is placeholder data, will be replaced with real data later
export interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  resources: {
    title: string;
    url: string;
  }[];
}

export const actionSteps: ActionStep[] = [
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
  {
    id: "step4",
    title: "Rakenda aktiivõppe meetodeid",
    description: "Kasuta tunnis erinevaid aktiivõppe meetodeid, mis kaasavad õpilasi aktiivselt õppimisse.",
    category: "4", // Maps to "Kaasamõtlemise ja pingutamise soodustamine"
    difficulty: "intermediate",
    timeEstimate: "Läbivalt tunnis",
    resources: [
      {
        title: "Aktiivsed õppemeetodid",
        url: "https://example.com/active-learning",
      },
    ],
  },
  {
    id: "step5",
    title: "Loo struktureeritud iseseisvad ülesanded",
    description: "Koosta selgete juhiste ja ajaraamiga iseseisvad tööd, mis arendavad õpilaste enesejuhtimist.",
    category: "5", // Maps to "Iseseisva töö kavandamine"
    difficulty: "advanced",
    timeEstimate: "30-60 minutit ülesande kohta",
    resources: [
      {
        title: "Iseseisva töö kavandamise põhimõtted",
        url: "https://example.com/independent-work",
      },
    ],
  },
  // Category 10 steps
  {
    id: "step10-1",
    title: "Tõhusa õppimisviisi avamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "45-60 minutit",
    resources: [],
  },
  {
    id: "step10-2",
    title: "Emotsionaalsete pingete äratundmine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-3",
    title: "Emotsionaalsete pingete maandamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-4",
    title: "Abi küsimise õpetamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "beginner",
    timeEstimate: "20-30 minutit",
    resources: [],
  },
  {
    id: "step10-5",
    title: "Õpilastele valikute pakkumine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "beginner",
    timeEstimate: "15-30 minutit",
    resources: [],
  },
  {
    id: "step10-6",
    title: "Tunniks häälestumine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "beginner",
    timeEstimate: "10-15 minutit",
    resources: [],
  },
  {
    id: "step10-7",
    title: "Õpilaste jõupingutuste suunamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "Läbivalt tunnis",
    resources: [],
  },
  {
    id: "step10-8",
    title: "Innustavate eesmärkide seadmine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-9",
    title: "Tegevuskava loomine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "45-60 minutit",
    resources: [],
  },
  {
    id: "step10-10",
    title: "Tuleviku visualiseerimine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-11",
    title: "Küsimuste esitamine loetu kohta",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "15-30 minutit",
    resources: [],
  },
  {
    id: "step10-12",
    title: "Mõtlemise suunamine läbi võrdluste",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "20-30 minutit",
    resources: [],
  },
  {
    id: "step10-13",
    title: "Teema kokku võtmine õpilaste jaoks",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "15-20 minutit",
    resources: [],
  },
  {
    id: "step10-14",
    title: "Olulise meeldejätmine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-15",
    title: "Läbimõeldud harjutamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "Läbivalt tunnis",
    resources: [],
  },
  {
    id: "step10-16",
    title: "Tegevuskava loomine iseseisvaks tööks",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-17",
    title: "Abivahenditest järk-järgult loobumine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "Pikema aja jooksul",
    resources: [],
  },
  {
    id: "step10-18",
    title: "Õpitu kasutamine uues kontekstis",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "45-60 minutit",
    resources: [],
  },
  {
    id: "step10-19",
    title: "Enesehindamise õpetamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-20",
    title: "Enese arengu jälgimise võimaldamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "20-30 minutit + järjepidev kasutamine",
    resources: [],
  },
  {
    id: "step10-21",
    title: "Õpilaste ajakasutuse jälgimine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "intermediate",
    timeEstimate: "15-30 minutit + järjepidev kasutamine",
    resources: [],
  },
  {
    id: "step10-22",
    title: "Enese tööde parandamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
  {
    id: "step10-23",
    title: "Reflekteerimise õpetamine",
    description: "Selgitan õpilastele, et tõhusad õppijad kõigepealt planeerivad, siis tegutsevad ja siis reflekteerivad.",
    category: "10",
    difficulty: "advanced",
    timeEstimate: "30-45 minutit",
    resources: [],
  },
];
