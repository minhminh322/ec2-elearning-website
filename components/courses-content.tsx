"use client";

import { Course, Lesson, UserProgress, Video } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatTime } from "@/lib/format";

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
            <div className="flex justify-between w-full mx-2">
              <div>
                Week {course.position}. {course.title}
              </div>
              <div>
                {course.lessons.length}{" "}
                {course.lessons.length > 1 ? "lessons" : "lesson"}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="p-2 divide-y divide-gray-200 dark:divide-gray-700">
              {course.lessons.map((lesson) => (
                <li className="pb-3 sm:pb-4" key={lesson.id}>
                  <div className="flex justify-between p-2">
                    <div className="">{lesson.title}</div>
                    <div>{formatTime(lesson?.video?.duration || 0)} mins</div>
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
