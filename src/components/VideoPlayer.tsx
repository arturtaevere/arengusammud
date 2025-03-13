
import React from 'react';

interface VideoPlayerProps {
  src: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title }) => {
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
