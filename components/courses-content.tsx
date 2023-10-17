"use client";

import { Course, Lesson, UserProgress, Video } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CourseWithLesson = Course & {
  lessons: (Lesson & {
    video: Video | null;
    userProgress: UserProgress[] | null;
  })[];
};

interface CourseContentProps {
  userId: string;
  courses: CourseWithLesson[];
}
export const CourseContent = ({ courses, userId }: CourseContentProps) => {
  //   console.log(courses[0].lessons[0].video);
  return (
    <Accordion type="single" collapsible className="w-full">
      {courses.map((course) => (
        <AccordionItem value={course.id} key={course.id}>
          <AccordionTrigger>
            Week {course.position}. {course.title}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="p-2 divide-y divide-gray-200 dark:divide-gray-700">
              {course.lessons.map((lesson) => (
                <li className="pb-3 sm:pb-4" key={lesson.id}>
                  <div className="flex justify-between p-1">
                    <div className="">{lesson.title}</div>
                    <div>{lesson?.video?.duration}</div>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
