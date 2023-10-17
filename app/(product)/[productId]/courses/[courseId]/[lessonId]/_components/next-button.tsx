"use client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export const NextButton = ({
  nextLessonId,
}: {
  nextLessonId: string | null;
}) => {
  const handleButton = () => {
    toast.error("Sorry. We're still building it!");
  };
  return (
    <div className="space-x-2">
      <Button variant="secondary" onClick={handleButton}>
        Prev
      </Button>
      <Button variant="secondary" onClick={handleButton}>
        Next
      </Button>
    </div>
  );
};
