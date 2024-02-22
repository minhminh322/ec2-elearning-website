import { Lesson, LeetcodeProblem, Product } from "@prisma/client";
import { db } from "@/lib/db";
import { LeetCodeSolution, getLeetCodeSolution } from "./getLeetCodeSolution";

interface GetLeetcodeProblemProps {
  userId: string;
  product: Product;
  lesson: Lesson;
}

export type LeetcodeProblemWithProgress = LeetcodeProblem & {
  solution: string | null;
  progress: boolean | null;
  url: string;
};

export const getLeetcodeProblem = async ({
  userId,
  product,
  lesson,
}: GetLeetcodeProblemProps) => {
  try {
    const problems = (await db.leetcodeProblem.findMany({
      where: {
        lessonId: lesson.id,
      },
    })) as LeetcodeProblemWithProgress[];

    if (!problems) {
      throw new Error("Problem not found");
    }
    const solutions = (await getLeetCodeSolution({
      product,
      lesson,
    })) as LeetCodeSolution;

    // Generate url for each problem and update progress
    for (let p of problems) {
      const progress = await db.userLeetcodeProblemProgress.findUnique({
        where: {
          userId_problemId: {
            userId,
            problemId: p.id,
          },
        },
      });
      if (progress != null) {
        p["progress"] = progress.isCompleted;
      } else {
        p["progress"] = false;
      }

      const problemId = p.problemName
        .replace(" - ", " ")
        .split(" ")
        .map((str) => str.toLowerCase())
        .join("-");
      if (problemId in solutions) {
        p["solution"] = solutions[problemId];
      } else {
        p["solution"] = "";
      }
      p["url"] = `https://leetcode.com/problems/${problemId}`;
    }

    return {
      problems,
    };
  } catch (error) {
    console.log("[ERROR] getLeetcodeProblem: ", error);
    return {
      problems: [],
    };
  }
};
