import { LeetcodeProblem, columns } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/data-table";

async function getLeetcodeProblems(): Promise<LeetcodeProblem[]> {
  //   const res = await fetch("/api/leetcode");
  //   const data = await res.json();

  const data: LeetcodeProblem[] = [
    {
      id: "1",
      isComplete: false,
      problemName: "Two Sum",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/two-sum/",
      solution: "https://leetcode.com/problems/two-sum/solution/",
    },
    {
      id: "2",
      isComplete: true,
      problemName: "Number of Islands",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/number-of-islands/",
      solution: "https://leetcode.com/problems/number-of-islands/solution/",
    },
  ];
  return data;
}

export default async function LeetcodeTable() {
  const data = await getLeetcodeProblems();
  return <DataTable columns={columns} data={data} />;
}
