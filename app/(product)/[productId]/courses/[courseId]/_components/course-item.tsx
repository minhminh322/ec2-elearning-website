"use client";

import { usePathname, useRouter } from "next/navigation";
import { CheckCircle, Lock, Code, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  type: "Lecture" | "Exercise" | "Note" | "Optional" | null;
  courseId: string;
  productId: string;
}
export const CourseItem = ({
  label,
  id,
  isCompleted,
  type,
  courseId,
  productId,
}: CourseItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname?.includes(id);
  let Icon;
  if (isCompleted) {
    Icon = CheckCircle;
  } else if (type === "Lecture") {
    Icon = PlayCircle;
  } else if (type === "Exercise") {
    Icon = Code;
  } else {
    Icon = Lock;
  }

  const onClick = () => {
    router.push(`/${productId}/courses/${courseId}/${id}`);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center w-full gap-x-2 rounded-r-lg text-slate-500 dark:text-white text-base font-[500] transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center text-left gap-x-2 py-4 overflow-hidden">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 dark:text-gray-300 transition-all",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700 dark:text-emerald-500"
          )}
        />
        <div className="overflow-ellipsis overflow-hidden whitespace-nowrap">
          {label}
        </div>
      </div>
      {/* <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}
      /> */}
    </button>
  );
};
