import { Course, Product } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "./getProgress";
type ProductWithCourses = Product & {
  courses: Course[];
  progress: number | null;
};
type DashboardProducts = {
  completedProducts: ProductWithCourses[];
  inProgressProducts: ProductWithCourses[];
};

export const getDashboard = async (
  userId: string
): Promise<DashboardProducts> => {
  try {
    const purchasedProducts = await db.purchase.findMany({
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

    const products = purchasedProducts.map(
      (purchase) => purchase.product
    ) as ProductWithCourses[];

    for (let prod of products) {
      // const progress = await getProgress(userId, );
      // console.log("prod: ", prod);
      const progress = 1;
      prod["progress"] = progress;
    }

    const inProgressProducts = products.filter(
      (product) => (product.progress ?? 0) < 100
    );
    const completedProducts = products.filter(
      (product) => product.progress === 100
    );

    return {
      completedProducts: completedProducts,
      inProgressProducts: inProgressProducts,
    };
  } catch (error) {
    console.log("[ERROR] getDashboard: ", error);
    return {
      completedProducts: [],
      inProgressProducts: [],
    };
  }
};
