import { Course, Product } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "./getCourseProgress";
import { getProductProgress } from "./getProductProgress";
type ProductWithCourses = Product & {
  courses: Course[];
  progress: number | null;
};
type DashboardProducts = {
  allProducts: ProductWithCourses[];
  purchasedProducts: ProductWithCourses[];
  // completedProducts: ProductWithCourses[];
  // inProgressProducts: ProductWithCourses[];
};

export const getDashboard = async (
  userId: string
): Promise<DashboardProducts> => {
  try {
    const allProducts = (await db.product.findMany({
      include: {
        courses: true,
      },
      orderBy: {
        name: "asc",
      },
    })) as ProductWithCourses[];

    for (let p of allProducts) {
      p["progress"] = await getProductProgress({ userId, productId: p.id });
    }

    const purchases = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        product: {
          include: {
            courses: true,
          },
        },
      },
    });

    const purchasedProducts = purchases.map(
      (purchase) => purchase.product
    ) as ProductWithCourses[];

    // for (let pp of purchasedProducts) {
    //   pp["progress"] = await getProductProgress({ userId, productId: pp.id });
    // }

    // const inProgressProducts = products.filter(
    //   (product) => (product.progress ?? 0) < 100
    // );
    // const completedProducts = products.filter(
    //   (product) => product.progress === 100
    // );

    return {
      allProducts: allProducts,
      purchasedProducts: purchasedProducts,
      // completedProducts: completedProducts,
      // inProgressProducts: inProgressProducts,
    };
  } catch (error) {
    console.log("[ERROR] getDashboard: ", error);
    return {
      allProducts: [],
      purchasedProducts: [],
      // completedProducts: [],
      // inProgressProducts: [],
    };
  }
};
