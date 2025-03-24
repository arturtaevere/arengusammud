
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { StoredObservation } from '@/components/observation/storage';

interface TeacherReflectionsProps {
  reflections: StoredObservation[];
  title?: string;
  emptyMessage?: string;
}

const TeacherReflections = ({ 
  reflections, 
  title = "Minu refleksioonid", 
  emptyMessage = "Refleksioone pole" 
}: TeacherReflectionsProps) => {
  if (reflections.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {title && (
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-medium">{title}</h2>
          <div className="text-sm text-gray-500">
            Kokku: {reflections.length}
          </div>
        </div>
      )}
      
      <div className="grid gap-4">
        {reflections.map((observation) => (
          <Card key={observation.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg">
                  {observation.subject || 'Tund'}
                </CardTitle>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  Reflekteeritud
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {observation.teacherReflection && format(new Date(observation.teacherReflection.submittedAt), 'dd.MM.yyyy')}
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-gray-700 line-clamp-2">
                {observation.teacherReflection?.reflection.substring(0, 150)}
                {observation.teacherReflection && observation.teacherReflection.reflection.length > 150 ? '...' : ''}
              </p>
              <div className="flex justify-end mt-4">
                <Link to={`/observations/${observation.id}`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    Vaata
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherReflections;
