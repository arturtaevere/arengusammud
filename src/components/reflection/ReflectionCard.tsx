
import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StandaloneReflection } from './types';

interface ReflectionCardProps {
  reflection: StandaloneReflection;
  onDelete?: (id: string) => void;
}

const ReflectionCard = ({ reflection, onDelete }: ReflectionCardProps) => {
  const formattedDate = reflection.created_at
    ? format(new Date(reflection.created_at), 'dd.MM.yyyy')
    : '';

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-end">
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
            {formattedDate}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {reflection.reflection && (
            <>
              {reflection.reflection.substring(0, 150)}
              {reflection.reflection.length > 150 ? '...' : ''}
            </>
          )}
        </p>
        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            {onDelete && (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => onDelete(reflection.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Link to={`/reflections/edit/${reflection.id}`}>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <Link to={`/reflections/${reflection.id}`}>
            <Button variant="outline" size="sm" className="gap-1">
              Vaata
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReflectionCard;
