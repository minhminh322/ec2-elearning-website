"use client";

import { Course, Lesson, Product, UserProgress, Video } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { formatTime } from "@/lib/format";
import { CourseItem } from "./course-item";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CourseContentProps {
  productId: string;
  courses: (Course & {
    lessons: (Lesson & {
      video: Video | null;
      userProgress: UserProgress[] | null;
    })[];
  })[];
}
export const CourseContent = ({ courses, productId }: CourseContentProps) => {
  //   console.log(courses);
  const pathName = usePathname();
  const [value, setValue] = useState("");

  useEffect(() => {
    // console.log(pathName.split("/")[3]);
    setValue(pathName.split("/")[3]);
  }, [pathName]);
  return (
    <Accordion
      type="single"
      collapsible
      // defaultValue={courses[0].id}
      value={value}
      onValueChange={setValue}
      className="w-full"
    >
      {courses.map((course) => (
        <AccordionItem value={course.id} key={course.id}>
          <AccordionTrigger>
            <div
              className={cn(
                "flex flex-col items-start w-full space-y-1 transform transition-transform duration-200 hover:translate-x-[10px] hover:scale-105",
                pathName?.includes(course.id) && "font-bold text-lg"
              )}
            >
              <div className="">
                Week {course.position}. {course.title}
              </div>
              <div className="text-xs font-light">
                {
                  course.lessons.filter(
                    (lesson) => !!lesson.userProgress?.[0]?.isCompleted
                  ).length
                }
                {" / "}
                {course.lessons.length}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {course.lessons.map((lesson) => (
                <li className="" key={lesson.id}>
                  {/* <div className="flex justify-between p-2">
                    <div className="">{lesson.title}</div>
                    <div>{formatTime(lesson?.video?.duration || 0)} mins</div>
                  </div> */}
                  <CourseItem
                    key={lesson.id}
                    id={lesson.id}
                    label={lesson.title}
                    isCompleted={!!lesson.userProgress?.[0]?.isCompleted}
                    type={lesson.type}
                    courseId={course.id}
                    productId={productId}
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
