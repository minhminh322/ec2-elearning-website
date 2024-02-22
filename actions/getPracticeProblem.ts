import {
  Lesson,
  PracticeProblem,
  Product,
  UserPracticeProblemProgress,
} from "@prisma/client";
import { db } from "@/lib/db";
import { LeetCodeSolution, getLeetCodeSolution } from "./getLeetCodeSolution";

interface GetPracticeProblemProps {
  userId: string;
}

export type PracticeProblemWithProgress = PracticeProblem & {
  progress: boolean | null;
};

export const getPracticeProblem = async ({
  userId,
}: GetPracticeProblemProps) => {
  try {
    const problems =
      (await db.practiceProblem.findMany()) as PracticeProblemWithProgress[];

    if (!problems) {
      throw new Error("Problem not found");
    }

    // Generate url for each problem and update progress
    for (let p of problems) {
      const progress = await db.userPracticeProblemProgress.findFirst({
        where: {
          userId,
          problemId: p.id,
        },
        include: {
          Submission: {
            where: {
              status: "Accepted",
            },
          },
        },
      });
      if (progress != null) {
        p["progress"] = true;
      } else {
        p["progress"] = false;
      }
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
