"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CourseProgressButtonProps {
  lessonId: string;
  courseId: string;
  isCompleted?: boolean;
  nextLessonId: string | null;
}

export const CourseProgressButton = ({
  lessonId,
  courseId,
  isCompleted,
  nextLessonId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const Icon = isCompleted ? XCircle : CheckCircle;

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(`/api/courses/${courseId}/${lessonId}/userProgress`, {
        isCompleted: !isCompleted,
      });

      toast({
        //   title: "Scheduled: Catch up",
        description: (
          <div className="flex items-center space-x-2">
            <CheckCircle className="m-1 text-green-500 w-10 h-10" />
            <p className="text-lg">Progress updated !</p>
          </div>
        ),
        duration: 3000,
      });
      router.refresh();
    } catch {
      toast({
        description: (
          <div className="flex items-center space-x-2">
            <CheckCircle className="m-1 text-red-500 w-10 h-10" />
            <p className="text-lg">Something went wrong !</p>
          </div>
        ),
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      // className="md:w-auto"
    >
      {isCompleted ? "Not Completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
