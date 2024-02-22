import { PracticeProblemWithProgress } from "@/actions/getPracticeProblem";
import { DataTable } from "./data-table";

export const PracticeProblemTable = ({
  problems,
}: {
  problems: PracticeProblemWithProgress[];
}) => {
  // Prepare data for table
  const data = problems.sort(
    (a: PracticeProblemWithProgress, b: PracticeProblemWithProgress) => {
      const order = ["Easy", "Medium", "Hard"];
      return order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
    }
  );

  return (
    <div className="min-w-3/4 p-5">
      <DataTable data={data} />
    </div>
  );
};
