import { Course, Lesson } from "@prisma/client";
import { db } from "@/lib/db";
type CourseWithLessons = Course & {
  lessons: Lesson[];
  progress: number | null;
};
type DashboardCourses = {
  completedCourse: CourseWithLessons[];
  inProgressCourse: CourseWithLessons[];
};

export const getDashboard = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            lessons: true,
          },
        },
      },
    });

    const courses = purchasedCourses.map(
      (purchase) => purchase.course
    ) as CourseWithLessons[];
    // const inProgressCourse = courses.filter((course) => course.progress !== 100);
    for (let course of courses) {
      course["progress"] = 1;
    }

    return {
      completedCourse: [],
      inProgressCourse: courses,
    };
  } catch (error) {
    console.log("[ERROR] getDashboard: ", error);
    return {
      completedCourse: [],
      inProgressCourse: [],
    };
  }
};
