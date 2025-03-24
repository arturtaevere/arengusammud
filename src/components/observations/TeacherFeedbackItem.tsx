
import React from 'react';
import { Card } from '@/components/ui/card';
import { CombinedFeedbackItem } from './types';

interface TeacherFeedbackItemProps {
  item: CombinedFeedbackItem;
}

const TeacherFeedbackItem = ({ item }: TeacherFeedbackItemProps) => {
  // Helper function to format dates safely
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Kuupäev puudub';
      }
      return date.toLocaleDateString('et-EE');
    } catch (e) {
      console.error('Error formatting date:', dateString, e);
      return 'Kuupäev puudub';
    }
  };

  return (
    <Card key={item.id} className="transition-all hover:shadow-md">
      <div className="p-4 pb-2">
        <div className="flex justify-between">
          <div className="text-lg font-medium">
            {item.type === 'reflection' ? 'Minu refleksioon' : 'Tagasiside'}
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {formatDate(item.date)}
        </div>
        {item.type === 'feedback' && item.coach && (
          <div className="text-sm text-gray-500 mt-1">
            Õpipartner: {item.coach}
          </div>
        )}
      </div>
      
      <div className="px-4 pb-2">
        {item.type === 'reflection' ? (
          <p className="text-sm text-gray-700 line-clamp-2">
            {item.teacherReflection?.reflection && (
              <>
                {item.teacherReflection.reflection.substring(0, 150)}
                {item.teacherReflection.reflection.length > 150 ? '...' : ''}
              </>
            )}
          </p>
        ) : (
          <p className="text-sm text-gray-700 line-clamp-2">
            Tagasiside
          </p>
        )}
      </div>
      
      <div className="px-4 pb-4 pt-2 flex justify-end">
        <a 
          href={`/observations/${item.id.replace('-reflection', '')}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
        >
          Vaata
        </a>
      </div>
    </Card>
  );
};

export default TeacherFeedbackItem;
