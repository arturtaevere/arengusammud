
import React from 'react';
import YouTubePlayer from './YouTubePlayer';

interface VideoPlayerProps {
  src: string;
  title?: string;
}

// Function to check if the URL is a YouTube URL
const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

// Function to extract YouTube video ID from a YouTube URL
const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title }) => {
  // Check if the source is a YouTube URL
  if (isYouTubeUrl(src)) {
    const videoId = extractYouTubeId(src);
    if (videoId) {
      return (
        <div className="w-full">
          <YouTubePlayer videoId={videoId} />
          {title && <p className="mt-2 text-sm text-muted-foreground">{title}</p>}
        </div>
      );
    }
  }

  // If not a YouTube URL or failed to extract ID, use regular video player
  return (
    <div className="w-full">
      <video 
        className="w-full rounded-lg"
        src={src}
        controls
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
      {title && <p className="mt-2 text-sm text-muted-foreground">{title}</p>}
    </div>
  );
};

export default VideoPlayer;
