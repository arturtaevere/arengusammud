
// Session data for the learning circles

export interface StudyCircleSession {
  id: string;
  session: number;
  title: string;
  description: string;
}

export interface StudyCircle {
  id: string;
  title: string;
  description: string;
  sessions: StudyCircleSession[];
}

// Session data for the second learning circle
export const circle2Sessions: StudyCircleSession[] = [
  {
    id: "c2s1",
    session: 1,
    title: "Tõhusa õppimisviisi avamine",
    description: "Õpilase võime oma õppimist planeerida, jälgida ja hinnata on edukaks õppimiseks vajalikud ning osa õpilase metakognitiivsest regulatsioonist. Kuigi asjatundlikel õppijatel võivad need protsessid olla automaatsed, vajab enamik õppijaid ennastjuhtivaks õppijaks kujunemisel toetust. Neil on tarvis nende õpioskuste selgesõnaliseks muutmist, juhendamist ja harjutamist."
  },
  {
    id: "c2s2",
    session: 2,
    title: "Eesmärgistamine ja õpimotivatsioon",
    description: "Uurime, kuidas toetada õpilasi isiklike õpieesmärkide seadmisel ja kuidas eesmärgid mõjutavad motivatsiooni. Käsitleme SMART eesmärkide põhimõtteid."
  },
  {
    id: "c2s3",
    session: 3,
    title: "Eneseregulatsiooni strateegiad",
    description: "Vaatleme strateegiaid, mis aitavad õpilastel arendada eneseregulatsiooni oskusi, sealhulgas aja planeerimine, tähelepanu juhtimine ja emotsioonide reguleerimine."
  },
  {
    id: "c2s4",
    session: 4,
    title: "Iseseisvust toetav tagasisidestamine",
    description: "Käsitleme, kuidas anda õpilastele tagasisidet viisil, mis toetab nende autonoomiat ja arendab enesehindamise oskusi. Vaatleme erinevaid tagasiside andmise meetodeid."
  },
  {
    id: "c2s5",
    session: 5,
    title: "Metakognitiivsete oskuste arendamine",
    description: "Uurime võimalusi, kuidas arendada õpilaste metakognitiivseid oskusi, mis võimaldavad neil oma õppimist jälgida, hinnata ja reguleerida."
  },
  {
    id: "c2s6",
    session: 6,
    title: "Valikute pakkumine ja otsustamine",
    description: "Vaatleme, kuidas pakkuda õpilastele valikuid õppimises ja kuidas õpetada neid tegema teadlikke otsuseid. Uurime, kuidas valikuvabadus mõjutab motivatsiooni ja õpitulemusi."
  },
  {
    id: "c2s7",
    session: 7,
    title: "Probleemide lahendamine ja kriitiline mõtlemine",
    description: "Käsitleme strateegiaid, mis arendavad õpilaste probleemilahenduse ja kriitilise mõtlemise oskusi, mis on olulised ennastjuhtiva õppimise komponendid."
  },
  {
    id: "c2s8",
    session: 8,
    title: "Enesetõhususe arendamine",
    description: "Uurime, kuidas arendada õpilaste enesetõhusust ehk usku oma võimesse õppida ja ülesandeid edukalt sooritada. Käsitleme erinevaid strateegiaid, mis toetavad enesetõhususe kujunemist."
  },
];

export const studyCircles: StudyCircle[] = [
  {
    id: "circle2",
    title: "Kuidas toetada ennastjuhtiva õppija kujunemist?",
    description: "Õpiringi eesmärk on arendada strateegiaid ja meetodeid, mis aitavad õpilastel kujuneda ennastjuhtivateks õppijateks.",
    sessions: circle2Sessions
  }
];
