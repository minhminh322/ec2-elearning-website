import { Course, Lesson, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import getSession from "@/actions/getSession";

interface CourseSidebarProps {
  course: Course & {
    lessons: (Lesson & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/* Check purchase and add progress */}
      </div>
      <div className="flex flex-col w-full">
        {course.lessons.map((lesson) => (
          <CourseSidebarItem
            key={lesson.id}
            id={lesson.id}
            label={lesson.title}
            isCompleted={!!lesson.userProgress?.[0]?.isCompleted}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
};

// export const CourseSidebar = ({
//   course,
//   progressCount,
// }: CourseSidebarProps) => {
//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
//       Sidebar
//     </div>
//   );
// };
