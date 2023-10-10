import { UserProgress } from "@prisma/client";
import { Lesson } from "@prisma/client";
import { db } from "@/lib/db";

interface GetLessonProps {
  userId: string;
  courseId: string;
  lessonId: string;
}

export const getLesson = async ({
  userId,
  courseId,
  lessonId,
}: GetLessonProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const lesson = await db.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    let video = null;
    let nextLesson: Lesson | null = null;

    if (!lesson || !course || !purchase) {
      throw new Error("Lesson not found");
    }

    if (purchase) {
      video = await db.video.findUnique({
        where: {
          lessonId: lessonId,
        },
      });

      nextLesson = await db.lesson.findFirst({
        where: {
          courseId: courseId,
          position: {
            gt: lesson?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const UserProgress = await db.userProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });

    return {
      lesson,
      course,
      video,
      nextLesson,
      UserProgress,
      purchase,
    };
  } catch (error) {
    console.log("[ERROR] getLesson: ", error);
    return {
      lesson: null,
      course: null,
      video: null,
      nextLesson: null,
      UserProgress: null,
      purchase: null,
    };
  }
};
