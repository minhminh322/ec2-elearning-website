import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { IconBadge } from "./icon-badge";
import { Calendar } from "lucide-react";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm" | "md";
  length: number;
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
  md: "text-base",
};

export const CourseProgress = ({
  value,
  variant,
  size,
  length,
}: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2.5" value={value} />
      <div className="flex justify-between mt-3">
        <p
          className={cn(
            "font-medium mt-2 text-emerald-700",
            colorByVariant[variant || "default"],
            sizeByVariant[size || "default"]
          )}
        >
          {Math.round(value)}% Complete
        </p>
        <div className="flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge size="sm" icon={Calendar} />
            <span>
              {length} {length in [0, 1] ? "Week" : "Weeks"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
