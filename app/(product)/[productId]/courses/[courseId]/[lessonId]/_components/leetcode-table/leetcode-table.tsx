import {
  LeetcodeProblem,
  columns,
} from "@/app/(product)/[productId]/courses/[courseId]/[lessonId]/_components/leetcode-table/problems-column";
import { DataTable } from "@/app/(product)/[productId]/courses/[courseId]/[lessonId]/_components/leetcode-table/data-table";
import { PracticeProblemWithProgress } from "@/actions/getPracticeProblem";

interface LeetcodeTableProps {
  problems: PracticeProblemWithProgress[];
}
export const LeetcodeTable = (props: LeetcodeTableProps) => {
  const { problems } = props; // Access the 'problems' array from props

  const data: LeetcodeProblem[] = problems.map((problem) => ({
    id: problem.id,
    progress: problem.progress,
    problemName: problem.problemName,
    difficulty: problem.difficulty,
    url: problem.url,
    solution: problem.solution,
  }));

  return <DataTable columns={columns} data={data} />;
};
