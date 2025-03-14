
import { ActionStep } from '../types';

// Steps related to teacher positioning in the classroom
export const classroomPositioningSteps: ActionStep[] = [
  {
    id: "step10",
    title: "Õige paigutumine klassiruumis",
    description: "Otsin klassis seismiseks sellise koha, kust näen võimalikult suurt osa ruumist ning kus viibin nende õpilaste läheduses, kelle puhul on tõenäolisem, et nad võivad ülesande lahendamisest kõrvale kalduda. Annan õpilastele selgelt mõista, et jälgin nende tegevust",
    category: "1",
    difficulty: "beginner",
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
];
