
// Helper to get icon key for a competency
export const getCompetencyIconKey = (id: string) => {
  const competencyIconMap: Record<string, string> = {
    comp1: 'Heart',
    comp2: 'ClipboardList',
    comp3: 'Target',
    comp4: 'Users',
    comp5: 'Brain',
    comp6: 'BookCheck',
    comp7: 'BarChart',
    comp8: 'MessageSquare',
    comp9: 'Users',
    comp10: 'Lightbulb'
  };
  
  return competencyIconMap[id] || 'BookOpen';
};
