
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Mail, ArrowLeft, Upload, Camera, School } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

const Profile = () => {
  const { user, updateProfileImage } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // Log user info for debugging
  useEffect(() => {
    if (user) {
      console.log('User in Profile:', user);
      console.log('Profile image path:', user.profileImage);
    }
  }, [user]);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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

  const confirmUpload = () => {
    if (imagePreview) {
      setIsUploading(true);
      
      // In a real app, we would upload the file to a server here
      // For demo purposes, we'll just simulate a delay and use the preview as the image
      setTimeout(() => {
        updateProfileImage(imagePreview);
        setIsUploading(false);
        setShowUploadDialog(false);
        setImagePreview(null);
      }, 1000);
    }
  };

  const cancelUpload = () => {
    setShowUploadDialog(false);
    setImagePreview(null);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">You must be logged in to view this page</h1>
        <Button onClick={() => navigate('/auth')}>Log In</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <Avatar className="h-32 w-32 mb-4">
                {user.profileImage ? (
                  <AvatarImage
                    src={user.profileImage}
                    alt={user.name}
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
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-md border">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md border">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            {user.role === 'teacher' && user.school && (
              <div className="flex items-center gap-3 p-3 rounded-md border">
                <School className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Kool</p>
                  <p className="font-medium">{user.school}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload Profile Picture</AlertDialogTitle>
            <AlertDialogDescription>
              This will update your profile picture across the site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {imagePreview && (
            <div className="flex justify-center my-4">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          )}
          
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelUpload}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmUpload}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;
