"use client";

import { useState } from "react";
import ReactPlayer from "react-player/vimeo";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface VideoPlayerProps {
  videoUrl: string;
  lessonId: string;
  courseId: string;
  isCompleted?: boolean;
  nextLessonId: string | null;
}
export const VideoPlayer = ({
  videoUrl,
  lessonId,
  courseId,
  isCompleted,
  nextLessonId,
}: VideoPlayerProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onEnded = async () => {
    try {
      setIsLoading(true);

      await axios.put(`/api/courses/${courseId}/${lessonId}/progress`, {
        isCompleted: true,
      });

      toast.success("Progress updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative aspect-video">
      <ReactPlayer
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        onEnded={onEnded}
      />
    </div>
  );
};
