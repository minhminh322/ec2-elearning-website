import { Course } from "@prisma/client";
import { CourseCard } from "./courses-card-grid";
type CourseWithLesson = Course & {
  lessons: {}[];
};

interface CourseListProps {
  userId: string;
  courses: CourseWithLesson[];
}

export const CourseList = ({ courses, userId }: CourseListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description!}
            imageId={course.imageId!}
            lessonsLength={course.lessons.length}
            productId={course.productId}
            userId={userId}
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
