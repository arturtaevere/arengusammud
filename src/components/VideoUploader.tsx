
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VideoUploaderProps {
  onVideoUploaded: (videoUrl: string) => void;
  existingVideoUrl?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUploaded, existingVideoUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(existingVideoUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB max size

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError(`Video peab olema väiksem kui ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
        return;
      }

      setIsUploading(true);
      
      // Create a URL for the video file
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      onVideoUploaded(videoUrl);
      setIsUploading(false);
    }
  };

  const clearVideo = () => {
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onVideoUploaded('');
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {!videoPreview ? (
        <div className="space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="video/*"
            onChange={handleFileChange}
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Üleslaadimine...' : 'Lae üles video'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Maksimaalne failisuurus: 100MB. Toetatud formaadid: MP4, WebM, Ogg
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="relative">
            <video 
              className="w-full rounded-lg"
              src={videoPreview}
              controls
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
            <Button 
              variant="destructive" 
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearVideo}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
