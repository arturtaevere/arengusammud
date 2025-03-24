
import React from 'react';
import TeacherFeedbackItem from './TeacherFeedbackItem';
import { CombinedFeedbackItem } from './types';

interface TeacherFeedbackListProps {
  items: CombinedFeedbackItem[];
  title?: string;
  emptyMessage?: string;
}

const TeacherFeedbackList = ({ 
  items, 
  title = "Tagasiside ja refleksioonid",
  emptyMessage = "Tagasisidet ega refleksioone pole" 
}: TeacherFeedbackListProps) => {
  if (items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="text-sm text-gray-500">
          Kokku: {items.length}
        </div>
      </div>
      
      <div className="grid gap-4">
        {items.map((item) => (
          <TeacherFeedbackItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TeacherFeedbackList;
