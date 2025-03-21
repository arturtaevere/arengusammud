
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Mail, ArrowLeft, School, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { et } from 'date-fns/locale';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'd. MMMM yyyy', { locale: et });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Selle lehe vaatamiseks pead olema sisse logitud</h1>
        <Button onClick={() => navigate('/auth')}>Logi sisse</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tagasi
        </Button>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Profiil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-32 w-32 mb-4">
                  {user.profileImage ? (
                    <AvatarImage
                      src={user.profileImage}
                      alt={user.name}
                      fallbackSrc={`https://avatar.vercel.sh/${user.email}.png`}
                    />
                  ) : (
                    <AvatarImage 
                      src={`https://avatar.vercel.sh/${user.email}.png`} 
                      alt={user.name} 
                    />
                  )}
                  <AvatarFallback className="text-2xl">
                    {user.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <span className="px-3 py-1 mt-2 text-sm rounded-full bg-primary/10 text-primary">
                {user.role === 'juht' ? 'Juhendaja' : 'Õpetaja'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-md border">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nimi</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-md border">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">E-post</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              {user.school && (
                <div className="flex items-center gap-3 p-3 rounded-md border">
                  <School className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Kool</p>
                    <p className="font-medium">{user.school}</p>
                  </div>
                </div>
              )}
              
              {user.createdAt && (
                <div className="flex items-center gap-3 p-3 rounded-md border">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Liitunud</p>
                    <p className="font-medium">{formatJoinDate(user.createdAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
