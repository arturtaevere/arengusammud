
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ActionStepItemProps {
  id: string;
  title: string;
  description: string;
}

const ActionStepItem = ({ id, title, description }: ActionStepItemProps) => {
  // Improved cleaning function that removes any category text patterns
  const cleanDescription = (text: string): string => {
    return text.replace(/^[\w\s]+(:|\.\.\.)\s*/i, '');
  };

  return (
    <Link 
      key={id} 
      to={`/action-steps/${id}`}
      className="block p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-slate-500 mt-1">{cleanDescription(description)}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-primary shrink-0" />
      </div>
    </Link>
  );
};

export default ActionStepItem;
