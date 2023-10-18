"use client";

import { Course, Lesson, Product, UserProgress, Video } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { formatTime } from "@/lib/format";
import { CourseItem } from "./course-item";

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
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={courses[0].id}
      className="w-full"
    >
      {courses.map((course) => (
        <AccordionItem value={course.id} key={course.id}>
          <AccordionTrigger>
            <div className="flex flex-col items-start w-full mx-2 space-y-1">
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
            <ul className="p-2 divide-y divide-gray-200 dark:divide-gray-700">
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
