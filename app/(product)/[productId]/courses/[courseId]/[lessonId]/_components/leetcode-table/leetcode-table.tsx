import {
  DataTable,
  LeetcodeProblem,
} from "@/app/(product)/[productId]/courses/[courseId]/[lessonId]/_components/leetcode-table/data-table";
import { PracticeProblemWithProgress } from "@/actions/getPracticeProblem";

interface LeetcodeTableProps {
  problems: PracticeProblemWithProgress[];
}
export const LeetcodeTable = ({ problems }: LeetcodeTableProps) => {
  //   const { problems } = props; // Access the 'problems' array from props

  const data: LeetcodeProblem[] = problems.map((problem) => ({
    id: problem.id,
    progress: problem.progress,
    problemName: problem.problemName,
    difficulty: problem.difficulty,
    url: problem.url,
    threadId: problem.threadId,
    solution: problem.solution,
  }));

  return <DataTable data={data} />;
};
