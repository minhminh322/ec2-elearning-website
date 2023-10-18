import { db } from "@/lib/db";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import getSession from "@/actions/getSession";
import { redirect } from "next/navigation";
import { User } from "@/lib/interface";
import { Navbar } from "@/components/navigation/navbar";
import { getProgress } from "@/actions/getCourseProgress";
import { use } from "react";
import getUserId from "@/actions/getUserId";
import { getProductCourses } from "@/actions/getProductCourses";
import { getProductProgress } from "@/actions/getProductProgress";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string; productId: string };
}) => {
  const userId = await getUserId();
  if (!userId) {
    return redirect("/");
  }

  const { product, courses } = await getProductCourses({
    userId: userId,
    productId: params.productId,
  });

  if (!product) {
    return redirect("/");
  }

  // const progressCount = await getProgress(userId, params.courseId);
  const progressCount = await getProductProgress({
    userId,
    productId: params.productId,
  });
  return (
    <div className="h-full w-full">
      {/* <div className="h-[80px] fixed inset-x-0 w-full z-50">
        <Navbar />
      </div> */}
      <div className="hidden md:flex h-full w-80 flex-col fixed top-[80px] z-50">
        <CourseSidebar
          productId={params.productId}
          product={product}
          courses={courses}
          progressCount={progressCount}
        />
      </div>
      <main className="md:pl-80 h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
