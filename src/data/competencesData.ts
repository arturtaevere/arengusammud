
// Define the competence categories
export const competences = [
  {
    id: '1',
    title: 'Hooliva ja arengut toetava õpikeskkonna loomine',
  },
  {
    id: '2',
    title: 'Kindlate ja harjumuspäraste tegevuste korraldamine klassis',
  },
  {
    id: '3',
    title: 'Tundide ja õppimise kavandamine õpieesmärkidest lähtuvalt',
  },
  {
    id: '4',
    title: 'Kaasamõtlemise ja pingutamise soodustamine',
  },
  {
    id: '5',
    title: 'Iseseisva töö kavandamine',
  },
  {
    id: '6',
    title: 'Õppesisu meeldejääv edasiandmine õpilastele',
  },
  {
    id: '7',
    title: 'Andmete kogumine õppematerjali omandamise kohta',
  },
  {
    id: '8',
    title: 'Tagasiside andmine õpilastele',
  },
  {
    id: '9',
    title: 'Õpilaste kaasamine hindamisprotsessi',
  },
  {
    id: '10',
    title: 'Ennastjuhtiva õppija toetamine',
  },
];

// Export function to get competence title by ID
export const getCompetenceTitle = (id: string): string => {
  return competences.find(c => c.id === id)?.title || "";
};
