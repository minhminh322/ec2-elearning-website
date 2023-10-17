"use client";

import ReactPlayer from "react-player/vimeo";

export const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="relative aspect-video">
      <ReactPlayer
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        // className="absolute top-0 left-0"
      />
      {/* <video className="w-full h-full" controls>
        <source src={videoUrl} type="video/mp4" />
      </video> */}
    </div>
  );
};
