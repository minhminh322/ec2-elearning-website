import {
  DataTable,
  LeetcodeProblem,
} from "@/app/(product)/[productId]/courses/[courseId]/[lessonId]/_components/leetcode-table/data-table";
import { PracticeProblemWithProgress } from "@/actions/getPracticeProblem";

interface LeetcodeTableProps {
  problems: PracticeProblemWithProgress[];
}
export const LeetcodeTable = ({ problems }: LeetcodeTableProps) => {
  // Prepare data for table
  const data: LeetcodeProblem[] = problems
    .map((problem) => ({
      id: problem.id,
      progress: problem.progress,
      problemName: problem.problemName,
      difficulty: problem.difficulty,
      url: problem.url,
      threadId: problem.threadId,
      solution: problem.solution,
    }))
    .sort((a, b) => {
      const order = ["Easy", "Medium", "Hard"];
      return order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
    });

  return <DataTable data={data} />;
};
