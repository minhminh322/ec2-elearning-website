import { Lesson, PracticeProblem, Product } from "@prisma/client";
import { db } from "@/lib/db";
import { LeetCodeSolution, getLeetCodeSolution } from "./getLeetCodeSolution";

interface GetPracticeProblemProps {
  userId: string;
  product: Product;
  lesson: Lesson;
}

export type PracticeProblemWithProgress = PracticeProblem & {
  solution: string | null;
  progress: boolean | null;
  url: string;
};

export const getPracticeProblem = async ({
  userId,
  product,
  lesson,
}: GetPracticeProblemProps) => {
  try {
    const problems = (await db.practiceProblem.findMany({
      where: {
        lessonId: lesson.id,
      },
    })) as PracticeProblemWithProgress[];

    if (!problems) {
      throw new Error("Problem not found");
    }
    const solutions = (await getLeetCodeSolution({
      product,
      lesson,
    })) as LeetCodeSolution;

    // Generate url for each problem and update progress
    for (let p of problems) {
      const progress = await db.userPracticeProblemProgress.findUnique({
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
      p["solution"] = solutions[problemId];
      p["url"] = `https://leetcode.com/problems/${problemId}`;
    }

    return {
      problems,
    };
  } catch (error) {
    console.log("[ERROR] getPracticeProblem: ", error);
    return {
      problems: [],
    };
  }
};
