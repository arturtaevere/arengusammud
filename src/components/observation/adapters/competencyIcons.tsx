
import React from 'react';
import { Heart, ClipboardList, Target, Users, Brain, BookCheck, BarChart, MessageSquare, Lightbulb, BookOpen } from 'lucide-react';

// Map competency IDs to their respective icons
export const competencyIconMap = {
  comp1: Heart,
  comp2: ClipboardList,
  comp3: Target, 
  comp4: Users,
  comp5: Brain,
  comp6: BookCheck,
  comp7: BarChart,
  comp8: MessageSquare,
  comp9: Users,
  comp10: Lightbulb,
  default: BookOpen
};

export const getIconComponent = (compId: string, className: string = "h-5 w-5 text-primary") => {
  const IconComponent = competencyIconMap[compId as keyof typeof competencyIconMap] || competencyIconMap.default;
  return React.createElement(IconComponent, { className });
};
