"use client";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Course, Lesson, Product, UserProgress, Video } from "@prisma/client";
import { redirect } from "next/navigation";
import getSession from "@/actions/getSession";
import { db } from "@/lib/db";
import { User } from "@/lib/interface";
import { CourseProgress } from "@/components/course-progress";
import { CourseContent } from "./course-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CourseSidebarProps {
  productId: string;
  product: Product;
  courses: (Course & {
    lessons: (Lesson & {
      video: Video | null;
      userProgress: UserProgress[] | null;
    })[];
  })[];
  progressCount: number;
}

export const CourseSidebar = ({
  productId,
  product,
  courses,
  progressCount,
}: CourseSidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`h-full overflow-y-auto flex flex-col border-r shadow-sm transition-all ${
        isOpen ? "max-w-sm" : "max-w-[5rem]"
      }`}
    >
      <div className="flex justify-between items-center gap-x-10 p-3">
        {isOpen && <h1 className="font-semibold">{product.name}</h1>}
        <div>
          {isOpen ? (
            <ArrowLeftCircle
              className="h-8 w-8 cursor-pointer rounded-full hover:bg-slate-500 hover:text-white transition-all"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <ArrowRightCircle
              className="h-8 w-8 cursor-pointer rounded-full hover:bg-slate-500 hover:text-white transition-all"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
      </div>

      {isOpen && (
        <>
          <div className="p-3">
            <CourseProgress variant="success" value={progressCount} />
          </div>
          <div className="p-3">
            <CourseContent courses={courses} productId={productId} />
          </div>
        </>
      )}
    </aside>
  );
};
