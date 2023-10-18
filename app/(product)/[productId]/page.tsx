import { getProductCourses } from "@/actions/getProductCourses";
import { getProductProgress } from "@/actions/getProductProgress";
import getUserId from "@/actions/getUserId";
import { CourseContent } from "@/components/courses-content";
import { CourseList } from "@/components/courses-list-grid";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
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

  const { product, courses } = await getProductCourses({
    userId: userId,
    productId: params.productId,
  });

  const progress = await getProductProgress({
    userId: userId,
    productId: params.productId,
  });

  const image_base_url = process.env.CDN_URL + "/images/";
  return (
    <div
      className="grid grid-cols-2 gap-4"
      style={{ gridTemplateColumns: " 4fr 2fr" }}
    >
      <div className="col-span-1">
        <div className="flex flex-col max-w-xl mx-auto py-20 space-y-20">
          <h1>{product?.name}</h1>

          {courses && courses?.length > 0 ? (
            <CourseContent courses={courses} userId={userId} />
          ) : (
            <h2>No courses available this time</h2>
          )}
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col items-center justify-center max-w-xl mx-10 my-20 space-y-10">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt={product?.name || ""}
              src={image_base_url + product?.imageId}
            />
          </div>
          <h2>Free for Premium EC2 Students</h2>
          <Link
            href={`/${params.productId}/courses/${
              courses && courses.length > 0 ? courses[0].id : ""
            }`}
          >
            <Button>Start Course</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
