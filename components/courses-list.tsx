import { Course } from "@prisma/client";
import { CourseCard } from "./courses-card";
type CourseWithLesson = Course & {
  lessons: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  courses: CourseWithLesson[];
}

export const CourseList = ({ courses }: CourseListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl!}
            chaptersLength={course.lessons.length}
            price={course.price!}
            progress={course.progress}
          />
        ))}
      </div>
      {courses.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
