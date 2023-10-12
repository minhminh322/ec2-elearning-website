import { getProductCourses } from "@/actions/getProductCourses";
import getUserId from "@/actions/getUserId";
import { CourseList } from "@/components/courses-list";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ProductPage = async ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
  const userId = await getUserId();
  if (!userId) {
    return redirect("/");
  }

  const courses = await getProductCourses({
    userId: userId,
    productId: params.productId,
  });

  console.log(courses);
  return (
    <div>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <CourseList courses={courses} />
      </div>
    </div>
  );
};

export default ProductPage;
