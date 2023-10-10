import { db } from "@/lib/db";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import getSession from "@/actions/getSession";
import { redirect } from "next/navigation";
import { User } from "@/lib/interface";
import { Navbar } from "@/components/navigation/navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      lessons: {
        include: {
          userProgress: {
            where: {
              userId: (session?.user as User).id,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-x-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed top-[80px] z-50">
        <CourseSidebar course={course} progressCount={1} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
