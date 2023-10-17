import { Course, Lesson, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import getSession from "@/actions/getSession";
import { db } from "@/lib/db";
import { User } from "@/lib/interface";
import { CourseProgress } from "@/components/course-progress";

interface CourseSidebarProps {
  productId: string;
  course: Course & {
    lessons: (Lesson & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  productId,
  course,
  progressCount,
}: CourseSidebarProps) => {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_productId: {
        userId: (session?.user as User).id,
        productId: productId,
      },
    },
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.lessons.map((lesson) => (
          <CourseSidebarItem
            key={lesson.id}
            id={lesson.id}
            label={lesson.title}
            isCompleted={!!lesson.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            productId={productId}
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
