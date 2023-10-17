import { Course, Product } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "./getProgress";
type ProductWithCourses = Product & {
  courses: Course[];
  progress: number | null;
};
type DashboardProducts = {
  allProducts: ProductWithCourses[];
  completedProducts: ProductWithCourses[];
  inProgressProducts: ProductWithCourses[];
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
      p["progress"] = 0;
    }

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
      allProducts: allProducts,
      completedProducts: completedProducts,
      inProgressProducts: inProgressProducts,
    };
  } catch (error) {
    console.log("[ERROR] getDashboard: ", error);
    return {
      allProducts: [],
      completedProducts: [],
      inProgressProducts: [],
    };
  }
};
