
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserTableRow from './UserTableRow';
import { User } from '@/context/auth/types';

interface UserTableProps {
  users: User[];
  onDeleteUser: (email: string) => void;
}

const UserTable = ({ users, onDeleteUser }: UserTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kasutajad ({users.length})</CardTitle>
        <CardDescription>
          Kõik platvormi registreeritud kasutajad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kasutaja</TableHead>
              <TableHead>Roll</TableHead>
              <TableHead>Kool</TableHead>
              <TableHead>Liitumiskuupäev</TableHead>
              <TableHead>Tegevused</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <UserTableRow 
                  key={user.id} 
                  user={user} 
                  onDeleteUser={onDeleteUser}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Kasutajaid ei leitud
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserTable;
