import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Link as LinkIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import VideoPlayer from './VideoPlayer';

interface VideoUploaderProps {
  onVideoUploaded: (videoUrl: string) => void;
  existingVideoUrl?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUploaded, existingVideoUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(existingVideoUrl || null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB max size

  const isYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

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

  const handleYoutubeUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!youtubeUrl.trim()) {
      setError('Palun sisesta YouTube video URL');
      return;
    }

    if (!isYouTubeUrl(youtubeUrl)) {
      setError('Palun sisesta kehtiv YouTube URL');
      return;
    }

    setVideoPreview(youtubeUrl);
    onVideoUploaded(youtubeUrl);
    setShowUrlInput(false);
    setYoutubeUrl('');
  };

  const clearVideo = () => {
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onVideoUploaded('');
    setShowUrlInput(false);
    setYoutubeUrl('');
  };

  const toggleUrlInput = () => {
    setShowUrlInput(!showUrlInput);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {!videoPreview ? (
        <div className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="video/*"
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Üleslaadimine...' : 'Lae üles video'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={toggleUrlInput}
              className="flex-1"
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              Lisa YouTube video
            </Button>
          </div>
          
          {showUrlInput && (
            <form onSubmit={handleYoutubeUrlSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Lisa</Button>
            </form>
          )}
          
          <p className="text-xs text-muted-foreground text-center">
            Maksimaalne failisuurus: 100MB. Toetatud formaadid: MP4, WebM, Ogg või YouTube URL
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="relative">
            <VideoPlayer src={videoPreview} />
            
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
