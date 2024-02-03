"use client";

import { useState, lazy } from "react";
// import ReactPlayer from "react-player/vimeo";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoMeta } from "@/actions/getVimeoVideo";

const ReactPlayer = lazy(() => import("react-player/vimeo"));

interface VideoPlayerProps {
  videoMeta: VideoMeta;
  lessonId: string;
  courseId: string;
  isCompleted?: boolean;
  nextLessonId: string | null;
}
export const VideoPlayer = ({
  videoMeta,
  lessonId,
  courseId,
  isCompleted,
  nextLessonId,
}: VideoPlayerProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const onEnded = async () => {
    try {
      setIsLoading(true);

      await axios.put(`/api/courses/${courseId}/${lessonId}/userProgress`, {
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
      {videoMeta && !isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary dark:text-sky-600" />
        </div>
      )}
      {!videoMeta && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          {/* <Lock className="h-8 w-8" /> */}
          <p className="text-lg dark:text-sky-500">
            This Lesson Will Be Available Soon
          </p>
        </div>
      )}
      {videoMeta && (
        <ReactPlayer
          url={videoMeta.link}
          style={{ display: isReady ? "" : "hidden" }}
          controls
          width="100%"
          height="100%"
          onEnded={onEnded}
          onReady={() => setIsReady(true)}
        />
      )}
    </div>
  );
};
