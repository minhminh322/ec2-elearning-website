import { db } from "@/lib/db";

interface GetProductProps {
  userId: string;
  productId: string;
}

export const getProductCourses = async ({
  userId,
  productId,
}: GetProductProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!purchase) {
      throw new Error("Product not found");
    }

    const courses = await db.course.findMany({
      where: {
        productId: productId,
      },
      include: {
        lessons: {
          include: {
            userProgress: { where: { userId: userId } },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    return courses;
  } catch (error) {
    console.error("[ERROR] getProduct", error);

    return [];
  }
};
