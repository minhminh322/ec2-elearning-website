"use client";

import axios from "axios";

export const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="relative aspect-video">
      <video className="w-full h-full" controls>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};
