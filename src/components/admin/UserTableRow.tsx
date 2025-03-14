
import React from 'react';
import { format } from 'date-fns';
import { et } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import { 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type User = {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'teacher';
  profileImage?: string;
  school?: string;
  createdAt: string;
};

interface UserTableRowProps {
  user: User;
  onDeleteUser: (email: string) => void;
}

const UserTableRow = ({ user, onDeleteUser }: UserTableRowProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'd. MMM yyyy', { locale: et });
    } catch (error) {
      return 'N/A';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <TableRow key={user.id}>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar>
            {user.profileImage ? (
              <AvatarImage src={user.profileImage} alt={user.name} />
            ) : (
              <AvatarImage 
                src={`https://avatar.vercel.sh/${user.email}.png`} 
                alt={user.name} 
              />
            )}
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={user.role === 'coach' ? 'default' : 'secondary'}>
          {user.role === 'coach' ? 'Juhendaja' : 'Õpetaja'}
        </Badge>
      </TableCell>
      <TableCell>{user.school || 'N/A'}</TableCell>
      <TableCell>{formatDate(user.createdAt)}</TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Kas olete kindel?</AlertDialogTitle>
              <AlertDialogDescription>
                See tegevus kustutab kasutaja <span className="font-bold">{user.name}</span> ({user.email}) jäädavalt.
                Seda toimingut ei saa tagasi võtta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                Tühista
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDeleteUser(user.email)}
                className="bg-red-500 hover:bg-red-600"
              >
                Kustuta
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
