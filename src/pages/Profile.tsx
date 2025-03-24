
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Mail, ArrowLeft, Camera, School, Calendar } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { et } from 'date-fns/locale';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const { user, updateProfileImage } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { toast } = useToast();

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create preview for the dialog
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
          setShowUploadDialog(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const confirmUpload = async () => {
    if (!imagePreview || !user) return;
    
    setIsUploading(true);
    
    try {
      // Upload image to Storage
      const filePath = `avatars/${user.id}_${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, 
          // Convert base64 to blob
          await fetch(imagePreview).then(res => res.blob()), 
          { upsert: true }
        );
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      const imageUrl = publicUrlData.publicUrl;
      
      // Update user profile with the image URL
      updateProfileImage(imageUrl);
      
      toast({
        title: "Profiilipilt uuendatud",
        description: "Sinu profiilipilt on edukalt uuendatud.",
      });
      
      setIsUploading(false);
      setShowUploadDialog(false);
      setImagePreview(null);
      
    } catch (error) {
      console.error('Error uploading profile image:', error);
      toast({
        variant: "destructive",
        title: "Profiilipildi uuendamine ebaõnnestus",
        description: "Midagi läks valesti. Proovi hiljem uuesti.",
      });
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    setShowUploadDialog(false);
    setImagePreview(null);
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
                
                <Button 
                  className="absolute bottom-4 right-0 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  size="icon"
                  onClick={handleUploadClick}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <span className="px-3 py-1 mt-2 text-sm rounded-full bg-primary/10 text-primary">
                {user.role === 'juht' ? 'Juht' : 'Õpetaja'}
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

        <AlertDialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Profiilipildi üleslaadimine</AlertDialogTitle>
              <AlertDialogDescription>
                See uuendab sinu profiilipilti kogu saidil.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            {imagePreview && (
              <div className="flex justify-center my-4">
                <img 
                  src={imagePreview} 
                  alt="Eelvaade" 
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            )}
            
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelUpload}>Tühista</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmUpload}
                disabled={isUploading}
              >
                {isUploading ? 'Üleslaadimine...' : 'Laadi üles'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Profile;
