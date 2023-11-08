import { getProductCourses } from "@/actions/getProductCourses";
import { getProductProgress } from "@/actions/getProductProgress";
import getUserId from "@/actions/getUserId";
import { CourseContent } from "@/components/courses-content";
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
  const { product, courses } = await getProductCourses({
    userId: userId || "",
    productId: params.productId,
  });

  const progress = await getProductProgress({
    userId: userId || "",
    productId: params.productId,
  });

  const image_base_url = process.env.CDN_URL + "/images/";
  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="order-2 lg:order-1 col-span-1 lg:col-span-3 flex flex-col  bg-gray-50 dark:bg-gray-900 shadow-xl shadow-gray-500 dark:shadow-indigo-500  rounded-lg p-7 space-y-10">
          <h3 className="font-semibold text-lg md:text-3xl mb-2 capitalize">
            {product?.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {product?.description}
          </p>
          <Link
            href={`/${params.productId}/courses/${
              courses && courses.length > 0 ? courses[0].id : ""
            }`}
          >
            <Button className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-500">
              Start Course
            </Button>
          </Link>
          {/* {courses && courses?.length > 0 ? (
            <CourseContent courses={courses} userId={userId!} />
          ) : (
            <h2>No courses available this time</h2>
          )} */}
        </div>
        <div className="order-1 lg:order-2 col-span-1 lg:col-span-2 flex flex-col items-center bg-gray-50 dark:bg-gray-900 shadow-xl shadow-gray-500 dark:shadow-indigo-500 rounded-lg p-7 space-y-5">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt={product?.name || ""}
              src={image_base_url + product?.imageId}
            />
          </div>
          <h2>Free for Premium EC2 Students</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
