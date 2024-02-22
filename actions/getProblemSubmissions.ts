import { db } from "@/lib/db";
import { Submission } from "@prisma/client";

export const getProblemSubmissions = async (
  userId: string,
  problemId: string
): Promise<Submission[]> => {
  try {
    const submissions = await db.userPracticeProblemProgress.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
      select: {
        tokenId: true,
      },
    });

    const tokens = submissions
      .map((submission) => submission.tokenId)
      .filter((token) => token !== null) as string[];

    const detailedSubmissions = await db.submission.findMany({
      where: {
        id: {
          in: tokens,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    // const detailedSubmissions = submissions.map(async (submission) => {
    //   const tokenId = submission.tokenId || "";
    //   const token =
    //     (await db.submission.findUnique({
    //       where: {
    //         id: tokenId,
    //       },
    //     })) || ({} as Submission);
    //   return {
    //     tokenId: tokenId,
    //     submissionDate: token.createdAt,
    //     status: token.status,
    //     sourceCode: token.sourceCode,
    //     language: token.language,
    //     timeExecuted: token.timeExecuted,
    //     memoryUsed: token.memoryUsed,
    //   };
    // });

    return detailedSubmissions;
  } catch (error) {
    console.log("[GET_PROBLEM_SUBMISSIONS]", error);
    return [];
  }
};
