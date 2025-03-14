
// Helper function to get competency description
export function getCompetencyDescription(compId: string): string {
  const descriptionMap: Record<string, string> = {
    comp1: 'Meetodid ja tegevused, mis toetavad turvalise ja hooliva õpikeskkonna loomist, kus õpilased tunnevad end väärtustatuna.',
    comp2: 'Rutiinide ja struktuuri loomine klassiruumis, mis toetab õppimist ja vähendab segavaid tegureid.',
    comp3: 'Õppetundide planeerimine nii, et need keskenduksid selgetele ja mõõdetavatele õpieesmärkidele.',
    comp4: 'Meetodid, mis innustavad õpilasi aktiivselt osalema ja keerulisemate ülesannetega pingutama.',
    comp5: 'Tõhusate iseseisva töö võimaluste loomine, mis arendavad õpilaste enesejuhtimisoskusi.',
    comp6: 'Materjali esitlemise tehnikad, mis muudavad õppesisu arusaadavaks ja meeldejäävaks.',
    comp7: 'Strateegiad õpilaste edu ja väljakutsete jälgimiseks ning hindamiseks õppimise käigus.',
    comp8: 'Tõhusa, konkreetse ja arendava tagasiside andmine, mis toetab õpilaste arengut.',
    comp9: 'Meetodid, mis kaasavad õpilasi hindamisse, sealhulgas enesehindamine ja kaaslaste hindamine.',
    comp10: 'Strateegiad õpilaste autonoomia, vastutuse ja enesejuhtimisoskuste arendamiseks.'
  };
  
  return descriptionMap[compId] || '';
}

// Helper function to estimate difficulty level for an action step
export function getDifficultyForActionStep(stepId: string): string {
  // For now, using a simple algorithm based on ID
  const idNumber = parseInt(stepId.replace('as', ''));
  if (idNumber < 10) return 'beginner';
  if (idNumber < 30) return 'intermediate';
  return 'advanced';
}

// Helper function to estimate time for an action step
export function getTimeEstimateForActionStep(stepId: string): string {
  // For now, using a simple algorithm based on ID
  const idNumber = parseInt(stepId.replace('as', ''));
  if (idNumber % 3 === 0) return 'Läbivalt tunnis';
  if (idNumber % 3 === 1) return '15-30 minutit';
  return '30-45 minutit';
}
