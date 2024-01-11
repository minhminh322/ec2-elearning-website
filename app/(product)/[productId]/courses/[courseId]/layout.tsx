import { db } from "@/lib/db";
import { CourseSidebar } from "./_components/course-sidebar";
import getSession from "@/actions/getSession";
import { redirect } from "next/navigation";
import { User } from "@/lib/interface";
import { Navbar } from "@/components/navigation/navbar";
import { getProgress } from "@/actions/getCourseProgress";
import { Suspense, use } from "react";
import getUserId from "@/actions/getUserId";
import { getProductCourses } from "@/actions/getProductCourses";
import { getProductProgress } from "@/actions/getProductProgress";
import Loading from "@/app/(dashboard)/loading";

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
    <div className="grid grid-cols-[0fr,5fr] md:grid-cols-[auto,5fr] flex-grow-1">
      <CourseSidebar
        productId={params.productId}
        product={product}
        courses={courses}
        progressCount={progressCount}
      />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default CourseLayout;
