import { Course, Lesson, Product, UserProgress, Video } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import getSession from "@/actions/getSession";
import { db } from "@/lib/db";
import { User } from "@/lib/interface";
import { CourseProgress } from "@/components/course-progress";
import { CourseContent } from "./course-content";

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

export const CourseSidebar = async ({
  productId,
  product,
  courses,
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
  // console.log("[PRODUCT]");
  // console.log(product);
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="flex flex-col border-b py-5 pr-5">
        <h1 className="font-semibold">{product.name}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full pr-5">
        <CourseContent courses={courses} productId={productId} />
        {/* {course.lessons.map((lesson) => (
          <CourseSidebarItem
            key={lesson.id}
            id={lesson.id}
            label={lesson.title}
            isCompleted={!!lesson.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            productId={productId}
          />
        ))} */}
      </div>
    </div>
  );
};
