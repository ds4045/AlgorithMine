import React from "react";

interface VimeoVideoProps {
  videoId: string;
  width: string;
  height: string;
  autoplay?: boolean;
}

const VideoPlayer: React.FC<VimeoVideoProps> = ({
  videoId,
  width,
  height,
  autoplay,
}) => {
  const autoplayParam = autoplay ? 1 : 0;

  return (
    <div>
      <iframe
        title="vimeo-video"
        src={`https://player.vimeo.com/video/${videoId}?autoplay=${autoplayParam}&muted=1`}
        width={width}
        height={height}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
