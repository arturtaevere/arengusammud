import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { User } from '@/context/auth/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SCHOOLS } from '@/context/auth/constants';
import UserTable from '@/components/admin/UserTable';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const { getAllUsers, signup, deleteUserByEmail } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'juht' | 'õpetaja'>('õpetaja');
  const [school, setSchool] = useState<string>('');

  // Load users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          variant: "destructive",
          title: "Viga kasutajate laadimisel",
          description: "Proovi lehte värskendada.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers, toast]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !role || !school) {
      toast({
        variant: "destructive",
        title: "Täida kõik väljad",
        description: "Kõik väljad on kohustuslikud.",
      });
      return;
    }
    
    try {
      await signup(name, email, password, role, school);
      
      // Refresh user list
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
      
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setRole('õpetaja');
      setSchool('');
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Viga kasutaja loomisel",
        description: error.message || "Proovi uuesti.",
      });
    }
  };

  const handleDeleteUser = async (email: string) => {
    try {
      const success = await deleteUserByEmail(email);
      if (success) {
        // Update the users list by filtering out the deleted user
        setUsers(users.filter(user => user.email !== email));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Administreerimine</h1>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Kasutajad</TabsTrigger>
          <TabsTrigger value="create">Lisa kasutaja</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          {loading ? (
            <div className="text-center py-10">Laadin kasutajaid...</div>
          ) : (
            <UserTable 
              users={users} 
              onDeleteUser={handleDeleteUser} 
            />
          )}
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Lisa uus kasutaja</CardTitle>
              <CardDescription>
                Loo uus kasutajakonto õpetajale või juhile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nimi</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Eesnimi Perenimi" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kasutaja@kool.ee" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Parool</Label>
                    <Input 
                      id="password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Vähemalt 6 tähemärki" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Roll</Label>
                    <Select 
                      value={role} 
                      onValueChange={(value) => setRole(value as 'juht' | 'õpetaja')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Vali roll" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="õpetaja">Õpetaja</SelectItem>
                        <SelectItem value="juht">Juht</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="school">Kool</Label>
                  <Select 
                    value={school} 
                    onValueChange={setSchool}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Vali kool" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCHOOLS.map((school) => (
                        <SelectItem key={school} value={school}>
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full">
                  Lisa kasutaja
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
