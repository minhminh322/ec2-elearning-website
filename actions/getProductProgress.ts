import { db } from "@/lib/db";

interface GetProductProps {
  userId: string;
  productId: string;
}
export const getProductProgress = async ({
  userId,
  productId,
}: GetProductProps): Promise<number> => {
  try {
    const coursesWithLesson = await db.course.findMany({
      where: {
        productId: productId,
      },
      select: {
        lessons: true,
      },
    });

    const lessonIds = coursesWithLesson
      .map((course) => course.lessons.map((lesson) => lesson.id))
      .flat();

    const validCompletedLessons = await db.userProgress.count({
      where: {
        userId: userId,
        lessonId: {
          in: lessonIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage = (validCompletedLessons / lessonIds.length) * 100;

    return progressPercentage | 0;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};
